import axios from 'axios';

export default class RegisterUseCase {
  API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  handle(name: string, email: string, password: string) {
    return axios({
      url: `${this.API_ENDPOINT}/register`,
      method: 'POST',
      data: { name, email, password },
    });
  }
}
