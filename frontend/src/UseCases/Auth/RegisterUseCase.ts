import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

type Payload = {
  name: string | null | undefined,
  email: string | null | undefined,
  password: string | null | undefined,
};

export default class RegisterUseCase {
  static handle(
    payload: Payload,
    onFulfilled: (response: AxiosResponse) => void,
    onFailed: (error: any) => void,
  ) {
    axios({ url: `${API_BASE_URL}/sanctum/csrf-cookie`, method: 'GET' })
      .then(() => {
        axios({
          url: `${API_BASE_URL}/register`,
          method: 'POST',
          data: {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.password,
          },
        }).then(onFulfilled)
          .catch(onFailed);
      });
  }
}
