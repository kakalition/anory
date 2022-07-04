import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

type Payload = {
  story_id: number
};

export default class LikeStoryUseCase {
  static handle(
    payload: Payload,
    onFulfilled: ((response: AxiosResponse) => void) | null = null,
    onFailed: ((error: any) => void) | null = null,
  ) {
    axios({
      url: `${API_BASE_URL}/api/stories/${payload.story_id}/likedata`,
      method: 'POST',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
