import { ZodiosOptions } from '@zodios/core';
import { createApiClient, schemas } from './ap-client';
import { z } from 'zod';

export * from './ap-client';

export function createActivityProviderClient(
  baseUrl: string,
  options?: ZodiosOptions,
) {
  return createApiClient(baseUrl, options);
}

export const fieldTypeMap: Record<string, z.ZodTypeAny> = {
  string: z.string(),
  number: z.number(),
  boolean: z.boolean(),
  bigint: z.bigint(),
  date: z.date(),
  arrayAny: z.array(z.any()),
  arrayNumber: z.array(z.number()),
  arrayString: z.array(z.string()),
  objectAny: z.object({}),
  recordAny: z.record(z.any()),
};

export function createDynamicSchema(fields: z.infer<typeof schemas.ConfigParametersResponse>) {
  const shape = fields.reduce((acc, field) => {
    acc[field.name] = fieldTypeMap[field.type] || z.any();
    return acc;
  }, {} as Record<string, z.ZodTypeAny>);

  return z.object(shape);
}

