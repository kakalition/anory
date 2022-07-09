import { AxiosResponse } from 'axios';

abstract class IAPICallBuilder {
  private payload: any;

  private params: any = null;

  private onSuccess: ((response: AxiosResponse) => void) | null = null;

  private onFailed: ((error: any) => void) | null = null;
}

export default IAPICallBuilder;
