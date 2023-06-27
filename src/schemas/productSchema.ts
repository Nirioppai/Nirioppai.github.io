import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const productSchema = z.object({
  price: z.number(),
  category: z.string().optional(),
  availability: z
    .string()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace'),
  storesAssigned: z.array(z.string()).optional(),
  stock: z.number().optional(),
  name: z
    .string()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace'),
  description: z.string().optional(),
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
