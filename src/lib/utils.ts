import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "./model-types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(
  amount: number,
  currencyCode = "USD",
  locale = "en",
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: currencyCode ?? "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
}

export function getProductUtils(product: Product) {
  const { reviews, price, discountPercentage } = product;
  const reviewsAverage =
    reviews?.reduce((acc, { rating }) => rating + acc, 0) / reviews?.length;

  const maxRating = 5;
  const hasDiscount = discountPercentage > 0;
  const salePrice = price - price * (discountPercentage / 100);

  return {
    reviewsAverage,
    maxRating,
    hasDiscount,
    salePrice,
  };
}

export const createUrlWithParams = (
  pathname: string,
  params?: Record<string, string | number | undefined> | URLSearchParams
) => {
  if (!params) return pathname;
  if (params instanceof URLSearchParams) {
    return `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  }

  const filterString = `${new URLSearchParams(
    Object.fromEntries(
      Object.entries(params)
        .filter(
          ([, value]) => value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => [key, value?.toString()])
    ) as Record<string, string>
  ).toString()}`;

  return `${pathname}${filterString ? `?${filterString}` : ""}`;
};
