import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';
import { CreateStoryPayload } from './Payload/CreateStoryPayload';

export default class CreateStoryUseCase {
  static create: BaseUseCaseCreator = () => (payload: CreateStoryPayload, onSuccess, onFailed) => {
    axios({
      url: `${API_BASE_URL}/api/stories`,
      method: 'POST',
      data: {
        categoryId: payload.categoryId,
        title: payload.title,
        body: payload.body,
      },
    }).then(onSuccess)
      .catch(onFailed);
  };
}
