'use client';
import useStyles from '@admin/hooks/useStyles';
import { Button } from '@cms/ui/components/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@cms/ui/components/AlertDialog';
import { Warning } from '@cms/ui/components/Icons';

const PurgeStylesButton = () => {
  const { purgeStyles } = useStyles();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Warning className="h-3 w-3 mr-2" />
          Purge styles
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove all
            custom styling from the website. Continue if you want to create new
            styles.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={purgeStyles} variant="destructive">
              Purge styles
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PurgeStylesButton;
