import axios from 'axios';
import { API_BASE_URL } from '../../env';
import { BaseUseCaseCreator } from '../BaseUseCaseCreator';
import { RegisterPayload } from './Payload/RegisterPayload';

export default class RegisterUseCase {
  static create:
  BaseUseCaseCreator = () => async (payload: RegisterPayload, queries, onSuccess, onFailed) => {
      await axios({ url: `${API_BASE_URL}/sanctum/csrf-cookie`, method: 'GET' });
      axios({
        url: `${API_BASE_URL}/register`,
        method: 'POST',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          password_confirmation: payload.password,
        },
      }).then(onSuccess)
        .catch(onFailed);
    };
}
