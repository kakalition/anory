import axios from 'axios';

export default class RegisterUseCase {
  static handle(name: string, email: string, password: string) {
    return axios({
      url: `${import.meta.env.VITE_API_URL}/register`,
      method: 'POST',
      data: { name, email, password },
    });
  }
}
