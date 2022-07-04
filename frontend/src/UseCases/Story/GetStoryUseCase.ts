import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

export default class GetStoryUseCase {
  static handle(
    storyId: number,
    onFulfilled: (response: AxiosResponse) => void,
    onFailed: (error: any) => void,
  ) {
    axios({
      url: `${API_BASE_URL}/api/stories/${storyId}`,
      method: 'GET',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
