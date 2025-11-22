import CreateProductDetails from "./ProductDetailsPage";
import { client } from "@/sanity/client";
import { CHECK_SUPPLIERS } from "@/sanity/lib/queries/suppliers";
import { auth } from "@/auth";

const CreateProductForm = async ({ store_id }: { store_id?: string }) => {
  const session = await auth();
  const suppliers = await client
    .withConfig({ useCdn: false })
    .fetch(CHECK_SUPPLIERS, { owner: session?.user?.id });
  // console.log(store_id);
  return (
    <div className="container">
      <CreateProductDetails suppliers={suppliers} store_id={store_id} />
    </div>
  );
};

export default CreateProductForm;
