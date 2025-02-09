"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddActivityToIapSchema = exports.UpdateIapSchema = exports.CreateIapSchema = exports.IapSchema = void 0;
var zod_1 = require("zod");
exports.IapSchema = zod_1.z
    .object({
    id: zod_1.z.string().nonempty(),
    name: zod_1.z.string().nonempty(),
    description: zod_1.z.string().nonempty(),
    activityIds: zod_1.z.array(zod_1.z.string().nonempty()),
    isDeployed: zod_1.z.boolean(),
    deployUrls: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    createdAt: zod_1.z.string().date(),
    createdBy: zod_1.z.string().nonempty(),
    updatedAt: zod_1.z.string().date(),
    updatedBy: zod_1.z.string().nonempty(),
})
    .strict();
exports.CreateIapSchema = zod_1.z
    .object({
    name: zod_1.z.string().nonempty(),
    description: zod_1.z.string().nonempty(),
})
    .strict();
exports.UpdateIapSchema = zod_1.z
    .object({
    name: zod_1.z.string().nonempty(),
    description: zod_1.z.string().nonempty(),
})
    .strict();
exports.AddActivityToIapSchema = zod_1.z
    .object({
    activityId: zod_1.z.string().nonempty(),
})
    .strict();
