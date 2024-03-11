import {client} from './client';

/** 내 기록 API */

export const fetchMyExhList = () => client.get(`/myexhs`);

export const fetchMyDiaryList = (exhId: number) =>
  client.get(`/myexhs/${exhId}/diaries`);
