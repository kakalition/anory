import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

export default class GetCategoriesUseCase {
  static handle(
    onFulfilled: (response: AxiosResponse) => void,
    onFailed: ((error: any) => void) = (error) => console.error(error),
  ) {
    axios({
      url: `${API_BASE_URL}/api/categories`,
      method: 'GET',
    }).then(onFulfilled)
      .catch(onFailed);
  }
}
