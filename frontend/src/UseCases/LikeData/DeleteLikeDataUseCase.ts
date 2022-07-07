import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';

export default class DeleteLikeDataUseCase {
  static create: BaseUseCaseCreator = () => (payload, queries, onSuccess, onFailed) => {
    axios({
      url: `${API_BASE_URL}/api/likedata/${payload.id}`,
      method: 'DELETE',
    }).then(onSuccess)
      .catch(onFailed);
  };
}
