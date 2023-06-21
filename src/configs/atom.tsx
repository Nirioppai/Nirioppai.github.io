import { atom } from 'recoil';

export const selectedStore = atom({
  key: 'selectedStore',
  default: '',
});

export const cashierSelectedStore = atom({
  key: 'cashierSelectedStore',
  default: '',
});
