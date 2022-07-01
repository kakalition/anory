import { spec } from 'pactum';

test('test', async () => {
  await spec()
    .post('http://localhost:8000/register')
    .withBody({
      name: 'Kaka',
      email: 'k@k',
      password: '00000000',
    })
    .expectStatus(200);
});
