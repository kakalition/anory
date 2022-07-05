import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

type Payload = {
  id: number
};

export default class DeleteCommentUseCase {
  static handle(
    payload: Payload,
    onFulfilled: ((response: AxiosResponse) => void) | null = null,
    onFailed: ((error: any) => void) | null = null,
  ) {
    axios({
      url: `${API_BASE_URL}/api/comments/${payload.id}`,
      method: 'DELETE',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
