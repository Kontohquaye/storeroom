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

export type SupplierFormType = {
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  errors: {};
};

export type SupplierFormState = {
  success: boolean;
  errors?: {
    name?: { errors: string[] };
    email?: { errors: string[] };
    phone?: { errors: string[] };
    country?: { errors: string[] };
    address?: { errors: string[] };
  };
};
