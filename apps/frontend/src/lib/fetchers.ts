import api from './axios';

export async function axiosGetFetcher<T>(url: string): Promise<T> {
  const response = await api.get(url);
  return response.data;
}

export async function axiosPostFetcher<T, U>(url: string, { arg }: { arg: U }): Promise<T> {
  const response = await api.post(url, arg);
  return response.data;
}

export async function axiosPatchFetcher<T, U>(url: string, { arg }: { arg: U }): Promise<T> {
  const response = await api.patch(url, arg);
  return response.data;
}

export async function axiosDeleteFetcher<T, U>(url: string): Promise<T> {
  const response = await api.delete(url);
  return response.data;
}
