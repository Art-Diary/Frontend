import {client} from './client';

/** 내 기록 API */

// myexhs
export const fetchMyExhList = () => client.get(`/myexhs`);

export const fetchMyStoredDateListOfExh = (exhId: number) =>
  client.get(`/myexhs/${exhId}`);

export const addMyExhVisitDate = (myExhVisitDateInfo: MyExhVisitDate) =>
  client.post(`/myexhs`, myExhVisitDateInfo);

interface MyExhVisitDate {
  exhId: number;
  visitDate: string | null;
}

// mydiaries
export const fetchMyDiaryList = (
  exhId: number,
  forget: boolean | null,
  visitDate: string | null,
  gatherId: number | null,
) =>
  client.get(`/myexhs/${exhId}/diaries`, {
    params: {forget, visitDate, gatherId},
  });

export const createMyDiary = (createDiaryParams: CreateDiaryParams) =>
  client.post(
    `/myexhs/${createDiaryParams.exhId}/diaries`,
    createDiaryParams.formData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );

export const updateMyDiary = (updateDiaryParams: UpdateDiaryParams) =>
  client.patch(
    `/myexhs/${updateDiaryParams.exhId}/diaries/${updateDiaryParams.diaryId}`,
    updateDiaryParams.formData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );

export const deleteMyDiary = (exhId: number, diaryId: number) =>
  client.delete(`/myexhs/${exhId}/diaries/${diaryId}`);

export type CreateDiaryParams = {
  exhId: number;
  formData: FormData | null;
};

export type UpdateDiaryParams = {
  exhId: number;
  diaryId: number;
  formData: FormData | null;
};
