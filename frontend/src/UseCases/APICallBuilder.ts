import { BaseUseCase } from './BaseUseCase';

export default class APICallBuilder {
  private action: BaseUseCase | null = null;

  private payload: any = null;

  private onSuccess: (() => void) | null = null;

  private onFailed: (() => void) | null = null;

  addAction = (action: BaseUseCase) => {
    this.action = action;
    return this;
  };

  addPayload = (payload: any) => {
    this.payload = payload;
    return this;
  };

  addOnSuccess = (onSuccess: () => void) => {
    this.onSuccess = onSuccess;
    return this;
  };

  addOnFailed = (onFailed: () => void) => {
    this.onFailed = onFailed;
    return this;
  };

  call = () => {
    if (this.action === null) {
      throw new Error('Action should be added.');
    }

    this.action(this.payload, this.onSuccess, this.onFailed);
  };
}
