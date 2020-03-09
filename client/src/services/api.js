import ky from 'ky';

export default async function callApi(method, path, data, token) {
  const kyOptions = {
    prefixUrl: 'http://localhost:3000',
    throwHttpErrors: false,
  };
  if (data && Object.keys(data).length > 0) {
    kyOptions.json = data;
  }
  if (token) {
    kyOptions.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  let response;
  try {
    response = await ky[method](path, kyOptions).json();
  } catch (err) {
    response = err.error
      ? err.error.message
      : { error: { message: 'Sorry, something went wrong' } };
  }
  return response;
}
