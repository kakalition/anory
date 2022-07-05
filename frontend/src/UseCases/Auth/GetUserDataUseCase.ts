import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';

export default class GetUserDataUseCase {
  static create: BaseUseCaseCreator = () => async (payload, queries, onSuccess, onFailed) => {
    await axios({ url: `${API_BASE_URL}/sanctum/csrf-cookie`, method: 'GET' });
    axios({
      url: `${API_BASE_URL}/api/user`,
      method: 'GET',
    }).then(onSuccess)
      .catch(onFailed);
  };
}
