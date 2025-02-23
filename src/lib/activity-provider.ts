import { z } from 'zod';
import { ActivitySchema } from './activity';
import { Metadata, Validate, Schema, MongoIdSchema } from './base';
import {
  ActivityProviderGQLSchema,
  CreateActivityProviderInput,
} from '../types/graphql.types';

export const ActivityProviderSchema = z
  .object({
    _id: MongoIdSchema,
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    url: z.string().url(),
    activityIds: z.array(MongoIdSchema),
    createdAt: z.date(),
    createdBy: z.string().nonempty(),
    updatedAt: z.date(),
    updatedBy: z.string().nonempty(),
  })
  .strict();

export type ActivityProvider = Readonly<
  Required<z.infer<typeof ActivityProviderSchema>>
> &
  Metadata;

type TestSchema = Validate<Schema<ActivityProvider, ActivityProviderGQLSchema>>;

export type ActivityProviderKey = keyof ActivityProvider;

export const CreateActivityProviderSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Activity Provider name must have a length of 3 or more!'),
    description: z.string().nonempty(),
    url: z.string().url('Invalid Activity Provider URL'),
  })
  .strict();

export type CreateActivityProvider = Readonly<
  Required<z.infer<typeof CreateActivityProviderSchema>>
> &
  Metadata;

type TestSchema1 = Validate<
  Schema<CreateActivityProvider, CreateActivityProviderInput>
>;
