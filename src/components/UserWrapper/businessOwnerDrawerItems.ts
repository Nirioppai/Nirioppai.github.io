import {
  CashRegister as CashierIcon,
  Shape as CategoryIcon,
  FormatListBulleted as ProductIcon,
  CashMultiple as SalesIcon,
  Wrench as ServiceIcon,
  Store as StoreIcon,
} from 'mdi-material-ui';

// https://pictogrammers.com/library/mdi/?welcome

export const businessOwnerDrawerItems = [
  {
    label: 'Stores',
    Icon: StoreIcon,
    path: 'stores',
    hasDivider: true,
  },
  {
    label: 'Categories',
    Icon: CategoryIcon,
    path: 'categories',
    hasDivider: false,
  },
  {
    label: 'Products',
    Icon: ProductIcon,
    path: 'products',
    hasDivider: false,
  },
  {
    label: 'Services',
    Icon: ServiceIcon,
    path: 'services',
    hasDivider: false,
  },
  {
    label: 'Cashiers',
    Icon: CashierIcon,
    path: 'cashiers',
    hasDivider: true,
  },
  {
    label: 'Overall Sales',
    Icon: SalesIcon,
    path: 'sales',
    hasDivider: false,
  },
];
