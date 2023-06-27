import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const productCategorySchema = z.object({
  ownerId: z.string(),
  name: z
    .string()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace'),
  storesAssigned: z.array(z.string()).optional(),
  storeId: z.string().optional(),
});

export type ProductCategorySchema = BaseSchema &
  z.infer<typeof productCategorySchema>;
