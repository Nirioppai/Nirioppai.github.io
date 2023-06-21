import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const invoiceSchema = z.object({
  storeId: z.string(),
  productSaleId: z.string(),
  serviceSaleId: z.string(),
  customerName: z.string(),
  customerContact: z.string(),
  customerAddress: z.string(),
  paymentType: z.enum(['Cash', 'GCash']),
  totalAmount: z.number(),
  status: z.enum(['Cancelled', 'Edited', 'Successful']),
  iterationCount: z.number(),
});

export type InvoiceSchema = BaseSchema & z.infer<typeof invoiceSchema>;
