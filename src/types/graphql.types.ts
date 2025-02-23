
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateActivityInput {
    name: string;
    description: string;
    parameters: Record;
}

export class CreateActivityProviderInput {
    name: string;
    description: string;
    url: string;
}

export class CreateGoalInput {
    name: string;
    description: string;
    formula: string;
    targetValue: number;
}

export class CreateIAPInput {
    name: string;
    description: string;
}

export class AddActivityToIapInput {
    activityId: string;
}

export class MetricGQLSchema {
    name: string;
    description: string;
    type: MetricType;
}

export class ActivityGQLSchema {
    _id: MongoIdScalar;
    name: string;
    description: string;
    parameters: Record;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}

export class ActivityProviderGQLSchema {
    _id: MongoIdScalar;
    name: string;
    description: string;
    url: string;
    activityIds: MongoIdScalar[];
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}

export class ConfigInterfaceGQLSchema {
    url: string;
}

export class GoalGQLSchema {
    _id: MongoIdScalar;
    name: string;
    description: string;
    formula: string;
    targetValue: number;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}

export class IAPGQLSchema {
    _id: MongoIdScalar;
    name: string;
    description: string;
    activityProviderIds: MongoIdScalar[];
    isDeployed: boolean;
    deployUrls: Record;
    goalIds: MongoIdScalar[];
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}

export abstract class IQuery {
    abstract getActivityProviders(): ActivityProviderGQLSchema[] | Promise<ActivityProviderGQLSchema[]>;

    abstract getActivityProvider(apId: MongoIdScalar): ActivityProviderGQLSchema | Promise<ActivityProviderGQLSchema>;

    abstract getActivityProviderRequiredFields(apId: MongoIdScalar): string[] | Promise<string[]>;

    abstract getActivityProviderActivities(apId: MongoIdScalar): ActivityGQLSchema[] | Promise<ActivityGQLSchema[]>;

    abstract getConfigurationInterfaceUrl(apId: MongoIdScalar): ConfigInterfaceGQLSchema | Promise<ConfigInterfaceGQLSchema>;

    abstract getConfigurationParameters(apId: MongoIdScalar): string[] | Promise<string[]>;

    abstract getActivities(): ActivityGQLSchema[] | Promise<ActivityGQLSchema[]>;

    abstract getActivity(activityId: MongoIdScalar): ActivityGQLSchema | Promise<ActivityGQLSchema>;

    abstract getIAPs(): IAPGQLSchema[] | Promise<IAPGQLSchema[]>;

    abstract getIAP(iapId: MongoIdScalar): IAPGQLSchema | Promise<IAPGQLSchema>;

    abstract getIAPAvailableMetrics(iapId: MongoIdScalar): MetricGQLSchema[] | Promise<MetricGQLSchema[]>;
}

export abstract class IMutation {
    abstract createActivityProvider(iapId: MongoIdScalar, createActivityProviderInput: CreateActivityProviderInput): ActivityProviderGQLSchema | Promise<ActivityProviderGQLSchema>;

    abstract removeActivityProvider(apId: MongoIdScalar): Nullable<Void> | Promise<Nullable<Void>>;

    abstract createActivity(apId: MongoIdScalar, createActivityInput: CreateActivityInput): ActivityGQLSchema | Promise<ActivityGQLSchema>;

    abstract removeActivity(activityId: MongoIdScalar): Nullable<Void> | Promise<Nullable<Void>>;

    abstract createGoal(iapId: MongoIdScalar, createGoalInput: CreateGoalInput): GoalGQLSchema | Promise<GoalGQLSchema>;

    abstract removeGoal(goalId: MongoIdScalar): Nullable<Void> | Promise<Nullable<Void>>;

    abstract createIap(createIapInput: CreateIAPInput): IAPGQLSchema | Promise<IAPGQLSchema>;

    abstract removeIap(iapId: MongoIdScalar): Nullable<Void> | Promise<Nullable<Void>>;

    abstract deployIap(iapId: MongoIdScalar): Nullable<Void> | Promise<Nullable<Void>>;
}

export type Record = any;
export type Void = any;
export type MetricType = any;
export type MongoIdScalar = any;
type Nullable<T> = T | null;
