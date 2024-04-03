import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery,useMutation, useQueryClient} from 'react-query';
import {fetchSearchExh,fetchAddLike,fetchLikeList} from '../exhibition';

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
   // const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: () => fetchAddLike(exhId),
      onError: err => {
        console.log(err);
        console.log('[AddLikeExhibition] error fetch favorite');
      },
      onSuccess: () => {
        console.log('[AddLikeExhibition] success fetch favorite');
       // queryClient.invalidateQueries(favoriteQueryKeys.fetchLikeList());
       // queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyExhList());
      },
    });
  };