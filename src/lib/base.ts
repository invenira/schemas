import { z } from 'zod';
import { Types } from 'mongoose';

export const MetadataSchema = z
  .object({
    createdBy: z.string().nonempty().optional(),
    updatedBy: z.string().nonempty().optional(),
  });

export type Metadata = Partial<z.infer<typeof MetadataSchema>>;

export const MongoIdSchema = z.union([
  z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  }).transform((val) => new Types.ObjectId(val)),
  z.instanceof(Types.ObjectId),
]);

export type MongoId = Readonly<Required<z.infer<typeof MongoIdSchema>>>;

export type Validate<T extends true> = T;

export type Schema<T, U> =
  [T] extends [U]
    ? ([U] extends [T] ? true : false)
    : false;