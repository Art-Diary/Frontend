import {client} from './client';

/** 내 기록 API */

export const fetchMyExhList = () => client.get(`/myexhs`);

export const fetchMyDiaryList = (exhId: number) =>
  client.get(`/myexhs/${exhId}/diaries`);

export const deleteMyDiary = (exhId: number, diaryId: number, solo: boolean) =>
  client.delete(`/myexhs/${exhId}/diaries/${diaryId}`, {params: {solo}});

export const fetchMyStoredDateListOfExh = (exhId: number) =>
  client.get(`/myexhs/${exhId}`);

export const addMyExhVisitDate = (myExhVisitDateInfo: MyExhVisitDate) =>
  client.post(`/myexhs`, myExhVisitDateInfo);

interface MyExhVisitDate {
  exhId: number;
  visitDate: string;
}
