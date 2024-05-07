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
    field?: string[],
    state?: string[],
    date?: Date,
  ) => ['fetchSearchExh', searchName, price, field, state, date],
  fetchLikeList: () => ['fetchLikeList'],
});

export const useFetchSearchExh = (
  searchName: string | null,
  price: string | null,
  field: string[] | null,
  state: string[] | null,
  date: string | null,
) =>
  useQuery({
    queryKey: [
      exhibitionQueryKeys.fetchSearchExh().queryKey,
      searchName,
      price,
      field,
      state,
      date,
    ],
    queryFn: () => fetchSearchExh(searchName, price, field, state, date),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log(state);
      console.log('error fetch SearchExh');
    },
    onSuccess: () => {
      console.log(field);
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fetchDeleteLike(favoriteExhsList),
    onError: err => {
      console.log(err);
      console.log('[DeleteLikeExhibition] error fetch delete favorite');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(exhibitionQueryKeys.fetchLikeList());
      console.log('[DeleteLikeExhibition] success fetch delete favorite');
    },
  });
};

export const useFetchFavoriteList = () =>
  useQuery({
    queryKey: exhibitionQueryKeys.fetchLikeList().queryKey,
    queryFn: () => fetchLikeList(),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[FavoriteListScreen] error fetch FavoriteList');
    },
    onSuccess: () => {
      console.log('[FavoriteListScreen] success fetch FavoriteList');
    },
    select: (res: any) => res.data,
  });
