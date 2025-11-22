export type supplierType = {
  name: string;
  phone: string;
  email: string;
  address: string;
  status: string;
  country: string;
};

export type SupplierListType = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  address: string;
  country: string;
  email: string;
  name: string;
  owner: { _ref: string; _type: string };
  phone: string;
  status: string;
};
