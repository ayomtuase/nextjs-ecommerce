import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { getProducts } from "@/lib/services/products";
import { cn } from "@/lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default async function Home({
  params,
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ category?: string[] }>;
}) {
  const _searchParams = await searchParams;

  const currentPage =
    typeof _searchParams.page === "string"
      ? parseInt(_searchParams.page, 10) || 1
      : 1;
  const sortBy =
    typeof _searchParams.sort === "string" ? _searchParams.sort : "";
  const sortOrder = sortBy
    ? typeof _searchParams.order === "string"
      ? _searchParams.order || "asc"
      : "asc"
    : "";
  const selectedCategorySlug = (await params)?.category?.[0];

  const { data } = await getProducts({
    pageNo: currentPage,
    category: selectedCategorySlug,
    sortBy,
    sortOrder,
  });
  const products = data?.products;

  const lastPage = data?.noOfPages;

  const paginationPages = (() => {
    if (!lastPage) return undefined;
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };

    if (currentPage === 1)
      return range(
        currentPage,
        currentPage + 2 > lastPage ? lastPage : currentPage + 2
      );
    if (currentPage === lastPage)
      return range(currentPage - 2 < 1 ? 1 : currentPage - 2, currentPage);
    return [currentPage - 1, currentPage, currentPage + 1];
  })();

  return (
    <div className="flex flex-col space-y-3 w-full">
      <div className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
        {products?.map((product) => {
          return (
            <ProductCard
              key={product?.id}
              product={product}
              className="2xl:min-h-[400px]"
            />
          );
        })}
      </div>
      {currentPage && lastPage ? (
        <div className="w-full flex my-6 lg:my-10 items-center justify-center space-x-2">
          <Button
            size="icon"
            className="size-[50px] bg-transparent text-primary rounded-full cursor-pointer shadow-sm p-0 hover:text-white"
            aria-label="Previous"
            disabled={currentPage < 2}
            asChild
          >
            {currentPage < 2 ? (
              <span>
                <IoIosArrowBack size={24} />
              </span>
            ) : (
              <a href={ROUTES.PRODUCT_PAGE(currentPage - 1)} className="z-10">
                <IoIosArrowBack size={24} />
              </a>
            )}
          </Button>
          {paginationPages?.map((page) => (
            <Button
              key={page}
              size="icon"
              className={cn(
                "size-[50px] bg-white rounded-full font-semibold text-3xl border border-primary cursor-pointer shadow-sm p-0 hover:text-white",
                page === currentPage ? "bg-primary" : "bg-transparent",
                page === currentPage ? "text-white" : "text-primary"
              )}
              aria-label="Previous"
              asChild
            >
              {currentPage === page ? (
                <span>{page}</span>
              ) : (
                <a href={ROUTES.PRODUCT_PAGE(page)} className="z-10">
                  {page}
                </a>
              )}
            </Button>
          ))}
          <Button
            size="icon"
            className="size-[50px] bg-transparent text-primary rounded-full cursor-pointer shadow-sm p-0 hover:text-white"
            aria-label="Previous"
            disabled={currentPage >= lastPage}
            asChild
          >
            {currentPage >= lastPage ? (
              <span>
                <IoIosArrowForward size={24} />
              </span>
            ) : (
              <a href={ROUTES.PRODUCT_PAGE(currentPage + 1)} className="z-10">
                <IoIosArrowForward size={24} />
              </a>
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
