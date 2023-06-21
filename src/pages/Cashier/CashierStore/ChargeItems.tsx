import { FC, PropsWithChildren, useCallback } from 'react';

import { Button } from '@mui/material';
import { getRecoil } from 'recoil-nexus';

import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { BaseItemSchema } from '~/schemas';
import { invoiceService } from '~/services';

interface ChargeItemsProps {
  selectedItems: {
    products: BaseItemSchema[];
    services: BaseItemSchema[];
    customerAddress: string;
    customerContact: string;
    customerName: string;
    paymentType: string;
  };
  clearSelectedItems: () => void;
}

const ChargeItems: FC<PropsWithChildren<ChargeItemsProps>> = ({
  selectedItems,
  clearSelectedItems,
}) => {
  const storeId = getRecoil(cashierSelectedStore);

  const totalAmount = useCallback(() => {
    let total = 0;
    selectedItems.products.forEach((product) => {
      total += product.price;
    });
    selectedItems.services.forEach((service) => {
      total += service.price;
    });
    return total;
  }, [selectedItems]);

  const { mutateAsync: createInvoice } = usePostMutation({
    queryKey: KEYS.invoices,
    mutationFn: invoiceService.postOne,
  });

  const handleButtonClick = useCallback(async () => {
    console.log('selectedItems: ', selectedItems);

    // prepare invoice data
    const invoiceData = {
      storeId, // store ID from recoil state
      // you need to replace these with actual IDs of products and services
      productSaleId: 'no-sale',
      serviceSaleId: 'no-sale',
      customerName: selectedItems.customerName,
      customerContact: selectedItems.customerContact,
      customerAddress: selectedItems.customerAddress,
      paymentType: selectedItems.paymentType,
      totalAmount: totalAmount(),
      status: 'Successful', // ['Cancelled', 'Edited', 'Successful']
      iterationCount: 0, // initial iteration count
      orderDetails: selectedItems,
    };

    // submit invoice
    await createInvoice(invoiceData);

    clearSelectedItems();
  }, [selectedItems, clearSelectedItems, storeId, createInvoice, totalAmount]);

  return (
    <Button
      variant='contained'
      fullWidth
      sx={{ mb: '15px', mt: '15px' }}
      onClick={handleButtonClick}
    >
      Charge Transaction
      <br />
      {totalAmount().toFixed(2)}
    </Button>
  );
};

export default ChargeItems;
