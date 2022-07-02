import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

export default class GetCommentsUseCase {
  static handle(
    storyId: number,
    onFulfilled: ((response: AxiosResponse) => void) | null = null,
    onFailed: ((error: any) => void) | null = null,
  ) {
    axios({
      url: `${API_BASE_URL}/api/stories/${storyId}/comments`,
      method: 'GET',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
