import { Resolvers } from '@generated/resolvers-types';
import cursorScalar from './cursor';
import positiveIntScalar from './positive-int';

export const Scalars: Resolvers = {
  Cursor: cursorScalar,
  PositiveInt: positiveIntScalar,
};
