import { GraphQLScalarType, Kind } from "graphql";

/**
 * A custom scalar representing a `Date`.
 */
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "A scalar representing a date in time",

  serialize(value: Date): number {
    return value.getTime();
  },

  parseValue(value: number): Date {
    return new Date(value);
  },

  parseLiteral(ast): Date | null {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }

    return null;
  },
});

export { dateScalar };
