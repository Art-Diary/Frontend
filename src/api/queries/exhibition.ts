import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {deleteFavorite, fetchFavoriteList, fetchSearchExh} from '../exhibition';

const exhibitionQueryKeys = createQueryKeys('exhibition', {
  fetchSearchExh: (searchName: string) => ['fetchSearchExh', searchName],
  fetchFavoriteList: () => ['fetchFavoriteList'],
});

export const useFetchSearchExh = (searchName: string) =>
  useQuery({
    queryKey: exhibitionQueryKeys.fetchSearchExh(searchName).queryKey,
    queryFn: () => fetchSearchExh(searchName),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[MyExhAddScreen] error fetch MyExhAdd');
    },
    onSuccess: () => {
      console.log('[MyExhAddScreen] success fetch MyExhAdd');
    },
    select: (res: any) => res.data,
  });

export const useFetchFavoriteList = () =>
  useQuery({
    queryKey: exhibitionQueryKeys.fetchFavoriteList().queryKey,
    queryFn: () => fetchFavoriteList(),
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

export const useDeleteFavoriteList = (favoriteList: number[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteFavorite(favoriteList),
    onError: err => {
      console.log(err);
      console.log('[EditFavoriteScreen] error fetch EditFavorite');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(exhibitionQueryKeys.fetchFavoriteList());
      console.log('[EditFavoriteScreen] success fetch EditFavorite');
    },
  });
};
