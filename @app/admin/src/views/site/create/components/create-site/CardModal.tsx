'use client';
import Card from '@admin/app/(main)/_components/Card';
import { templateCardOptions } from '@admin/components/menus/CardOptions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@cms/ui/components/Dialog';
import { Component } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { FC, useMemo } from 'react';
import ModalContent from './ModalContent';

interface Props {
  components: Component[];
  title?: string | null;
  description?: string | null;
  image?: string | null;
  templateId?: string;
}

const CreateSiteCardModal: FC<Props> = ({
  components,
  description,
  templateId,
  image,
  title,
}) => {
  const { data: session } = useSession();

  const menu = useMemo(() => {
    if (!session?.user?.is_admin) {
      return null;
    }
    return templateCardOptions({ templateId });
  }, [session]);

  const cardProps = {
    menu,
    title: title ? title : 'Start from scratch',
    description: description
      ? description
      : 'Select this option if you want to create a site without using a template.',
  };

  return (
    <Dialog>
      <Card {...cardProps}>
        <DialogTrigger className="absolute inset-0">
          {image && (
            <img
              src={image}
              alt={`${title} Image`}
              className="origin-top scale-50"
            />
          )}
        </DialogTrigger>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new site</DialogTitle>
          <DialogDescription>
            Fill in the information to create your new site
          </DialogDescription>
          <ModalContent components={components} templateId={templateId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSiteCardModal;
