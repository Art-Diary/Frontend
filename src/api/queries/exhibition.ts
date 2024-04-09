import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {
  fetchSearchExh,
  fetchAddLike,
  fetchLikeList,
  fetchDeleteLike,
  fetchAllExh,
} from '../exhibition';

const exhibitionQueryKeys = createQueryKeys('exhibition', {
  fetchSearchExh: (
    searchName?: string,
    price?: string,
    field?: string,
    state?: string,
  ) => ['fetchSearchExh', price],
});

const favoriteQueryKeys = createQueryKeys('favorite', {
  fetchLikeList: () => ['fetchLikeList'],
  // fetchDeleteLike: (exhId: number) => ['fetchMyDiaryList', exhId],
});

export const useFetchSearchExh = (
  searchName: string | null,
  price: string | null,
  field: string | null,
  state: string | null,
) =>
  useQuery({
    queryKey: [
      exhibitionQueryKeys.fetchSearchExh().queryKey,
      searchName,
      price,
      field,
      state,
    ],
    queryFn: () => fetchSearchExh(searchName, price, field, state),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('error fetch SearchExh');
    },
    onSuccess: () => {
      console.log('success fetch SearchExh');
    },
    select: (res: any) => res.data,
  });

export const useAddLike = (exhId: number) => {
  return useMutation({
    mutationFn: () => fetchAddLike(exhId),
    onError: err => {
      console.log(err);
      console.log('[AddLikeExhibition] error fetch favorite');
    },
    onSuccess: () => {
      console.log('[AddLikeExhibition] success fetch favorite');
    },
  });
};

export const useDeleteLike = (favoriteExhsList: number[]) => {
  return useMutation({
    mutationFn: () => fetchDeleteLike(favoriteExhsList),
    onError: err => {
      console.log(err);
      console.log('[DeleteLikeExhibition] error fetch delete favorite');
    },
    onSuccess: () => {
      console.log('[DeleteLikeExhibition] success fetch delete favorite');
    },
  });
};
