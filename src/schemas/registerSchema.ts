import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .refine(
        (value) => value.trim() !== '',
        'Must not be empty or whitespace'
      ),
    email: z
      .string()
      .email()
      .refine(
        (value) => value.trim() !== '',
        'Must not be empty or whitespace'
      ),
    password: z
      .string()
      .min(6)
      .refine(
        (value) => value.trim() !== '',
        'Must not be empty or whitespace'
      ),
    confirmPassword: z
      .string()
      .min(6)
      .refine(
        (value) => value.trim() !== '',
        'Must not be empty or whitespace'
      ),
    userType: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
