export type StockType = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  comments: string;
  damaged: number;
  date: string;
  name: string;
  product: { _ref: string; _type: string };
  quantity: number;
  supplier: { _ref: string; _type: string };
  time: string;
  to_return: number;
  unit_price: number;
};

export type MonthData = {
  month: string;
  damaged: number;
  intact: number;
};
