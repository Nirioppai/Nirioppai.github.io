import { FC } from 'react';

import { Box, Divider, Grid, Typography } from '@mui/material';
import type { DialogProps } from '@mui/material';

import { SimpleDialog } from '~/components';

interface ViewSaleModalProps extends DialogProps {
  data: any;
}

const ViewSaleModal: FC<ViewSaleModalProps> = ({ data, onClose, ...rest }) => {
  console.log('data: ', data);

  const displayProductDetails = (invoice: any) => {
    const productCounts = invoice.products.reduce(
      (counts: any, product: any) => {
        if (counts[product.name]) {
          counts[product.name].quantity += 1;
          counts[product.name].totalPrice += product.price;
        } else {
          counts[product.name] = {
            quantity: 1,
            price: product.price,
            totalPrice: product.price,
          };
        }
        return counts;
      },
      {}
    );

    return Object.keys(productCounts).map((productName) => {
      const product = productCounts[productName];
      return (
        <>
          <Typography
            sx={{ marginTop: '10px' }}
            variant='body1'
            key={productName}
          >
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography>{productName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {product.quantity} x ₱{product.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} container justifyContent='flex-end'>
                <Typography variant='body1' fontWeight='bold'>
                  ₱{product.totalPrice}
                </Typography>
              </Grid>
            </Grid>
          </Typography>
          <Divider
            sx={{ marginTop: '10px', marginBottom: '10px' }}
            variant='middle'
          />
        </>
      );
    });
  };

  const displayServiceDetails = (invoice: any) => {
    const serviceCounts = invoice.services.reduce(
      (counts: any, service: any) => {
        if (counts[service.name]) {
          counts[service.name].quantity += 1;
          counts[service.name].totalPrice += service.price;
        } else {
          counts[service.name] = {
            quantity: 1,
            price: service.price,
            totalPrice: service.price,
          };
        }
        return counts;
      },
      {}
    );

    return Object.keys(serviceCounts).map((serviceName) => {
      const service = serviceCounts[serviceName];
      return (
        <>
          <Typography
            sx={{ marginTop: '10px' }}
            variant='body1'
            key={serviceName}
          >
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography>{serviceName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {service.quantity} x ₱{service.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} container justifyContent='flex-end'>
                <Typography variant='body1' fontWeight='bold'>
                  ₱{service.totalPrice}
                </Typography>
              </Grid>
            </Grid>
          </Typography>
          <Divider
            sx={{ marginTop: '10px', marginBottom: '10px' }}
            variant='middle'
          />
        </>
      );
    });
  };

  const ProductSaleDetails = () => (
    <Box>
      <Typography variant='h3' gutterBottom>
        Product Sale Details
      </Typography>

      {data?.productSale ? displayProductDetails(data?.productSale) : ''}
    </Box>
  );

  const ServiceSaleDetails = () => (
    <Box>
      <Typography variant='h3' gutterBottom>
        Service Sale Details
      </Typography>

      {data?.serviceSale ? displayServiceDetails(data?.serviceSale) : ''}
    </Box>
  );

  const dateStr = data?.timestamp;
  const date = new Date(dateStr);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  // @ts-ignore
  const formattedDate = date.toLocaleString('en-US', options);

  return (
    <SimpleDialog
      title='Viewing Sale Invoice'
      maxWidth='sm'
      onClose={onClose}
      {...rest}
    >
      Cashier ID: {data?.cashierId}
      <br />
      Store ID: {data?.storeId}
      <br />
      Date: {formattedDate}
      <Divider
        sx={{ marginTop: '10px', marginBottom: '10px' }}
        variant='middle'
      />
      <Typography variant='h3' gutterBottom>
        Customer Details
      </Typography>
      <Typography variant='body1'>Name: {data?.customerName}</Typography>
      <Typography variant='body1'>Contact: {data?.customerContact}</Typography>
      <Typography variant='body1'>Address: {data?.customerAddress}</Typography>
      {data?.productSaleId !== 'no-sale' && (
        <>
          <Divider
            sx={{ marginTop: '10px', marginBottom: '10px' }}
            variant='middle'
          />
          <ProductSaleDetails />
        </>
      )}
      {data?.serviceSaleId !== 'no-sale' && (
        <>
          {data?.productSaleId === 'no-sale' ? (
            <Divider
              sx={{ marginTop: '10px', marginBottom: '10px' }}
              variant='middle'
            />
          ) : (
            ''
          )}
          <ServiceSaleDetails />
        </>
      )}
      <Typography sx={{ marginTop: '10px' }} variant='body1'>
        Payment Type: {data?.paymentType}
      </Typography>
    </SimpleDialog>
  );
};

export default ViewSaleModal;
