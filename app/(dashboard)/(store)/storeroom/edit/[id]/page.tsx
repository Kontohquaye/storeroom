import { FolderCog } from "lucide-react";

import { fetchSingleStore } from "@/lib/actions";
import EditStoreForm from "@/components/EditStoreForm";

const EditStore = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const store = await fetchSingleStore(id);
  // console.log(store);

  return (
    <div className="content ml-6 mt-4 flex justify-center items-center ">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="title flex items-center gap-2 mb-2">
          <FolderCog />
          <h1>Edit storeroom id: {id}</h1>
        </div>
        <EditStoreForm id={id} store={store} />
      </div>
    </div>
  );
};

export default EditStore;
