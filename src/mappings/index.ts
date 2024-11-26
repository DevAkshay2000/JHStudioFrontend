import customerSchema from "../components/customers/formSchema.json";

export const menuSchemaHandlerMap: {
  [key: number]: {
    schema: object;
  };
} = {
  14: {
    schema: customerSchema,
  },
};
