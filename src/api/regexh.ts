import {client} from './client';

/**새로운 전시회 등록 api*/
export const fetchRegExhs = (isAdmin: boolean) =>
  client.get(`/regexh`, {
    params: {isAdmin},
  });

export type CreateRegExhParams = {
  formData: FormData | null;
};

export const createRegExh = (createRegExhParams: CreateRegExhParams) =>
  client.post(`/regexh`, createRegExhParams.formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
