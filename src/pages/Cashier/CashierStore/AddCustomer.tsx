import React, { useCallback, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { AccountMultiplePlus as AccountMultiplePlusIcon } from 'mdi-material-ui';
interface CustomerDetails {
  customerName: string;
  customerContact: string;
  customerAddress: string;
  paymentType: string;
}

interface AddCustomerProps {
  maxWidth: any;
  title: string;
  subtitle: string;
  setSelectedItems: (customerDetails: CustomerDetails) => void; // This function will be passed down from the parent component
}

const AddCustomer: React.FC<AddCustomerProps> = ({
  maxWidth,
  title,
  subtitle,
  setSelectedItems,
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentType, setPaymentType] = useState('Cash');

  const handleClose = useCallback((reason: any) => {
    if (reason === 'backdropClick') {
      setIsSubmitting(false);
    }
    setOpen(false);
  }, []);

  const onSubmit = () => {
    setIsSubmitting(true);

    // Pass the customer details back to the parent component
    setSelectedItems({
      customerName,
      customerContact,
      customerAddress,
      paymentType,
    });

    setOpen(false);
    setIsSubmitting(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Tooltip title={'Add Customer'} placement='right-start'>
        <IconButton onClick={handleClickOpen}>
          <AccountMultiplePlusIcon fontSize='large' />
        </IconButton>
      </Tooltip>

      <Dialog
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={isSubmitting}
      >
        <DialogTitle id='archive-dialog-title'>
          <Typography variant='h3' component='span'>
            {title}
          </Typography>
          <Typography variant='subtitle1' component='div'>
            {subtitle}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label='Customer Name'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            fullWidth
          />
          <TextField
            label='Customer Contact'
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
            fullWidth
          />
          <TextField
            label='Customer Address'
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id='payment-type-label'>Payment Type</InputLabel>
            <Select
              labelId='payment-type-label'
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <MenuItem value='Cash'>Cash</MenuItem>
              <MenuItem value='GCash'>GCash</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant='text'
            onClick={() => handleClose('backdropClick')}
            disabled={isSubmitting}
          >
            Discard
          </Button>
          <LoadingButton
            variant='contained'
            loading={isSubmitting}
            onClick={onSubmit}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCustomer;
