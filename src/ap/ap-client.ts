import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

type QualitativeAnalytics = Readonly<Array<Metric>>;
type Metric = Partial<
  Readonly<{
    name: string;
    /**
     * @enum string, number, boolean, bigint, date, arrayAny, arrayNumber, arrayString, objectAny, recordAny
     */
    type:
      | 'string'
      | 'number'
      | 'boolean'
      | 'bigint'
      | 'date'
      | 'arrayAny'
      | 'arrayNumber'
      | 'arrayString'
      | 'objectAny'
      | 'recordAny';
  }>
>;
type QualitativeAnalyticsWithValue = Readonly<Array<MetricWithValue>>;
type MetricWithValue = Partial<
  Readonly<{
    name: string;
    /**
     * @enum string, number, boolean, bigint, date, arrayAny, arrayNumber, arrayString, objectAny, recordAny
     */
    type:
      | 'string'
      | 'number'
      | 'boolean'
      | 'bigint'
      | 'date'
      | 'arrayAny'
      | 'arrayNumber'
      | 'arrayString'
      | 'objectAny'
      | 'recordAny';
    value: {};
  }>
>;
type QuantitativeAnalytics = Readonly<Array<Metric>>;
type QuantitativeAnalyticsWithValue = Readonly<Array<MetricWithValue>>;
type AnalyticsContractResponse = Partial<
  Readonly<{
    qualAnalytics: QualitativeAnalytics;
    quantAnalytics: QuantitativeAnalytics;
  }>
>;
type StudentActivityAnalytics = Partial<
  Readonly<{
    inveniraStudentId: string;
    qualAnalytics: QualitativeAnalyticsWithValue;
    quantAnalytics: QuantitativeAnalyticsWithValue;
  }>
>;
type AnalyticsResponse = Readonly<Array<StudentActivityAnalytics>>;

const ConfigParametersResponse = z
  .array(
    z
      .object({
        name: z.string(),
        type: z.enum([
          'string',
          'number',
          'boolean',
          'bigint',
          'date',
          'arrayAny',
          'arrayNumber',
          'arrayString',
          'objectAny',
          'recordAny',
        ]),
      })
      .strict()
      .passthrough()
      .readonly(),
  )
  .readonly();
const ConfigInterfaceResponse = z
  .object({ interfaceUrl: z.string() })
  .strict()
  .passthrough()
  .readonly();
const Metric: z.ZodType<Metric> = z
  .object({
    name: z.string(),
    type: z.enum([
      'string',
      'number',
      'boolean',
      'bigint',
      'date',
      'arrayAny',
      'arrayNumber',
      'arrayString',
      'objectAny',
      'recordAny',
    ]),
  })
  .strict()
  .passthrough()
  .readonly();
const QualitativeAnalytics: z.ZodType<QualitativeAnalytics> = z
  .array(Metric)
  .readonly();
const QuantitativeAnalytics: z.ZodType<QuantitativeAnalytics> = z
  .array(Metric)
  .readonly();
const AnalyticsContractResponse: z.ZodType<AnalyticsContractResponse> = z
  .object({
    qualAnalytics: QualitativeAnalytics,
    quantAnalytics: QuantitativeAnalytics,
  })
  .strict()
  .passthrough()
  .readonly();
const MetricWithValue: z.ZodType<MetricWithValue> = z
  .object({
    name: z.string(),
    type: z.enum([
      'string',
      'number',
      'boolean',
      'bigint',
      'date',
      'arrayAny',
      'arrayNumber',
      'arrayString',
      'objectAny',
      'recordAny',
    ]),
    value: z.object({}).strict().passthrough().readonly(),
  })
  .strict()
  .passthrough()
  .readonly();
const QualitativeAnalyticsWithValue: z.ZodType<QualitativeAnalyticsWithValue> =
  z.array(MetricWithValue).readonly();
const QuantitativeAnalyticsWithValue: z.ZodType<QuantitativeAnalyticsWithValue> =
  z.array(MetricWithValue).readonly();
const StudentActivityAnalytics: z.ZodType<StudentActivityAnalytics> = z
  .object({
    inveniraStudentId: z.string(),
    qualAnalytics: QualitativeAnalyticsWithValue,
    quantAnalytics: QuantitativeAnalyticsWithValue,
  })
  .strict()
  .passthrough()
  .readonly();
const AnalyticsResponse: z.ZodType<AnalyticsResponse> = z
  .array(StudentActivityAnalytics)
  .readonly();
const DeployActivityRequest = z
  .object({ parameters: z.object({}).strict().passthrough().readonly() })
  .strict()
  .passthrough()
  .readonly();
const ProvideActivityReply = z
  .object({ activityUrl: z.string() })
  .strict()
  .passthrough()
  .readonly();

export const schemas = {
  ConfigParametersResponse,
  ConfigInterfaceResponse,
  Metric,
  QualitativeAnalytics,
  QuantitativeAnalytics,
  AnalyticsContractResponse,
  MetricWithValue,
  QualitativeAnalyticsWithValue,
  QuantitativeAnalyticsWithValue,
  StudentActivityAnalytics,
  AnalyticsResponse,
  DeployActivityRequest,
  ProvideActivityReply,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/activity/:id',
    alias: 'deploy',
    description: `The AP should prepare itself to start collecting metrics for this activity id.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({
            parameters: z.object({}).strict().passthrough().readonly(),
          })
          .strict()
          .passthrough()
          .readonly(),
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.string().describe('Activity id'),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `When there are missing activity parameters in the request body.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'post',
    path: '/activity/:id/:studentId',
    alias: 'provideActivity',
    description: `The AP should start collecting metrics for this activity id and student id combination. It should also return the deployUrl that will be forwarded by the Inven!RA platform to the student.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string().describe('Activity id'),
      },
      {
        name: 'studentId',
        type: 'Path',
        schema: z.string().describe('Inven!RA Student Id'),
      },
    ],
    response: z
      .object({ activityUrl: z.string() })
      .strict()
      .passthrough()
      .readonly(),
    errors: [
      {
        status: 404,
        description: `Activity ID not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'get',
    path: '/analytics/:id',
    alias: 'provideAnalytics',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z.array(StudentActivityAnalytics).readonly(),
    errors: [
      {
        status: 404,
        description: `Activity ID not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'get',
    path: '/analytics/contract',
    alias: 'getAnalyticsContract',
    requestFormat: 'json',
    response: AnalyticsContractResponse,
  },
  {
    method: 'get',
    path: '/configuration/interface',
    alias: 'getConfigInterface',
    requestFormat: 'json',
    response: z
      .object({ interfaceUrl: z.string() })
      .strict()
      .passthrough()
      .readonly(),
  },
  {
    method: 'get',
    path: '/configuration/parameters',
    alias: 'getConfigParameters',
    requestFormat: 'json',
    response: ConfigParametersResponse,
  },
]);

export const ActivityProviderAPI = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
