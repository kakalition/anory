import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

export default class DeleteStoryUseCase {
  static handle(
    storyId: number,
    onFulfilled: (response: AxiosResponse) => void,
    onFailed: (error: any) => void,
  ) {
    axios({
      url: `${API_BASE_URL}/api/stories/${storyId}`,
      method: 'DELETE',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
