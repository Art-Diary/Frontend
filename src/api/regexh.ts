import {client} from './client';

/**새로운 전시회 등록 api*/
export const fetchRegExhs = (isAdmin: boolean) =>
  client.get(`/regexh`, {
    params: {isAdmin},
  });
