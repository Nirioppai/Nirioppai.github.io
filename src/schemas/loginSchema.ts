import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  userType: z.string().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
