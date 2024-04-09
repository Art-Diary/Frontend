import {client} from './client';

/** 전시회 API */
export const fetchSearchExh = (
  searchName: string | null,
  price: string | null,
  field: string | null,
  state: string | null,
) => client.get(`/exhibitions`, {params: {searchName, price, field, state}});

export const fetchAllExh = () => client.get(`/exhibitions`);

export const fetchLikeList = () => client.get(`/favorites`);

export const fetchAddLike = (exhId: number) =>
  client.post(`/favorites/like`, {exhId: exhId});

export const fetchDeleteLike = (favoriteExhsList: number[]) =>
  client.post(`/favorites/unlike`, {favoriteExhsList: favoriteExhsList});

/** 전시회 좋아요 API */
