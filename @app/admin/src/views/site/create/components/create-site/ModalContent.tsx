'use client';
import { Textarea } from '@admin/app/(website-builder)/site/_components/builder/ui/Textarea';
import BrowserTab from '@admin/components/BrowserTab';
import useErrorMessage from '@admin/hooks/useErrorMessage';
import { CreateSiteData } from '@cms/controllers/site';
import { Badge } from '@cms/ui/components/Badge';
import { Button } from '@cms/ui/components/Button';
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
import React, { FC, useState } from 'react';
import slugify from 'slugify';
import createSiteAction from '../../actions/createSiteAction';
import { useRouter } from 'next/navigation';
import routes from '@admin/utils/routes';
import { Component } from '@prisma/client';
import { MAX_STRING_LENGTH } from '@cms/tiglee-engine/constants';

interface Props {
  components: Component[];
  templateId?: string;
}

const ModalContent: FC<Props> = ({ components, templateId }) => {
  const router = useRouter();
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
    <>
      <ErrorMessage errorMessage={error.general} />
      <div className="space-y-4">
        <div>
          <Label htmlFor="alias">Site alias</Label>
          <p className="text-xs text-dim">
            Site alias is used to identify your site.
          </p>
          <Input
            maxLength={MAX_STRING_LENGTH}
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
          <p className="text-xs text-dim">
            Site title will be displayed on the browser tab and preview cards.
          </p>
          <Input
            maxLength={MAX_STRING_LENGTH}
            errorMessage={error.title}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            id="title"
          />
          <BrowserTab className="mt-2">{title}</BrowserTab>
        </div>

        <div>
          <Label htmlFor="description">Site description</Label>
          <p className="text-xs text-dim">
            Site description will be used for SEO purposes and will be displayed
            on preview cards.
          </p>
          <Textarea
            showLength
            errorMessage={error.description}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="description"
          />
        </div>

        <div>
          <Label>Component set</Label>
          <p className="text-xs text-dim">
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
                  <SelectItem key={`component_${index}`} value={component.id}>
                    <p className="text-left">{component.name}</p>
                    <p className="text-xs text-dim">
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
    </>
  );
};

export default ModalContent;
