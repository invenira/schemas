import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { GraphQLException } from '@nestjs/graphql/dist/exceptions';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  name = 'Date';
  description = 'Date custom scalar type';

  parseValue(value: string): Date {
    return new Date(value);
  }

  serialize(value: Date): string {
    return value.toISOString();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }

    throw new GraphQLException(`Unexpected date type: ${ast.kind}`, {
      extensions: { http: { status: 400 } },
    });
  }
}
