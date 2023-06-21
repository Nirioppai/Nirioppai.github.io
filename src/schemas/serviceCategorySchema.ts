import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const serviceCategorySchema = z.object({
  name: z.string(),
  storeId: z.string().optional(),
});

export type ServiceCategorySchema = BaseSchema &
  z.infer<typeof serviceCategorySchema>;
