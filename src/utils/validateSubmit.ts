// validateSubmit.ts
import { z } from 'zod';

const validateValues = (
  values: Record<string, any>,
  schema: z.ZodObject<any>,
  enqueueSnackbar: (message: string, options: { variant: string }) => void
): Record<string, any> | null => {
  const result = { ...values };

  for (const field in schema.shape) {
    if (
      Object.prototype.hasOwnProperty.call(result, field) &&
      typeof result[field] === 'string'
    ) {
      const trimmedValue = result[field].trim();
      if (trimmedValue === '' && !schema.shape[field].isOptional()) {
        enqueueSnackbar(
          `Something went wrong. The value for "${field}" should not be empty.`,
          { variant: 'error' }
        );
        return null;
      }
      result[field] = trimmedValue;
    }
  }

  return result;
};

export const validateSubmit = async (
  values: Record<string, any>,
  schema: z.ZodObject<any>,
  mutateAsync: (arg0: Record<string, any>) => void,
  enqueueSnackbar: (message: string, options: { variant: string }) => void
) => {
  const validatedValues = validateValues(values, schema, enqueueSnackbar);
  if (validatedValues !== null) {
    await mutateAsync(validatedValues);
  }
};
