import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

type Payload = {
  categoryId: number | undefined | null,
  title: string | undefined | null,
  body: string | undefined | null
};

export default class UpdateStoryUseCase {
  static handle(
    storyId: number,
    payload: Payload,
    onFulfilled: (response: AxiosResponse) => void,
    onFailed: (error: any) => void,
  ) {
    axios({
      url: `${API_BASE_URL}/api/stories/${storyId}`,
      method: 'PATCH',
      data: {
        categoryId: payload.categoryId,
        title: payload.title,
        body: payload.body,
      },
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
