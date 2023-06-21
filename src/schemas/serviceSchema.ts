import { BaseItemSchema } from 'schemas';
import { z } from 'zod';

export const serviceSchema = z.object({
  // Duration
  // Tax
  // Add ons
  // Combinations
  // Restrictions
});

export type ServiceSchema = BaseItemSchema & z.infer<typeof serviceSchema>;
