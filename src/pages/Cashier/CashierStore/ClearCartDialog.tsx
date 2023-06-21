import { FC, useState } from 'react';

import { RemoveShoppingCart } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

interface ClearCartDialogProps {
  selectedItems: {
    products: any[];
    services: any[];
  };
  onClearCart: () => void; // Added a callback function prop
}

const ClearCartDialog: FC<ClearCartDialogProps> = ({
  selectedItems,
  onClearCart,
}) => {
  const [open, setOpen] = useState(false);

  console.log('selectedItems', selectedItems);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearCart = () => {
    console.log('Clearing Cart');
    onClearCart(); // Trigger the parent's clear cart function
    handleClose();
  };
  return (
    <>
      <Tooltip title={'Clear Cart'} placement='right-start'>
        <IconButton onClick={handleClickOpen}>
          <RemoveShoppingCart fontSize='large' />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant='h3'>Remove Cart</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to remove all items in the cart?
          </Typography>
          <Typography color='error'>This action cannot be undone.</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant='text'>
            Cancel
          </Button>
          <LoadingButton
            variant='contained'
            onClick={handleClearCart}
            autoFocus
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ClearCartDialog;
