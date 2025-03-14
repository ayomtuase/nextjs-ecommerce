import { APIResponseData } from "../model-types/api-response-data";
import { Category } from "../model-types/category";

export async function getCategories(): Promise<
  APIResponseData<Category[] | undefined>
> {
  try {
    const res = await fetch(`https://dummyjson.com/products/categories`, {
      cache: "force-cache",
    });
    const data = await res.json();
    return { data, success: true };
  } catch {
    return {
      msg: "Failed to fetch categories",
      data: undefined,
      success: false,
    };
  }
}
