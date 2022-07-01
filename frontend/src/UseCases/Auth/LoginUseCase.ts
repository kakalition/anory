import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../env';

type Payload = {
  email: string | null | undefined,
  password: string | null | undefined
};

export default class LoginUseCase {
  static handle(
    payload: Payload,
    onFulfilled: (response: AxiosResponse) => void,
    onFailed: (error: any) => void,
  ) {
    axios({ url: `${API_BASE_URL}/sanctum/csrf-cookie`, method: 'GET' })
      .then(() => {
        axios({
          url: `${API_BASE_URL}/login`,
          method: 'POST',
          data: {
            email: payload.email,
            password: payload.password,
          },
        }).then(onFulfilled)
          .catch(onFailed);
      });
  }
}
