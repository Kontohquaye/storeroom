import { type SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { storeType } from "./storeType";
import { supplierType } from "./supplierType";
import { productType } from "./productType";
import { salesType } from "./salesType";
import { stockType } from "./stockType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, storeType, supplierType, productType, salesType, stockType],
};
