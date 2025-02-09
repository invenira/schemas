"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActivityProviderSchema = exports.CreateActivityProviderSchema = exports.ActivityProviderSchema = void 0;
var zod_1 = require("zod");
exports.ActivityProviderSchema = zod_1.z
    .object({
    id: zod_1.z.string().nonempty(),
    name: zod_1.z.string().nonempty(),
    url: zod_1.z.string().url(),
    createdAt: zod_1.z.string().date(),
    createdBy: zod_1.z.string().nonempty(),
    updatedAt: zod_1.z.string().date(),
    updatedBy: zod_1.z.string().nonempty(),
})
    .strict();
exports.CreateActivityProviderSchema = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .min(3, 'Activity Provider name must have a length of 3 or more!'),
    url: zod_1.z.string().url('Invalid Activity Provider URL'),
})
    .strict();
exports.UpdateActivityProviderSchema = zod_1.z
    .object({
    url: zod_1.z.string().url('Invalid Activity Provider URL'),
})
    .strict();
