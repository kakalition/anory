import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

export default class GetStoriesUseCase {
  static handle(
    count: number = 10,
    query: string | null = '',
    onFulfilled: ((response: AxiosResponse) => void) | null = null,
    onFailed: ((error: any) => void) | null = null,
  ) {
    axios({
      url: `${API_BASE_URL}/api/stories?count=${count}&query=${query}`,
      method: 'GET',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
