import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';

export default class GetUserCommentsUseCase {
  static create: BaseUseCaseCreator = () => (payload, queries, onSuccess, onFailed) => {
    axios({
      url: `${API_BASE_URL}/api/comments`,
      method: 'GET',
    }).then(onSuccess)
      .catch(onFailed);
  };
}
