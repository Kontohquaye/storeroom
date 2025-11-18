import { type SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { storeType } from "./storeType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, storeType],
};
