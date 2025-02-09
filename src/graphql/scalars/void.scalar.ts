import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';

@Scalar('Void', () => Date)
export class VoidScalar implements CustomScalar<any, void> {
  name = 'Void';
  description = 'Void custom scalar type';

  parseValue(value: string): void {

  }

  serialize(value: void): void {
  }

  parseLiteral(ast: ValueNode): any {
  }
}
