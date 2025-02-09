"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigInterfaceSchema = exports.UpdateActivitySchema = exports.CreateActivitySchema = exports.EnrichedActivitySchema = exports.ActivitySchema = void 0;
var zod_1 = require("zod");
exports.ActivitySchema = zod_1.z
    .object({
    id: zod_1.z.string().nonempty(),
    name: zod_1.z.string().nonempty(),
    activityProviderId: zod_1.z.string().nonempty(),
    parameters: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    createdAt: zod_1.z.string().date(),
    createdBy: zod_1.z.string().nonempty(),
    updatedAt: zod_1.z.string().date(),
    updatedBy: zod_1.z.string().nonempty(),
})
    .strict();
exports.EnrichedActivitySchema = zod_1.z
    .object({
    ap: zod_1.z.string().nonempty(),
})
    .strict();
exports.CreateActivitySchema = zod_1.z
    .object({
    name: zod_1.z.string().nonempty(),
    activityProviderId: zod_1.z.string().nonempty(),
    parameters: zod_1.z.object({}).passthrough(),
})
    .strict();
exports.UpdateActivitySchema = zod_1.z
    .object({
    parameters: zod_1.z.object({}).passthrough(),
})
    .strict();
exports.ConfigInterfaceSchema = zod_1.z
    .object({
    url: zod_1.z.string().url(),
})
    .strict();
