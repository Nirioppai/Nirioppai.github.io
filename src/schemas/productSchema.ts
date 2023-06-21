import { BaseItemSchema } from 'schemas';
import { z } from 'zod';

export const productSchema = z.object({
  // Inventory Levels
  // Manufacturer / Supplier
  // Dimensions
  // Weight
  // Image
  // Add ons
  // Combinations
  // Tax
});

export type ProductSchema = BaseItemSchema & z.infer<typeof productSchema>;
