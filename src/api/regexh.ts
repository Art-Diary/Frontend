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

export type UpdateRegExhByAdminType = {
  regExhId: number;
  formData: FormData | null;
};

export const updateRegExhByAdmin = (updateData: UpdateRegExhByAdminType) => [
  client.patch(`/regexh/${updateData.regExhId}/comments`, updateData.formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  }),
];
