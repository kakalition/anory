import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

export default class LogoutUseCase {
  static async handle(
    onFulfilled: ((response: AxiosResponse) => void) | null = null,
    onFailed: ((error: any) => void) | null = null,
  ) {
    axios({ url: `${API_BASE_URL}/sanctum/csrf-cookie`, method: 'GET' })
      .then(() => {
        axios({ url: `${API_BASE_URL}/logout`, method: 'POST' })
          .then(onFulfilled)
          .catch(onFailed);
      });
  }
}
