const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <div className="container">details {id}</div>;
};

export default ProductDetails;
