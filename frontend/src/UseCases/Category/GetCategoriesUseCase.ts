import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';

export default class GetCategoriesUseCase {
  static create: BaseUseCaseCreator = () => (payload, onSuccess, onFailed) => {
    axios({
      url: `${API_BASE_URL}/api/categories`,
      method: 'GET',
    }).then(onSuccess)
      .catch(onFailed);
  };
}
