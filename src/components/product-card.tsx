"use client";

import { Product } from "@/lib/model-types/product";
import { ROUTES } from "@/lib/routes";
import useCart from "@/lib/store";
import { cn, formatAmount, getProductUtils } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus, FaRegStar, FaStar } from "react-icons/fa6";
import { Button } from "./ui/button";
import StarRatingComponent from "./ui/star-rating-component";

const MainPrice = ({ price }: { price?: number | null }) => {
  if (!price) return null;

  return (
    <p className="text-base leading-none font-semibold text-primary-black break-words">
      {formatAmount(price)}
    </p>
  );
};

const OldPrice = ({ price }: { price?: number | null }) => {
  if (!price) return null;
  return (
    <del className="text-[#75757a] text-sm break-words">
      {formatAmount(price)}
    </del>
  );
};

interface ProductProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductProps) => {
  const { reviews, title, discountPercentage, thumbnail, id, price, stock } =
    product;
  const { addToCart, isProductInCart, removeFromCart } = useCart();

  const productCartCount = isProductInCart(id) || 0;

  const updateCartCount = (count: number) => {
    if (count === 0) {
      removeFromCart(id);
    } else {
      addToCart({ name: title, id, price }, count, true);
    }
  };

  const { reviewsAverage, maxRating, hasDiscount, salePrice } =
    getProductUtils(product);

  const outOfStock = productCartCount >= stock;

  return (
    <div
      className={cn(
        "relative h-[400px] flex flex-col border border-grey rounded-sm pb-2",
        className
      )}
    >
      {hasDiscount ? (
        <span
          className={cn(
            "absolute top-3 left-3 rounded-sm z-10 text-xs font-semibold px-2.5 py-1.5 text-primary-black",
            {
              "bg-primary-orange": !hasDiscount,
              "bg-secondary-yellow": hasDiscount,
            }
          )}
        >
          {discountPercentage}% OFF
        </span>
      ) : null}
      <div className="grow relative mb-3 overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-contain"
          priority={true}
        />
      </div>
      <div className="px-2.5 md:px-4 min-h-0">
        {reviews?.length ? (
          <div className="flex items-center">
            <StarRatingComponent
              value={reviewsAverage}
              starCount={maxRating}
              name={title}
              filledStarIcon={<FaStar size={16} />}
              emptyStarIcon={<FaRegStar size={16} />}
            />
            <span className="ml-2 text-[#77878F] text-xs">
              {"("}
              {reviewsAverage.toFixed(1)}
              {")"}
            </span>
          </div>
        ) : null}
        <p className="text-primary-black mt-1 mb-1 line-clamp-2">{title}</p>
        {hasDiscount ? (
          <div className="relative flex items-center flex-wrap gap-x-1.5">
            <OldPrice price={price} />
            <MainPrice price={salePrice} />
          </div>
        ) : (
          <MainPrice price={price} />
        )}
        <Link
          href={ROUTES.PRODUCT_DETAIL(id)}
          className="z-10 my-2 underline text-sm"
        >
          View Product Details
        </Link>
        {productCartCount ? (
          <div className="bg-gray flex items-center justify-center space-x-3 h-[49px]">
            <Button
              size="icon"
              className="size-[30px] bg-transparent text-primary rounded-full cursor-pointer shadow-sm p-0 hover:bg-gray-100"
              aria-label="Previous"
              onClick={() => updateCartCount(productCartCount - 1)}
            >
              <FaMinus size={20} />
            </Button>
            <span className="font-semibold text-base">{productCartCount}</span>
            <Button
              size="icon"
              className="size-[30px] bg-transparent text-primary rounded-full cursor-pointer shadow-sm p-0 hover:bg-gray-100"
              aria-label="Previous"
              disabled={outOfStock}
              onClick={() => updateCartCount(productCartCount + 1)}
            >
              <FaPlus size={20} />
            </Button>
          </div>
        ) : (
          <Button
            className="w-full mt-2 rounded-sm"
            onClick={() => updateCartCount(1)}
          >
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
