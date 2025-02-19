import { z } from 'zod';
import { Metadata, MongoIdSchema, Schema, Validate } from './base';
import { CreateGoalInput, GoalGQLSchema } from '../types/graphql.types';

export const GoalSchema = z
  .object({
    _id: MongoIdSchema,
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    formula: z.string().nonempty(),
    targetValue: z.number(),
    createdAt: z.date(),
    createdBy: z.string().nonempty(),
    updatedAt: z.date(),
    updatedBy: z.string().nonempty(),
  })
  .strict();

export type Goal = Readonly<Required<z.infer<typeof GoalSchema>>> & Metadata;

type TestSchema = Validate<Schema<Goal, GoalGQLSchema>>;

export const CreateGoalSchema = z
  .object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    formula: z.string().nonempty(),
    targetValue: z.number(),
  })
  .strict();

export type CreateGoal = Readonly<Required<z.infer<typeof CreateGoalSchema>>> &
  Metadata;

type TestSchema1 = Validate<Schema<CreateGoal, CreateGoalInput>>;
