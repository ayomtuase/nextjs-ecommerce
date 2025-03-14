import { APIResponseData } from "../model-types/api-response-data";
import { Product, ProductsResponseData } from "../model-types/product";
import { createUrlWithParams } from "../utils";

export async function getProducts({
  pageNo,
  category,
  limit = 20,
  sortBy,
  sortOrder,
}: {
  pageNo: number;
  category?: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
}): Promise<APIResponseData<ProductsResponseData | undefined>> {
  try {
    const url = createUrlWithParams(
      `https://dummyjson.com/products${
        category ? `/category/${category}` : ""
      }`,
      {
        limit,
        skip: limit * (pageNo - 1),
        sortBy: sortBy,
        order: sortOrder,
      }
    );
    const res = await fetch(url, {
      cache: "force-cache",
    });
    const data = await res.json();
    const noOfPages = Math.ceil(data?.total / limit);
    return { data: { ...data, noOfPages }, success: true };
  } catch {
    return {
      msg: "Failed to fetch products",
      data: undefined,
      success: false,
    };
  }
}

export async function getSingleProduct(
  productId: number
): Promise<APIResponseData<Product | undefined>> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`, {
      cache: "force-cache",
    });
    const data = await res.json();
    return { data, success: true };
  } catch {
    return {
      msg: "Failed to fetch product",
      data: undefined,
      success: false,
    };
  }
}
