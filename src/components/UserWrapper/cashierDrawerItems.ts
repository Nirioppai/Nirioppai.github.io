import { Sale as SaleIcon, Toolbox as ToolboxIcon } from 'mdi-material-ui';

export const cashierDrawerItems = [
  {
    label: 'Store',
    Icon: ToolboxIcon,
    path: 'store',
    hasDivider: false,
  },
  {
    label: 'Sales',
    Icon: SaleIcon,
    path: 'sales',
    hasDivider: false,
  },
];
