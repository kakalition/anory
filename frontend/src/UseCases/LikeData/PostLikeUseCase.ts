import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';

export default class PostLikeUseCase {
  static create: BaseUseCaseCreator = () => (payload, queries, onSuccess, onFailed) => {
    axios({
      url: `${API_BASE_URL}/api/${payload.type}/${payload.id}/likedata`,
      method: 'POST',
    }).then(onSuccess)
      .catch(onFailed);
  };
}
