import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const productSaleSchema = z.object({
  invoiceId: z.string(), // id of invoice
  storeId: z.string(), // id of store
  products: z.object({
    productId: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
  }),
  subtotal: z.number(), // total cost of products
  status: z.enum(['Cancelled', 'Edited', 'Successful']),
  iterationCount: z.number(),
});

export type ProductSaleSchema = BaseSchema & z.infer<typeof productSaleSchema>;
