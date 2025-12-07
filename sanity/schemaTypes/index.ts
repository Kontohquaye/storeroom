import { type SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { storeType } from "./storeType";
import { supplierType } from "./supplierType";
import { productType } from "./productType";
import { salesType } from "./salesType";
import { stockType } from "./stockType";
import { subscriptionType } from "./subscriptionType";
import { couponType } from "./couponType";
import { invoiceType } from "./invoiceType";
import { giftCouponType } from "./giftCouponType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    userType,
    storeType,
    supplierType,
    productType,
    salesType,
    stockType,
    subscriptionType,
    couponType,
    invoiceType,
    giftCouponType,
  ],
};
