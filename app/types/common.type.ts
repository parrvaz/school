import { ApiResponse } from 'apisauce';

export type ResponseType<DataType> = ApiResponse<DataType | undefined>;
