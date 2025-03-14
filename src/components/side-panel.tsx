"use client";

import { ROUTES } from "@/lib/routes";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Fragment } from "react";
import { SheetClose } from "./ui/sheet";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { productSortOptions, productSortOrder } from "@/lib/constants";
import { Category } from "@/lib/model-types/category";
import { cn, createUrlWithParams } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

const noSortKey = "no-sort";

const SidePanel = ({
  categories,
  className,
  isInSheet = false,
}: {
  categories: Category[];
  className?: string;
  isInSheet?: boolean;
}) => {
  const { category } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategoryId = Array.isArray(category)
    ? category[0]
    : category ?? "";

  const sortField = searchParams?.get("sort") ?? "";
  const sortOrder = searchParams?.get("order") ?? "";
  const router = useRouter();
  const onCategoryChange = (value: string) => {
    router.push(ROUTES.SINGLE_CATEGORY(value));
  };

  const onSortFieldChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === noSortKey) {
      newSearchParams.delete("sort");
      newSearchParams.delete("order");
    } else {
      newSearchParams.set("sort", value);
    }
    router.push(createUrlWithParams(pathname, newSearchParams));
  };

  const onSortOrderChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("order", value);
    router.push(createUrlWithParams(pathname, newSearchParams));
  };

  const SubmitWrapper = isInSheet ? SheetClose : Fragment;
  const wrapperProps = isInSheet ? { asChild: true } : {};
  return (
    <div className={cn("hidden md:flex flex-col", className)}>
      <h2 className="font-medium uppercase mb-3.5">CATEGORY</h2>
      <ScrollArea className="max-h-[300px] lg:max-h-[500px]">
        <RadioGroup
          defaultValue={selectedCategoryId}
          onValueChange={onCategoryChange}
          className="flex flex-col space-y-2.5 border-border pb-5"
        >
          <SubmitWrapper {...wrapperProps}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={""} id={"All"} />
              <Label htmlFor={"All"}>All Categories</Label>
            </div>
          </SubmitWrapper>
          {categories.map(({ slug, name }) => {
            return (
              <SubmitWrapper {...wrapperProps} key={slug}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={slug} id={slug} />
                  <Label htmlFor={slug}>{name}</Label>
                </div>
              </SubmitWrapper>
            );
          })}
        </RadioGroup>
      </ScrollArea>

      <h2 className="font-medium uppercase mb-3.5 mt-4">SORT BY</h2>
      <ScrollArea className="max-h-[300px] lg:max-h-[500px]">
        <RadioGroup
          defaultValue={sortField}
          onValueChange={onSortFieldChange}
          className="flex flex-col space-y-2.5 border-border pb-5"
        >
          {productSortOptions.map(({ field, name }) => {
            return (
              <SubmitWrapper {...wrapperProps} key={field}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={field} id={field} />
                  <Label htmlFor={field}>{name}</Label>
                </div>
              </SubmitWrapper>
            );
          })}
          <SubmitWrapper {...wrapperProps}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={noSortKey} id={noSortKey} />
              <Label htmlFor={noSortKey}>No sort</Label>
            </div>
          </SubmitWrapper>
        </RadioGroup>
      </ScrollArea>

      <h2 className="font-medium uppercase mb-3.5 mt-4">SORT ORDER</h2>
      <RadioGroup
        defaultValue={sortOrder}
        onValueChange={onSortOrderChange}
        className="flex flex-col space-y-2.5 border-border pb-5"
      >
        {productSortOrder.map(({ field, name }) => {
          return (
            <SubmitWrapper {...wrapperProps} key={field}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={field} id={field} />
                <Label htmlFor={field}>{name}</Label>
              </div>
            </SubmitWrapper>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default SidePanel;
