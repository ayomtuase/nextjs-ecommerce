import SidePanel from "@/components/side-panel";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCategories } from "@/lib/services/categories";

export default async function Home({
  params,
  children,
}: {
  params: Promise<{ category?: string[] }>;
  children: React.ReactNode;
}) {
  const selectedCategorySlug = (await params)?.category?.[0];

  const { data: categories } = await getCategories();

  const selectedCategory = categories?.find(
    (category) => category?.slug === selectedCategorySlug
  );

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start px-4">
      <section className="w-full my-2">
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] mt-3 lg:mt-6 gap-4 mb-10">
            {categories ? (
              <SidePanel categories={categories} className="sticky top-3.5" />
            ) : null}

            <div className="w-full">
              <div className="flex flex-col w-full items-center md:flex-row gap-2.5 justify-between">
                <h1 className="font-semibold text-lg md:text-2xl mb-2">
                  {selectedCategory?.name ?? "All Categories"}
                </h1>
                <div className="flex justify-between w-full gap-2 md:gap-2.5 md:w-auto">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        className="inline-flex md:grow-0 md:hidden w-[150px] md:px-2.5 mb-3 self-start"
                      >
                        Filter {"&"} Sort
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="px-0 flex flex-col pb-0"
                    >
                      <SheetHeader className="border-b border-border px-2.5 pb-3">
                        <SheetTitle className="text-xl font-medium text-black text-left">
                          Filter and Sort
                        </SheetTitle>
                      </SheetHeader>
                      {categories && (
                        <SidePanel
                          categories={categories}
                          isInSheet={true}
                          className="flex overflow-y-auto styled-scrollbar-vertical flex-grow px-2.5 pb-4"
                        />
                      )}
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
