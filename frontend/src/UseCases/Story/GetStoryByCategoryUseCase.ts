import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

export default class GetStoryByCategoryUseCase {
  static handle(
    categoryName: string,
    onFulfilled: (response: AxiosResponse) => void,
    onFailed: (error: any) => void,
  ) {
    axios({
      url: `${API_BASE_URL}/api/stories/${categoryName}`,
      method: 'GET',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
