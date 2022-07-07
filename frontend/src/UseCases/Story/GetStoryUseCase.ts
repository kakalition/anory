import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';

export default class GetStoryUseCase {
  static create: BaseUseCaseCreator = () => (payload, queries, onSuccess, onFailed) => {
    axios({
      url: `${API_BASE_URL}/api/stories/${payload.id}`,
      method: 'GET',
    }).then(onSuccess)
      .catch(onFailed);
  };
}
