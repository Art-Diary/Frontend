import {client} from './client';

/** 전시회 API */
export const fetchSearchExh = (searchName: string) =>
  client.get(`/exhibitions`, {params: {searchName}});

/** 전시회 좋아요 API */
