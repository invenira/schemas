import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory
  .generate({
    typePaths: ['./src/invenira_backend_schema.graphql'],
    path: join(process.cwd(), './src/types/graphql.types.ts'),
    outputAs: 'interface',
  })
  .then(() => console.log('Completed'));
