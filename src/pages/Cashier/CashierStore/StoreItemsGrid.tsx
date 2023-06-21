import { FC, PropsWithChildren, useState } from 'react';

import { Grid } from '@mui/material';

import AddCustomer from './AddCustomer';
import CartDialog from './CartDialog';
import ChargeItems from './ChargeItems';
import ClearCartDialog from './ClearCartDialog';
import ProductsList from './Tabs/ProductsList';
import ServicesList from './Tabs/ServicesList';

import { TabWithContent } from '~/components';
import { BaseItemSchema } from '~/schemas';

interface StoreItemsGridProps {
  disableWrite?: boolean;
}

const initialItemsState = {
  products: [] as BaseItemSchema[],
  services: [] as BaseItemSchema[],
  customerAddress: '',
  customerContact: '',
  customerName: '',
  paymentType: '',
};

const StoreItemsGrid: FC<PropsWithChildren<StoreItemsGridProps>> = ({
  disableWrite,
}) => {
  const [selectedItems, setSelectedItems] = useState(initialItemsState);

  const handleProductClick = (event: any) => {
    // @ts-ignore
    setSelectedItems((prevState) => {
      return { ...prevState, products: [...prevState.products, event] };
    });
  };

  const handleServiceClick = (event: any) => {
    // @ts-ignore
    setSelectedItems((prevState) => {
      return { ...prevState, services: [...prevState.services, event] };
    });
  };

  const handleRemoveItem = (type: 'products' | 'services', id: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [type]: prevState[type].filter((item) => item._id !== id),
    }));
  };

  const handleClearCart = () => {
    setSelectedItems({
      products: [],
      services: [],
      customerAddress: '',
      customerContact: '',
      customerName: '',
      paymentType: '',
    });
  };

  console.log('selectedItems: ', selectedItems);

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <CartDialog
            selectedItems={selectedItems}
            onRemoveItem={handleRemoveItem}
          />
        </Grid>
        <Grid container item xs={6} justifyContent='flex-end'>
          <Grid>
            <AddCustomer
              maxWidth={'md'}
              title='Add Customer'
              subtitle='Add Customer Details'
              setSelectedItems={(customerDetails) =>
                setSelectedItems({ ...selectedItems, ...customerDetails })
              }
            />
          </Grid>
          <Grid>
            <ClearCartDialog
              selectedItems={selectedItems}
              onClearCart={handleClearCart}
            />
          </Grid>
        </Grid>
      </Grid>

      <ChargeItems
        selectedItems={selectedItems}
        clearSelectedItems={handleClearCart}
      />

      <TabWithContent
        tabItems={[
          {
            name: 'Products',
            content: (
              <ProductsList
                disableWrite={disableWrite}
                handleProductClick={handleProductClick}
              />
            ),
          },
          {
            name: 'Services',
            content: (
              <ServicesList
                disableWrite={disableWrite}
                handleServiceClick={handleServiceClick}
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default StoreItemsGrid;
