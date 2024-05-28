import {client} from './client';

/** 전시회 API */
export const fetchSearchExh = (
  searchName: string | null,
  price: string | null,
  field: string[] | null,
  state: string[] | null,
  date: string | null,
) => {
  const fieldString = Array.isArray(field) ? field.join(',') : field;
  const stateString = Array.isArray(state) ? state.join(',') : state;
  console.log('stateString', stateString);
  return client.get(`/exhibitions`, {
    params: {searchName, price, field: fieldString, state: stateString, date},
  });
};

export const fetchExhDetailInfo = (exhId: number) =>
  client.get(`/exhibitions/${exhId}`);

export const fetchAllExh = () => client.get(`/exhibitions`);

export const fetchDiaryListForExh = (exhId: number) =>
  client.get(`/exhibitions/${exhId}/diaries`);

/** 전시회 좋아요 API */
export const fetchLikeList = () => client.get(`/favorites`);

export const fetchAddLike = (exhId: number) =>
  client.post(`/favorites/like`, {exhId: exhId});

export const fetchDeleteLike = (favoriteExhsList: number[]) =>
  client.post(`/favorites/unlike`, {favoriteExhsList: favoriteExhsList});
