import { AxiosResponse } from 'axios';

export type BaseUseCase = (
  payload: any,
  onSuccess: ((response: AxiosResponse) => void) | null,
  onFailed: ((error: any) => void) | null
) => void;
