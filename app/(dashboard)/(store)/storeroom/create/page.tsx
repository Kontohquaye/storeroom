import { FolderPlus } from "lucide-react";
import { SiteHeader } from "@/components/PageHeader";
import CreateStoreForm from "@/components/CreateStoreForm";

const CreatStore = () => {
  const heading = "Storeroom Entry";
  return (
    <div className="content">
      <SiteHeader heading={heading} />

      <div className="content ml-6 mt-4 flex justify-center items-center ">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <div className="title flex items-center gap-2 mb-2">
            <FolderPlus />
            <h1>Create storeroom</h1>
          </div>
          <CreateStoreForm />
        </div>
      </div>
    </div>
  );
};

export default CreatStore;
