import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

type Payload = {
  storyId: number,
  comment: string
};

export default class PostCommentUseCase {
  static handle(
    payload: Payload,
    onFulfilled: ((response: AxiosResponse) => void) | null = null,
    onFailed: ((error: any) => void) | null = null,
  ) {
    axios({
      url: `${API_BASE_URL}/api/stories/${payload.storyId}/comments`,
      method: 'POST',
      data: {
        comment: payload.comment,
      },
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
