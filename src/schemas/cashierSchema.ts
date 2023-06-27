import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const cashierSchema = z.object({
  ownerId: z.string(),
  name: z
    .string()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace'),
  email: z
    .string()
    .email()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace'),
  password: z
    .string()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace'),
  storeId: z.string(),
});

export type CashierSchema = BaseSchema & z.infer<typeof cashierSchema>;
