'use client';
import deleteTemplateAction from '@admin/app/(website-builder)/site/_actions/deleteTemplateAction';
import routes from '@admin/utils/routes';
import { Alert, AlertDialogAction } from '@cms/ui/components/AlertDialog';
import { Button, ButtonProps } from '@cms/ui/components/Button';
import { ICON_STYLES, Trash } from '@cms/ui/components/Icons';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'sonner';

interface Props extends ButtonProps {
  templateId?: string;
}

export const DeleteTemplateButtonContent = () => {
  return (
    <>
      <Trash className={ICON_STYLES} />
      <span>Delete template</span>
    </>
  );
};

export const DeleteTemplateButton: FC<Props> = (props) => {
  return (
    <Button {...props}>
      <DeleteTemplateButtonContent />
    </Button>
  );
};

const DeleteTemplateAlertButton: FC<Props> = ({ children, templateId }) => {
  console.log(templateId);

  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    let deleteParams = {};

    if (!templateId) {
      deleteParams = { siteId: params?.id };
    } else {
      deleteParams = { templateId };
    }

    const site = await deleteTemplateAction({
      ...deleteParams,
    });

    if (!site.error) {
      toast.success('Template deleted successfully.');

      setTimeout(() => {
        router.push(routes.site.create);
      }, 500);
    }

    setLoading(false);
  };

  return (
    <Alert
      description="This action cannot be undone. This will permanently delete the template."
      triggerClassName="w-full"
      trigger={children}
    >
      <AlertDialogAction asChild>
        <DeleteTemplateButton
          variant="destructive"
          onClick={handleDelete}
          loading={loading}
        />
      </AlertDialogAction>
    </Alert>
  );
};

export default DeleteTemplateAlertButton;
