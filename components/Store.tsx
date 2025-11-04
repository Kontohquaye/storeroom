import DisplayStore from "./DisplayStore";
import { EmptyStore } from "./EmptyStore";

const StoreRoom = async () => {
  const show = true;
  return (
    <div className="content">
      {show && <DisplayStore />}
      {!show && <EmptyStore />}
    </div>
  );
};

export default StoreRoom;
