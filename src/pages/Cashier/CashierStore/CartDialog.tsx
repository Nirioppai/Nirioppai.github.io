import { FC, ReactElement, Ref, forwardRef, useEffect, useState } from 'react';

import {
  RemoveShoppingCart,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { ArrowLeft as ArrowLeftIcon } from 'mdi-material-ui';

import CustomizedBadges from './CustomizedBadges';

import { Section } from '~/components';
import { BaseItemSchema } from '~/schemas';
import { formatNumber } from '~/utils';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  // @ts-ignore
  return <Slide direction='up' ref={ref} {...props} />;
});

interface SelectedItemsListProps {
  selectedItems: BaseItemSchema[];
  itemType: 'products' | 'services';
  onRemoveItem: (type: 'products' | 'services', id: string) => void;
}

interface CartDialogProps {
  selectedItems: {
    products: BaseItemSchema[];
    services: BaseItemSchema[];
  };
  onRemoveItem: (type: 'products' | 'services', id: string) => void;
}

const CartDialog: FC<CartDialogProps> = ({ selectedItems, onRemoveItem }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      selectedItems.products.length === 0 &&
      selectedItems.services.length === 0
    ) {
      setOpen(false);
    }
  }, [selectedItems]);

  const SelectedItemsList: FC<SelectedItemsListProps> = ({
    selectedItems,
    itemType,
    onRemoveItem,
  }) => {
    // Calculate frequency of each item in selectedItems
    const itemCounts = selectedItems.reduce((counts, item) => {
      if (!counts[item._id]) {
        counts[item._id] = { count: 0, item };
      }
      counts[item._id].count++;
      return counts;
    }, {} as { [key: string]: { count: number; item: BaseItemSchema } });

    console.log('itemCounts: ', itemCounts);

    return (
      <>
        {Object.values(itemCounts).map(({ count, item }, index, array) => (
          <>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <List>
                  <ListItem key={item._id}>
                    <ListItemText
                      primary={item.name}
                      secondary={`${count} pieces`}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText
                      sx={{ mt: '16px', textAlign: 'right' }}
                      primary={formatNumber(item.price * count) + ' PHP'}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  sx={{ mt: '19px' }}
                  onClick={() => onRemoveItem(itemType, item._id)}
                >
                  <RemoveShoppingCart />
                </IconButton>
              </Grid>
            </Grid>
            {index < array.length - 1 && <Divider />}
          </>
        ))}
      </>
    );
  };

  return (
    <>
      <Tooltip
        title={
          selectedItems.products.length + selectedItems.services.length != 0
            ? 'View ' +
              (selectedItems.products.length + selectedItems.services.length) +
              ' Items in Cart'
            : 'View Cart'
        }
        placement='right-start'
      >
        <IconButton onClick={handleClickOpen}>
          <CustomizedBadges
            cartItemCount={
              selectedItems.products.length + selectedItems.services.length
            }
          >
            <ShoppingCartIcon fontSize='large' />
          </CustomizedBadges>
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundImage: 'none',
            backgroundColor: 'background.default',
          },
        }}
      >
        <AppBar
          sx={{
            position: 'relative',
            mb: 3,
          }}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              edge='start'
              onClick={handleClose}
              aria-label='close'
            >
              <ArrowLeftIcon />
            </IconButton>
            <Typography
              variant='h3'
              sx={{
                flex: 1,
                ml: 2,
              }}
            >
              Item Cart
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth='lg' style={{ marginBottom: '1rem' }}>
          {selectedItems.products.length != 0 ||
          selectedItems.services.length != 0 ? (
            <>
              <Section gutterBottom>
                {selectedItems.products.length != 0 ? (
                  <>
                    <Typography variant='h5'>Products</Typography>
                    <SelectedItemsList
                      selectedItems={selectedItems.products}
                      itemType='products'
                      onRemoveItem={onRemoveItem}
                    />
                  </>
                ) : (
                  ''
                )}

                {selectedItems.products.length != 0 &&
                selectedItems.services.length != 0 ? (
                  <>
                    {' '}
                    <Divider sx={{ mt: '16px', mb: '32px' }} />
                  </>
                ) : (
                  ''
                )}

                {selectedItems.services.length != 0 ? (
                  <>
                    <Typography variant='h5'>Services</Typography>
                    <SelectedItemsList
                      selectedItems={selectedItems.services}
                      itemType='services'
                      onRemoveItem={onRemoveItem}
                    />
                  </>
                ) : (
                  ''
                )}
              </Section>

              <Button variant='contained' fullWidth sx={{ mt: '6px' }}>
                Charge Transaction
                <br />
                0.00
              </Button>
            </>
          ) : (
            ''
          )}
        </Container>
      </Dialog>
    </>
  );
};
export default CartDialog;
