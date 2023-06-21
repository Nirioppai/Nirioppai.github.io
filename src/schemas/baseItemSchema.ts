export interface BaseItemSchema {
  _id: string;
  price: number;
  category: string;
  availability: string;
  storesAssigned: string[];
  name: string;
  description: string;
  ownerId: string;
  storeId: string;
}
