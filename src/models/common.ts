export interface IParams {
  page: string;
  limit: string;
  sort?: string;
  order?: 'asc' | 'desc';
  q?: string;
  [key: string]: any;
}
export interface Response<T> {
  data: {
    [key: string]: T;
  };
  status: string;
}
export interface ResponseList<T> {
  data: {
    [key: string]: T | IParams;
    pagination: IParams;
  };
  status: string;
}
export interface ErrorResponse {
  message: string;
}
