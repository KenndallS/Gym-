export interface Response<T> {
    status: string;
    data: T;
    error: string;
}
