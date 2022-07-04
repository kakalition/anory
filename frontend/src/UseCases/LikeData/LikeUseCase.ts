import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

type Payload = {
  id: number,
  type: 'stories' | 'comments',
};

export default class LikeUseCase {
  static handle(
    payload: Payload,
    onFulfilled: ((response: AxiosResponse) => void) | null = null,
    onFailed: ((error: any) => void) | null = null,
  ) {
    axios({
      url: `${API_BASE_URL}/api/${payload.type}/${payload.id}/likedata`,
      method: 'POST',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
