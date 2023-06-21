// app info
export const APP_NAME: string = import.meta.env.VITE_APP_NAME;
export const APP_DESCRIPTION: string = import.meta.env.VITE_APP_DESCRIPTION;

// formats
export const DATE_FORMAT: string =
  import.meta.env.VITE_DATE_FORMAT || 'MM/dd/yyyy';

export const DATE_FORMAT_MASK = DATE_FORMAT.replace(/[\w]/g, '_');

export const TIME_FORMAT: string =
  import.meta.env.VITE_TIME_FORMAT || 'hh:mm b';

export const TIME_FORMAT_MASK = TIME_FORMAT.replace(/[\w]/g, '_');

// user types

export const USER_TYPES = [
  {
    label: 'System Administrator',
    value: 'systemAdministrator',
  },
  {
    label: 'Business Owner',
    value: 'businessOwner',
  },
  {
    label: 'Cashier',
    value: 'cashier',
  },
];

// keys and collections
export * from './keys';
