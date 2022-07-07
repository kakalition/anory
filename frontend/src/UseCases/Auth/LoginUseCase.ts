import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';
import { LoginPayload } from './Payload/LoginPayload';

export default class LoginUseCase {
  static create:
  BaseUseCaseCreator = () => async (payload: LoginPayload, queries, onSuccess, onFailed) => {
      await axios({ url: `${API_BASE_URL}/sanctum/csrf-cookie`, method: 'GET' });
      axios({
        url: `${API_BASE_URL}/login`,
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password,
        },
      }).then(onSuccess)
        .catch(onFailed);
    };
}
