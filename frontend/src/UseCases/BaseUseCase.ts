import { AxiosResponse } from 'axios';

export type BaseUseCase = (
  payload: any,
  queries: any,
  onSuccess: ((response: AxiosResponse) => void) | null,
  onFailed: ((error: any) => void) | null
) => void;
