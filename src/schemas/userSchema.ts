import { z } from 'zod';

export const userSchema = z.object({
  uid: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  displayName: z.string(),
  isAnonymous: z.boolean(),
  photoURL: z.string(),
  providerData: z.array(
    z.object({
      providerId: z.string(),
      uid: z.string(),
      displayName: z.string(),
      email: z.string(),
      phoneNumber: z.string(),
      photoURL: z.string(),
    })
  ),
  stsTokenManager: z.object({
    refreshToken: z.string(),
    accessToken: z.string(),
    expirationTime: z.number(),
  }),
  createdAt: z.string(),
  lastLoginAt: z.string(),
  apiKey: z.string(),
  appName: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
