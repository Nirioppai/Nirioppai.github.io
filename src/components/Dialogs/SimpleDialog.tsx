import { PropsWithChildren } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import type { DialogProps } from '@mui/material';

export interface SimpleDialogProps extends Omit<DialogProps, 'onSubmit'> {
  title: string;
  subtitle?: string;
  submitText?: string;
}

export const SimpleDialog = ({
  title,
  subtitle,
  maxWidth = 'xs',
  onClose,
  children,
  open,
  ...rest
}: PropsWithChildren<SimpleDialogProps>) => {
  const handleClose: DialogProps['onClose'] = (event, reason) => {
    onClose?.(event, reason);
  };

  return (
    <Dialog maxWidth={maxWidth} open={open} onClose={handleClose} {...rest}>
      <DialogTitle id='archive-dialog-title'>
        <Typography variant='h3' component='span'>
          {title}
        </Typography>
        <Typography variant='subtitle1' component='div'>
          {subtitle}
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={(e) => handleClose(e, 'backdropClick')}
          type='button'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
