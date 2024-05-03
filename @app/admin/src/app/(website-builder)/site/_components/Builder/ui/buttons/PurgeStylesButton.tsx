'use client';
import useStyles from '@admin/hooks/useStyles';
import { Alert, AlertDialogAction } from '@cms/ui/components/AlertDialog';
import { Button } from '@cms/ui/components/Button';
import { ICON_STYLES, Warning } from '@cms/ui/components/Icons';
import React, { ComponentPropsWithoutRef, FC } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {}

const PurgeStylesButton: FC<Props> = ({ children }) => {
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
        <Button onClick={purgeStyles} variant="destructive">
          <Warning className={ICON_STYLES} />
          <span>Purge styles</span>
        </Button>
      </AlertDialogAction>
    </Alert>
  );
};

export default PurgeStylesButton;
