import ky from 'ky';

export default async function callApi(method, path, data) {
  let response;
  try {
    response = await ky[method](path, {
      json: data || {},
      prefixUrl: 'http://localhost:3000',
      throwHttpErrors: false,
    }).json();
  } catch (err) {
    response = err.error.message;
  }
  return response;
}
