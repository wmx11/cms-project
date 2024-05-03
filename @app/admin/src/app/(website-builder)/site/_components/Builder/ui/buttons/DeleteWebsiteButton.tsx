'use client';
import deleteSiteAction from '@admin/app/(website-builder)/site/_actions/deleteSiteAction';
import routes from '@admin/utils/routes';
import { Alert, AlertDialogAction } from '@cms/ui/components/AlertDialog';
import { Button } from '@cms/ui/components/Button';
import { ICON_STYLES, Trash } from '@cms/ui/components/Icons';
import { useParams, useRouter } from 'next/navigation';
import { ComponentPropsWithoutRef, FC, useState } from 'react';
import { toast } from 'sonner';

interface Props extends ComponentPropsWithoutRef<'button'> {}

const DeleteWebsiteButton: FC<Props> = ({ children }) => {
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
        <Button variant="destructive" onClick={handleDelete} loading={loading}>
          <Trash className={ICON_STYLES} />
          <span>Delete site</span>
        </Button>
      </AlertDialogAction>
    </Alert>
  );
};

export default DeleteWebsiteButton;
