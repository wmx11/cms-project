'use client';
import deleteTemplateAction from '@admin/app/(website-builder)/site/_actions/deleteTemplateAction';
import routes from '@admin/utils/routes';
import { Alert, AlertDialogAction } from '@cms/ui/components/AlertDialog';
import { Button, ButtonProps } from '@cms/ui/components/Button';
import { ICON_STYLES, Trash } from '@cms/ui/components/Icons';
import { FC, useState } from 'react';

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

const DeleteTemplateButton: FC<Props> = (props) => {
  return (
    <Button {...props}>
      <DeleteTemplateButtonContent />
    </Button>
  );
};

const DeleteTemplateAlertButton: FC<Props> = ({ children, templateId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    await deleteTemplateAction({
      templateId,
      revalidate: routes.site.create,
    });

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