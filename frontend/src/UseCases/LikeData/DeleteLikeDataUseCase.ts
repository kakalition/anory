import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

export default class DeleteLikeDataUseCase {
  static handle(
    likeDataId: number,
    onFulfilled: ((response: AxiosResponse) => void) | null = null,
    onFailed: ((error: any) => void) | null = null,
  ) {
    axios({
      url: `${API_BASE_URL}/api/likedata/${likeDataId}`,
      method: 'DELETE',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
