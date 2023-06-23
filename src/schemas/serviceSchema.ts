import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const serviceSchema = z.object({
  price: z.number(),
  category: z.string(),
  availability: z.string(),
  storesAssigned: z.array(z.string()).optional(),
  name: z.string(),
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
