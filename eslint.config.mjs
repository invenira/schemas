// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ['./src/types/graphql.types.ts', 'src/ap/ap-client.ts', 'src/graphql/scalars/void.scalar.ts'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
);