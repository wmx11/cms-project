'use client';
import deleteSiteAction from '@admin/app/(website-builder)/site/_actions/deleteSiteAction';
import routes from '@admin/utils/routes';
import { Alert, AlertDialogAction } from '@cms/ui/components/AlertDialog';
import { Button, ButtonProps } from '@cms/ui/components/Button';
import { ICON_STYLES, Trash } from '@cms/ui/components/Icons';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'sonner';

interface Props extends ButtonProps {}

export const DeleteWebsiteButtonContent = () => {
  return (
    <>
      <Trash className={ICON_STYLES} />
      <span>Delete site</span>
    </>
  );
};

export const DeleteWebsiteButton: FC<Props> = (props) => {
  return (
    <Button {...props}>
      <DeleteWebsiteButtonContent />{' '}
    </Button>
  );
};

const DeleteWebsiteAlertButton: FC<Props> = ({ children }) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const site = await deleteSiteAction(params.id);

    if (!site.error) {
      toast.success('Site deleted successfully.');

      setTimeout(() => {
        router.push(routes.site.default);
      }, 500);
    }

    setLoading(false);
  };

  return (
    <Alert
      description="This action cannot be undone. This will permanently delete your site and all associated pages."
      triggerClassName="w-full"
      trigger={children}
    >
      <AlertDialogAction asChild>
        <DeleteWebsiteButton
          variant="destructive"
          onClick={handleDelete}
          loading={loading}
        />
      </AlertDialogAction>
    </Alert>
  );
};

export default DeleteWebsiteAlertButton;
