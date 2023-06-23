import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const productSchema = z.object({
  price: z.number(),
  category: z.string(),
  availability: z.string(),
  storesAssigned: z.array(z.string()).optional(),
  stock: z.number(),
  name: z.string(),
  description: z.string(),
  ownerId: z.string().optional(),
  storeId: z.string().optional(),
  // Inventory Levels
  // Manufacturer / Supplier
  // Dimensions
  // Weight
  // Image
  // Add ons
  // combinations: z.string().optional(),
  // Tax
});

export type ProductSchema = BaseSchema & z.infer<typeof productSchema>;
