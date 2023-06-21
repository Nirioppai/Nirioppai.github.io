import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const storeSchema = z.object({
  ownerId: z.string(),
  name: z.string(),
  address: z.string(),
  // Array of IDs
  products: z.string().array().optional(),
  services: z.string().array().optional(),
  categories: z.string().array().optional(),
  cashiers: z.string().array().optional(),
});

export type StoreSchema = BaseSchema & z.infer<typeof storeSchema>;
