import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema/**/*.graphql',
  generates: {
    './dist/__generated__/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        federation: true,
        useIndexSignature: true,
        contextType: '../schema/data-source-context#DataSourceContext',
      },
    },
    './src/__generated__/resolvers-types.ts': {
      config: {
        federation: true,
        useIndexSignature: true,
        contextType: '../schema/data-source-context#DataSourceContext',
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
