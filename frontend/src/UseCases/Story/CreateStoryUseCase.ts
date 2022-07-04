import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

type Payload = {
  categoryId: number | null | undefined,
  title: string | null | undefined,
  body: string | null | undefined
};

export default class CreateStoryUseCase {
  static handle(
    payload: Payload,
    onFulfilled: (response: AxiosResponse) => void,
    onFailed: (error: any) => void,
  ) {
    axios({
      url: `${API_BASE_URL}/api/stories`,
      method: 'POST',
      data: {
        categoryId: payload.categoryId,
        title: payload.title,
        body: payload.body,
      },
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
