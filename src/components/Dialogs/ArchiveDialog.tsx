import { FC, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

export interface ArchiveDialogProps {
  title?: string;
  content?: JSX.Element | string;
  itemName?: JSX.Element | string;
  itemGroupName?: JSX.Element | string;
  open: boolean;
  onClose: () => void;
  onArchive: () => any | Promise<any>;
}

export const ArchiveDialog: FC<ArchiveDialogProps> = ({
  title = 'Archive Entry',
  content,
  itemName,
  itemGroupName,
  open,
  onArchive,
  onClose,
}) => {
  // const isAsync = onArchive.constructor.name === 'AsyncFunction';

  const [isDeleting, setIsDeleting] = useState(false);

  const asyncOnArchive = async () => {
    setIsDeleting(true);
    try {
      await onArchive();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  itemName = itemName ? (
    <>
      <Typography
        component='span'
        color='primary'
        style={{ fontWeight: 'bold' }}
      >
        {itemName}
      </Typography>
      {itemGroupName && (
        <>
          &nbsp;from&nbsp;
          <Typography
            component='span'
            color='primary'
            style={{ fontWeight: 'bold' }}
          >
            {itemGroupName}
          </Typography>
        </>
      )}
    </>
  ) : (
    'this item'
  );

  const defaultContent = (
    <>
      Are you sure you want to archive {itemName}? This will be hidden from the
      list.
    </>
  );

  if (!content) {
    content = defaultContent;
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='archive-dialog-title'
        aria-describedby='archive-dialog-description'
      >
        <DialogTitle id='archive-dialog-title'>
          <Typography variant='h3' component='span'>
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent id='archive-dialog-description'>
          <Typography gutterBottom>{content}</Typography>
          <Typography color='error'>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant='text'>
            Cancel
          </Button>
          <LoadingButton
            variant='contained'
            onClick={asyncOnArchive}
            autoFocus
            loading={isDeleting}
          >
            Archive
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
