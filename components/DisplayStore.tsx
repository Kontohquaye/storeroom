import { StoreListType } from "@/app/types/store";
import { DataTable } from "./DataTable";

const DisplayStore = async ({ stores }: { stores: StoreListType[] }) => {
  // fetch store

  return (
    <div className="container">
      <DataTable stores={stores} />
    </div>
  );
};

export default DisplayStore;
