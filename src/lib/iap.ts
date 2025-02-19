import { z } from 'zod';
import { Metadata, MongoIdSchema, Schema, Validate } from './base';
import { ActivityProviderSchema } from './activity-provider';
import { CreateIAPInput, IAPGQLSchema } from '../types/graphql.types';
import { GoalSchema } from './goal';

export const IAPSchema = z
  .object({
    _id: MongoIdSchema,
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    activityProviders: z.array(ActivityProviderSchema),
    isDeployed: z.boolean(),
    deployUrls: z.record(z.string(), z.string().url()),
    goals: z.array(GoalSchema),
    createdAt: z.date(),
    createdBy: z.string().nonempty(),
    updatedAt: z.date(),
    updatedBy: z.string().nonempty(),
  })
  .strict();

export type IAP = Readonly<Required<z.infer<typeof IAPSchema>>> & Metadata;

type TestSchema = Validate<Schema<IAP, IAPGQLSchema>>;

export type IAPKey = keyof IAP;

export const CreateIAPSchema = z
  .object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
  })
  .strict();

export type CreateIAP = Readonly<Required<z.infer<typeof CreateIAPSchema>>> &
  Metadata;

type TestSchema1 = Validate<Schema<CreateIAP, CreateIAPInput>>;
