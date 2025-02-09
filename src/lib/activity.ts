import { z } from 'zod';
import { Metadata, Validate, Schema, MongoIdSchema } from './base';
import { ActivityGQLSchema, ConfigInterfaceGQLSchema, CreateActivityInput } from '../types/graphql.types';

export const ActivitySchema = z
  .object({
    _id: MongoIdSchema,
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    parameters: z.record(z.string(), z.any()),
    createdAt: z.date(),
    createdBy: z.string().nonempty(),
    updatedAt: z.date(),
    updatedBy: z.string().nonempty(),
  })
  .strict();

export type Activity = Readonly<Required<z.infer<typeof ActivitySchema>>> & Metadata;

type TestSchema = Validate<Schema<Activity, ActivityGQLSchema>>;

export type ActivityKey = keyof Activity;

export const EnrichedActivitySchema = z
  .object({
    ap: z.string().nonempty(),
  })
  .strict();

export type EnrichedActivity = Readonly<Required<z.infer<typeof EnrichedActivitySchema>>> & Metadata;

export type EnrichedActivityKey = keyof EnrichedActivity;

export const CreateActivitySchema = z
  .object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    parameters: z.record(z.string(), z.any()),
  })
  .strict();

export type CreateActivity = Readonly<Required<z.infer<typeof CreateActivitySchema>>> & Metadata;

type TestSchema1 = Validate<Schema<CreateActivity, CreateActivityInput>>;

export const ConfigInterfaceSchema = z
  .object({
    url: z.string().url(),
  })
  .strict();

export type ConfigInterface = Readonly<Required<z.infer<typeof ConfigInterfaceSchema>>>;

type TestSchema2 = Validate<Schema<ConfigInterface, ConfigInterfaceGQLSchema>>;
