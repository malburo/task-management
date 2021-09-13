export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  [key: string]: any;
}
export interface Response<T> {
  data: {
    [key: string]: T;
  };
  message: string;
}
