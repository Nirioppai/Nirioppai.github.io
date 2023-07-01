import React, { useCallback, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
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
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { invoiceService } from '~/services';
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
  selectedItems: any;
}

const AddCustomer: React.FC<AddCustomerProps> = ({
  maxWidth,
  title,
  subtitle,
  setSelectedItems,
  selectedItems,
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentType, setPaymentType] = useState('Cash');

  const storeId = getRecoil(cashierSelectedStore);
  const queries = useQueries([
    {
      queryKey: [KEYS.invoices, storeId, 'all'],
      queryFn: () => invoiceService.getStoreInvoices(storeId || ''),
    },
  ]);

  const customers = queries[0].data || [];

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset internal state when the selectedItems prop changes
  useEffect(() => {
    if (
      selectedItems.customerName === '' &&
      selectedItems.customerContact === '' &&
      selectedItems.customerAddress === '' &&
      selectedItems.paymentType === ''
    ) {
      setCustomerName('');
      setCustomerContact('');
      setCustomerAddress('');
      setPaymentType('Cash');
    }
  }, [selectedItems]);

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
          <Autocomplete
            id='customerName'
            freeSolo
            options={customers.map((option: any) => option.customerName)}
            onInputChange={(event, newInputValue) => {
              setCustomerName(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                value={customerName}
                label='Customer Name'
                fullWidth
              />
            )}
          />

          <Autocomplete
            id='customerContact'
            freeSolo
            options={customers.map((option: any) => option.customerContact)}
            onInputChange={(event, newInputValue) => {
              setCustomerContact(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                value={customerContact}
                label='Customer Contact'
                fullWidth
              />
            )}
          />

          <Autocomplete
            id='customerAddress'
            freeSolo
            options={customers.map((option: any) => option.customerAddress)}
            onInputChange={(event, newInputValue) => {
              setCustomerAddress(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                value={customerAddress}
                label='Customer Address'
                fullWidth
              />
            )}
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
