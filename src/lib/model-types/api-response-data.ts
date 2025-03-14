export interface APIResponseData<T = unknown> {
  msg?: string;
  data: T;
  success: boolean;
}
