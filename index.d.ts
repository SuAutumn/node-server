declare type AnyObject = Record<string, any>

declare type RequestParams = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION';
  data?: AnyObject;
  headers?: AnyObject;
  timeout?: number;
}

declare type RequestResult = {
  status: number;
  data: Buffer;
  headers: AnyObject;
}