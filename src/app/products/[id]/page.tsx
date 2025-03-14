import ProductDetail from "@/components/product-detail";
import { getSingleProduct } from "@/lib/services/products";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const productId = Number((await params)?.id ?? 1);
  const { data: product } = await getSingleProduct(productId);

  if (!product) return null;

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default Page;
