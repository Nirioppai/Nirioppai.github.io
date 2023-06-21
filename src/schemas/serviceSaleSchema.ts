import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const serviceSaleSchema = z.object({
  invoiceId: z.string(),
  storeId: z.string(),
  services: z.object({
    serviceId: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
  }),
  subtotal: z.number(),
  status: z.enum(['Cancelled', 'Edited', 'Successful']),
  iterationCount: z.number(),
});

export type ServiceSaleSchema = BaseSchema & z.infer<typeof serviceSaleSchema>;
