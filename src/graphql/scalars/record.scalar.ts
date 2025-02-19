import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { GraphQLException } from '@nestjs/graphql/dist/exceptions';

/* eslint-disable @typescript-eslint/no-explicit-any */
@Scalar('Record', () => {})
export class RecordScalar implements CustomScalar<any, Record<string, any>> {
  name = 'Record';
  description = 'Custom scalar type for a Record<string, any>';

  parseValue(value: any): Record<string, any> {
    return value;
  }

  serialize(value: Record<string, any>): any {
    return value;
  }

  parseLiteral(ast: ValueNode): Record<string, any> {
    if (ast.kind === Kind.OBJECT) {
      const obj = this.parseObject(ast);
      return Object.entries(obj);
    }

    throw new GraphQLException(`Unexpected record type: ${ast.kind}`, {
      extensions: { http: { status: 400 } },
    });
  }

  private parseObject(ast: any): any {
    const value: any = {};
    ast.fields.forEach(
      (field: { name: { value: string | number }; value: ValueNode }) => {
        value[field.name.value] = this.parseValueNode(field.value);
      },
    );
    return value;
  }

  private parseValueNode(node: ValueNode): any {
    switch (node.kind) {
      case Kind.STRING:
        return node.value;
      case Kind.BOOLEAN:
        return node.value;
      case Kind.INT:
        return parseInt(node.value, 10);
      case Kind.FLOAT:
        return parseFloat(node.value);
      case Kind.OBJECT:
        return this.parseObject(node);
      case Kind.LIST:
        return node.values.map((val) => this.parseValueNode(val));
      case Kind.NULL:
        return null;
      default:
        return null;
    }
  }
}
