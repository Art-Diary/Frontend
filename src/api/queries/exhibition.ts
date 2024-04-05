import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {
  fetchSearchExh,
  fetchAddLike,
  fetchLikeList,
  fetchDeleteLike,
} from '../exhibition';

const exhibitionQueryKeys = createQueryKeys('exhibition', {
  fetchSearchExh: (searchName: string) => ['fetchSearchExh', searchName],
  fetchLikeList: () => ['fetchLikeList'],
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
