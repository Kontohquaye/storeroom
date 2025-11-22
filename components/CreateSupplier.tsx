import CreateSupplierForm from "./CreateSupplierForm";

export function CreateSupplier({ expand }: { expand?: boolean }) {
  return (
    <div className="container">
      <CreateSupplierForm />
    </div>
  );
}
