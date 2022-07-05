import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';

export default class DeleteCommentUseCase {
  static create: BaseUseCaseCreator = () => (payload, queries, onSuccess, onFailed) => {
    axios({
      url: `${API_BASE_URL}/api/comments/${payload.id}`,
      method: 'DELETE',
    }).then(onSuccess)
      .catch(onFailed);
  };
}
