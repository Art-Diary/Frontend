import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery,useMutation, useQueryClient} from 'react-query';
import {fetchSearchExh,fetchAddLike,fetchLikeList,fetchDeleteLike} from '../exhibition';

const exhibitionQueryKeys = createQueryKeys('exhibition', {
  fetchSearchExh: (searchName: string) => ['fetchSearchExh', searchName],
});

const favoriteQueryKeys = createQueryKeys('favorite', {
  fetchLikeList: () => ['fetchLikeList'],
 // fetchDeleteLike: (exhId: number) => ['fetchMyDiaryList', exhId],
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

 
  export const useAddLike = (
    exhId: number,
  ) => {
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

  export const useDeleteLike = (
    favoriteExhsList: number[],
  ) => {
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