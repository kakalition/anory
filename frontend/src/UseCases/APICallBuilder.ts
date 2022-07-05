import { AxiosResponse } from 'axios';
import { BaseUseCase } from './BaseUseCase';

export default class APICallBuilder {
  private action: BaseUseCase | null = null;

  private payload: any = null;

  private params: any = null;

  private onSuccess: ((response: AxiosResponse) => void) | null = null;

  private onFailed: ((error: any) => void) | null = null;

  addAction = (action: BaseUseCase) => {
    this.action = action;
    return this;
  };

  addPayload = (payload: any) => {
    this.payload = payload;
    return this;
  };

  addParams = (params: any) => {
    this.params = params;
    return this;
  };

  addOnSuccess = (onSuccess: (response: AxiosResponse) => void) => {
    this.onSuccess = onSuccess;
    return this;
  };

  addOnFailed = (onFailed: (error: any) => void) => {
    this.onFailed = onFailed;
    return this;
  };

  call = () => {
    if (this.action === null) {
      throw new Error('Action should be added.');
    }

    this.action(this.payload, this.params, this.onSuccess, this.onFailed);
  };
}
