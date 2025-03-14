export const ROUTES = {
  HOME: "/",
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  PRODUCT_PAGE: (page: number) => `/?page=${page}`,
  SINGLE_CATEGORY: (category: string) => `/${category}`,
};
