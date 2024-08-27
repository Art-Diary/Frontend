import {client} from './client';

/**새로운 전시회 등록 api*/
export const fetchRegExhs = (isAdmin: boolean) =>
  client.get(`/regexh`, {
    params: {isAdmin},
  });

export const createRegExh = (formData: FormData | null) =>
  client.post(`/regexh`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

export const fetchRegExhDetail = (regExhId: number) =>
  client.get(`/regexh/${regExhId}`, {});
