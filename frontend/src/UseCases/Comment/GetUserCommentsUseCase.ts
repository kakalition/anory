import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

export default class GetUserCommentsUseCase {
  static handle(
    onFulfilled: ((response: AxiosResponse) => void) | null = null,
    onFailed: ((error: any) => void) | null = null,
  ) {
    axios({
      url: `${API_BASE_URL}/api/comments`,
      method: 'GET',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
