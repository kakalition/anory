import axios from 'axios';

export default function RegisterUseCase(name: string, email: string, password: string) {
  const { API_ENDPOINT } = import.meta.env.API_ENDPOINT;

  return axios({
    url: `${API_ENDPOINT}/register`,
    method: 'POST',
    data: { name, email, password },
  });
}
