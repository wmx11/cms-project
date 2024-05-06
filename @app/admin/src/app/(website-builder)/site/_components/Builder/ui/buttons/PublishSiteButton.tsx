'use client';
import publishSiteAction from '@admin/app/(website-builder)/site/_actions/publishSiteAction';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Alert, AlertDialogAction } from '@cms/ui/components/AlertDialog';
import { Button, ButtonProps } from '@cms/ui/components/Button';
import { ICON_STYLES, Publish } from '@cms/ui/components/Icons';
import { useParams } from 'next/navigation';
import { ComponentPropsWithoutRef, FC } from 'react';
import { toast } from 'sonner';

interface Props extends ComponentPropsWithoutRef<'button'>, ButtonProps {}

const PublishButton: FC<Props> = (props) => (
  <Button {...props}>
    <Publish className={ICON_STYLES} />
    <span>Publish</span>
  </Button>
);

const PublishSiteButton: FC<Props> = ({ children }) => {
  const params = useParams<{ id: string }>();
  const schema = useBuilderProviderState((state) => state.schema);
  const stylesSchema = useBuilderProviderState((state) => state.styles);

  const handleOnClick = async () => {
    const site = await publishSiteAction({
      id: params.id,
      schema,
      stylesSchema,
    });

    if (site.error) {
      toast.error('There has been an issue publishing your site.');
    } else {
      toast.success('Your site has been successfully published!');
    }
  };

  return (
    <Alert
      description="This action will publish your latest changes. Everyone with the link will be able to access your website. Do you wish to continue?"
      triggerAsChild={true}
      trigger={<PublishButton size="xs" />}
    >
      <AlertDialogAction asChild>
        <PublishButton onClick={handleOnClick} />
      </AlertDialogAction>
    </Alert>
  );
};

export default PublishSiteButton;
