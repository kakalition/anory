import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';

export default class LogoutUseCase {
  static create: BaseUseCaseCreator = () => async (payload, queries, onSuccess, onFailed) => {
    await axios({ url: `${API_BASE_URL}/sanctum/csrf-cookie`, method: 'GET' });
    axios({ url: `${API_BASE_URL}/logout`, method: 'POST' })
      .then(onSuccess)
      .catch(onFailed);
  };
}
