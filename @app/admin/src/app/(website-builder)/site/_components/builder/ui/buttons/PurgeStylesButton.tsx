'use client';
import useStyles from '@admin/hooks/useStyles';
import { Alert, AlertDialogAction } from '@cms/ui/components/AlertDialog';
import { Button, ButtonProps } from '@cms/ui/components/Button';
import { ICON_STYLES, Warning } from '@cms/ui/components/Icons';
import { FC } from 'react';

interface Props extends ButtonProps {}

export const PurgetStylesButtonContent = () => {
  return (
    <>
      <Warning className={ICON_STYLES} />
      <span>Purge styles</span>
    </>
  );
};

export const PurgeStylesButton: FC<Props> = (props) => {
  return (
    <Button {...props}>
      <PurgetStylesButtonContent />
    </Button>
  );
};

const PurgeStylesAlertButton: FC<Props> = ({ children }) => {
  const { purgeStyles } = useStyles();

  return (
    <Alert
      description="This action cannot be undone. This will permanently remove all
  custom styling from the website. Continue if you want to create new
  styles."
      triggerClassName="w-full"
      trigger={children}
    >
      <AlertDialogAction asChild>
        <PurgeStylesButton onClick={purgeStyles} variant="destructive" />
      </AlertDialogAction>
    </Alert>
  );
};

export default PurgeStylesAlertButton;
