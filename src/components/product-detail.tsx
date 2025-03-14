"use client";

import { Product as ProductType } from "@/lib/model-types/product";
import useCart from "@/lib/store";
import { formatAmount, getProductUtils } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { GoTag } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import { toast } from "sonner";
import ThumbnailCarousel from "./thumbnail-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import StarRatingComponent from "./ui/star-rating-component";

const MainPrice = ({ price }: { price: number | null }) => {
  if (!price) return null;

  return (
    <span className="text-xl font-bold text-dark break-words">
      {formatAmount(price)}
    </span>
  );
};

const OldPrice = ({ price }: { price: number | null }) => {
  if (!price) return null;
  return (
    <del className="text-[#75757a] text-base break-words">
      {formatAmount(price)}
    </del>
  );
};

const Product = ({ product }: { product: ProductType }) => {
  const { isProductInCart } = useCart();

  const productCartCount = isProductInCart(product.id) || 0;

  return <ProductDetail product={product} key={productCartCount} />;
};

const ProductDetail = ({ product }: { product: ProductType }) => {
  const {
    title: name,
    reviews,
    description,
    price,
    tags,
    sku,
    discountPercentage,
    images: gallery,
    stock,
    id,
  } = product;

  const { reviewsAverage, maxRating, hasDiscount, salePrice } =
    getProductUtils(product);

  const { addToCart, isProductInCart } = useCart();
  const productCartCount = isProductInCart(id) || 0;

  const [counterValue, setCounterValue] = useState(0);

  // To avoid hydration errors
  useEffect(() => {
    if (productCartCount) {
      setCounterValue(productCartCount);
    }
  }, [productCartCount]);

  const handleAddToCart = () => {
    addToCart({ name, id, price }, counterValue, true);
    toast(
      productCartCount === 0
        ? "Product added to cart"
        : "Product quantity updated"
    );
  };

  const outOfStock = counterValue >= stock;
  const counterAtMax = counterValue >= stock;

  const availableQty = stock - productCartCount;

  return (
    <div className="grid grid-cols-10 gap-3 px-3 py-8">
      <div className="col-span-10 md:col-span-6">
        <ThumbnailCarousel gallery={gallery} productName={name} />
      </div>

      <div className="col-span-10 md:col-span-4 flex flex-col">
        <p className="font-semibold text-xl mb-4">{name}</p>
        <p className="mb-4">
          {hasDiscount ? (
            <span className="relative flex items-end flex-wrap space-x-1.5">
              <MainPrice price={salePrice} />
              <OldPrice price={price} />
              <span className="text-primary">{discountPercentage}%</span>
            </span>
          ) : (
            <MainPrice price={price} />
          )}
        </p>
        {reviews?.length ? (
          <div className="flex items-center">
            <span className="font-bold mr-2">
              {reviewsAverage.toFixed(2)}/{maxRating}
            </span>
            <StarRatingComponent
              value={reviewsAverage}
              starCount={maxRating}
              name={name}
            />
            <span className="ml-2 text-[#77878F] text-xs">
              {"("}
              {reviews?.length} Review
              {reviews?.length === 1 ? "" : "s"}
              {")"}
            </span>
          </div>
        ) : null}
        {sku ? <p className="font-medium text-sm">SKU: {sku}</p> : null}
        <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
          <div className="bg-gray flex items-center justify-center space-x-3">
            <Button
              size="icon"
              className="size-[50px] bg-transparent text-primary rounded-full cursor-pointer shadow-sm p-0 hover:bg-gray-100"
              aria-label="Previous"
              disabled={counterValue < 2}
              onClick={() => setCounterValue(counterValue - 1)}
            >
              <FaMinus size={24} />
            </Button>
            <span className="font-semibold text-xl">{counterValue}</span>
            <Button
              size="icon"
              className="size-[50px] bg-transparent text-primary rounded-full cursor-pointer shadow-sm p-0 hover:bg-gray-100"
              aria-label="Previous"
              disabled={outOfStock || counterAtMax}
              onClick={() => setCounterValue(counterValue + 1)}
            >
              <FaPlus size={24} />
            </Button>
          </div>
          <span className="font-semibold text-sm">
            {availableQty} available
          </span>
          <Button
            className="w-full rounded bg-primary text-white mt-1 mb-2"
            onClick={handleAddToCart}
          >
            <GrCart className="mr-2" /> Add to Cart
          </Button>
        </div>
        {tags && (
          <div className="relative flex flex-wrap items-center pt-5 xl:pt-6">
            <span className="space-x-1 self-center text-sm md:text-15px text-opacity-80 inline-flex items-center justify-center me-2 relative">
              <GoTag className="mr-2" />
              <span>Tags:</span>
            </span>

            <span className="flex space-x-2.5">
              {tags?.map((item, i: number) => (
                <span
                  className="inline-block rounded-full border border-gray-100 px-1.5 text-xs"
                  key={`tag-${item ?? i}`}
                >
                  {item}
                </span>
              ))}
            </span>
          </div>
        )}
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black font-semibold text-[15px] leading-4">
              Product Details
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[400px] w-full mt-4 overflow-y-auto">
                {description}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Product;
