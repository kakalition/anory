import { AxiosResponse } from 'axios';

export default interface GetUseCase {
  handle(
    id: number,
    onFulfilled: (response: AxiosResponse) => void,
    onFailed: (error: any) => void,
  ): void;
}
