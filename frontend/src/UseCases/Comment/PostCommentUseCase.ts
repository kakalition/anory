import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';
import { PostCommentPayload } from './Payload/PostCommentPayload';

export default class PostCommentUseCase {
  static create:
  BaseUseCaseCreator = () => (payload: PostCommentPayload, queries, onSuccess, onFailed) => {
      axios({
        url: `${API_BASE_URL}/api/stories/${payload.storyId}/comments`,
        method: 'POST',
        data: { comment: payload.comment },
      }).then(onSuccess)
        .catch(onFailed);
    };
}
