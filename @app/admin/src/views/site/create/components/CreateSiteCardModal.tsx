'use client';
import Card from '@admin/app/(main)/_components/Card';
import BrowserTab from '@admin/components/BrowserTab';
import routes from '@admin/utils/routes';
import { Badge } from '@cms/ui/components/Badge';
import { Button } from '@cms/ui/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@cms/ui/components/Dialog';
import ErrorMessage from '@cms/ui/components/ErrorMessage';
import { Input } from '@cms/ui/components/Input';
import { Label } from '@cms/ui/components/Label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@cms/ui/components/Select';
import { Textarea } from '@cms/ui/components/Textarea';
import { Component } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import slugify from 'slugify';
import createSiteAction from '../actions/createSiteAction';
import { MAX_STRING_LENGTH } from '@cms/tiglee-engine/constants';
import useErrorMessage from '@admin/hooks/useErrorMessage';
import { CreateSiteData } from '@cms/controllers/site';

interface Props {
  components: Component[];
  templateName?: string;
  templateDescription?: string;
  templateImage?: string;
  templateId?: string;
}

const CreateSiteCardModal: FC<Props> = ({
  components,
  templateDescription,
  templateId,
  templateImage,
  templateName,
}) => {
  const [loading, setLoading] = useState(false);
  const [alias, setAlias] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [componentId, setComponentId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { error, clearErrors, setError } = useErrorMessage<CreateSiteData>({
    general: '',
    alias: '',
    componentId: '',
    description: '',
    title: '',
    templateId: '',
  });

  const router = useRouter();

  const handleCreateSite = async () => {
    setLoading(true);
    clearErrors();

    const result = await createSiteAction({
      alias,
      title,
      componentId,
      description,
      templateId,
    });

    if (!result) {
      setError((prev) => ({
        ...prev,
        general: 'Could not create a site. Please try again.',
      }));
      setLoading(false);
      return;
    }

    if (result.error) {
      setError({ ...result.error });
      setLoading(false);
      return;
    }

    if (result?.data?.id) {
      router.push(routes.site.edit.replace('$id', result.data.id));
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-left">
        <Card
          name={templateName ? templateName : 'Start from scratch'}
          templateId={templateId}
          description={
            templateDescription
              ? templateDescription
              : 'Select this option if you want to create a site without using a template.'
          }
        >
          {templateImage && (
            <img
              src={templateImage}
              alt={`${templateName} Image`}
              className="origin-top scale-50"
            />
          )}
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new site</DialogTitle>
          <DialogDescription>
            Fill in the information to create your new site
          </DialogDescription>
          <ErrorMessage errorMessage={error.general} />
          <div className="space-y-4">
            <div>
              <Label htmlFor="alias">Site alias</Label>
              <p className="text-xs text-zinc-500">
                Site alias is used to identify your site.
              </p>
              <Input
                errorMessage={error.alias}
                onChange={(e) => setAlias(e.target.value)}
                value={alias}
                id="alias"
              />
              <Badge className="mt-2">
                https://{alias ? slugify(alias).toLowerCase() : 'site-alias'}
                .tiglee.io
              </Badge>
            </div>

            <div>
              <Label htmlFor="title">Site title</Label>
              <p className="text-xs text-zinc-500">
                Site title will be displayed on the browser tab and preview
                cards.
              </p>
              <Input
                errorMessage={error.title}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                id="title"
              />
              <BrowserTab className="mt-2">{title}</BrowserTab>
            </div>

            <div>
              <Label htmlFor="name">Site description</Label>
              <p className="text-xs text-zinc-500">
                Site description will be used for SEO purposes and will be
                displayed on preview cards.
              </p>
              <Textarea
                errorMessage={error.description}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                id="name"
              />
              <p className="text-xs text-zinc-500">
                <span
                  className={
                    description?.length > MAX_STRING_LENGTH
                      ? 'text-red-500'
                      : ''
                  }
                >
                  {description?.length}
                </span>
                /{MAX_STRING_LENGTH}
              </p>
            </div>

            <div>
              <Label>Component set</Label>
              <p className="text-xs text-zinc-500">
                Component set will define the look of your website and template.
              </p>
              <Select onValueChange={(value) => setComponentId(value)}>
                <SelectTrigger
                  className="max-w-[462px]"
                  errorMessage={error.componentId}
                >
                  <SelectValue placeholder="Select component set" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Components</SelectLabel>
                    {components?.map((component, index) => (
                      <SelectItem
                        key={`component_${index}`}
                        value={component.id}
                      >
                        <p className="text-left">{component.name}</p>
                        <p className="text-xs text-zinc-500">
                          {component.description}
                        </p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button loading={loading} onClick={handleCreateSite}>
                Create site
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSiteCardModal;
