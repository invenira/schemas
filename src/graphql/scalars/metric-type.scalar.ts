import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
import { Kind } from 'graphql/index';
import { GraphQLException } from '@nestjs/graphql/dist/exceptions';

const metricTypes = [
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
];

@Scalar('MetricType', () => Date)
export class MetricTypeScalar implements CustomScalar<string, string> {
  name = 'MetricType';
  description = 'Void custom scalar type';

  parseValue(value: string): string {
    return this.parse(value);
  }

  serialize(value: string): string {
    return value;
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING) {
      return this.parse(ast.value);
    }

    throw new GraphQLException(`Unexpected metric data type: ${ast.kind}`, {
      extensions: { http: { status: 400 } },
    });
  }

  private parse(value: string): string {
    if (metricTypes.includes(value)) {
      return value;
    }

    throw new GraphQLException(`Unexpected metric type: ${value}`, {
      extensions: { http: { status: 400 } },
    });
  }
}
