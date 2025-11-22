export type ProductTemplateType = {
  name: string;
  on_sale: string;
  instock: string;
  supplier: {
    _type: string;
    _ref: string;
  };
  store: {
    _type: string;
    _ref: string | undefined;
  };
  damaged: string;
};

export type Product = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  damaged: string;
  instock: string;
  name: string;
  on_sale: string;
  owner: { _ref: string; _type: "reference" };
  store: { _ref: string; _type: "reference" };
  supplier: { _ref: string; _type: "reference" };
};
