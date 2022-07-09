import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../env';

export default class NewApiCallBuilder {
  static getInstance = () => new this();

  private baseUrl: string = API_BASE_URL;

  private endpoint: string = '';

  private method: string = 'GET';

  private payload: any;

  private params: any;

  private onSuccess: ((response: AxiosResponse) => void) | null = null;

  private onFailed: ((error: any) => void) | null = null;

  addBaseUrl = (baseUrl: string) => {
    this.baseUrl = baseUrl;
    return this;
  };

  addEndpoint = (endpoint: string) => {
    this.endpoint = endpoint;
    return this;
  };

  addMethod = (method: string) => {
    this.method = method;
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
    axios({
      url: `${API_BASE_URL}/${this.endpoint}`,
      method: this.method,
      params: this.params,
    }).then(this.onSuccess)
      .catch(this.onFailed);
  };
}
