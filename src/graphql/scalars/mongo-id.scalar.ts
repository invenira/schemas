import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { GraphQLException } from '@nestjs/graphql/dist/exceptions';
import { Types } from 'mongoose';

@Scalar('MongoIdScalar', () => Types.ObjectId)
export class MongoIdCustomScalar implements CustomScalar<string, Types.ObjectId> {
  name = 'MongoIdScalar';
  description = 'Date custom scalar type';

  parseValue(value: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new GraphQLException(`Invalid id: ${value}`, {
        extensions: { http: { status: 400 } },
      });
    }

    return new Types.ObjectId(value);
  }

  serialize(value: Types.ObjectId): string {
    return value.toString();
  }

  parseLiteral(ast: ValueNode): Types.ObjectId {
    if (ast.kind === Kind.STRING) {
      return this.parseValue(ast.value);
    }

    throw new GraphQLException(`Unexpected id type: ${ast.kind}`, {
      extensions: { http: { status: 400 } },
    });
  }
}
