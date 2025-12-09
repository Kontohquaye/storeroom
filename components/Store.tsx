import { auth } from "@/auth";
import DisplayStore from "./DisplayStore";
import { EmptyStore } from "./EmptyStore";
import { fetchStore } from "@/lib/actions";

const StoreRoom = async () => {
  const session = await auth();
  const storeList = session?.user?.id && fetchStore();
  const stores = (await storeList) || [];
  // console.log(stores);
  return (
    <div className="content">
      {stores.length > 0 && <DisplayStore stores={stores} />}
      {stores.length <= 0 && <EmptyStore />}
    </div>
  );
};

export default StoreRoom;
