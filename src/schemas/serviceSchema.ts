import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const serviceSchema = z.object({
  price: z.number(),
  category: z.string().optional(),
  availability: z
    .string()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace'),
  storesAssigned: z.array(z.string()).optional(),
  name: z
    .string()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace'),
  description: z.string().optional(),
  ownerId: z.string().optional(),
  storeId: z.string().optional(),
  // Duration
  // Tax
  // Add ons
  // Combinations
  // Restrictions
});

export type ServiceSchema = BaseSchema & z.infer<typeof serviceSchema>;
