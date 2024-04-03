import {client} from './client';

/** 전시회 API */
export const fetchSearchExh = (searchName: string) =>
  client.get(`/exhibitions`, {params: {searchName}});

export const fetchAllExh = () =>
  client.get(`/exhibitions`);

export const fetchLikeList = () =>
  client.get(`/favorites/like`);


export const fetchAddLike = (exhId:number) =>
  client.post(`/favorites/like`, exhId);

/** 전시회 좋아요 API */
