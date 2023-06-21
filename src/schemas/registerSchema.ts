import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  userType: z.string().optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
