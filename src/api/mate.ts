import {client} from './client';

/** 전시 메이트 API */
export const fetchExhMateList = () => client.get(`/mates`);

export const fetchSearchMateList = (nickname: string) =>
  client.get(`/mates/search`, {params: {nickname}});

export const addNewMate = (userId: number) =>
  client.post(`/mates`, {userId: userId});
