import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery} from 'react-query';
import {fetchMyDiaryList, fetchMyExhList} from '../mydiary';

const mydiaryQueryKeys = createQueryKeys('mydiary', {
  fetchMyExhList: () => ['fetchMyExhList'],
  fetchMyDiaryList: (exhId: number) => ['fetchMyDiaryList', exhId],
});

export const useFetchMyExhList = () =>
  useQuery({
    queryKey: mydiaryQueryKeys.fetchMyExhList().queryKey,
    queryFn: fetchMyExhList,
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[MyExhListScreen] error fetch MyExhList');
    },
    onSuccess: () => {
      console.log('[MyExhListScreen] success fetch MyExhList');
    },
    select: (res: any) => res.data,
  });

export const useFetchMyDiaryList = (exhId: number) => {
  return useQuery({
    queryKey: mydiaryQueryKeys.fetchMyDiaryList(exhId).queryKey,
    queryFn: () => fetchMyDiaryList(exhId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[MyDiaryListScreen] error fetch MyDiaryList');
    },
    onSuccess: () => {
      console.log('[MyDiaryListScreen] success fetch MyDiaryList');
    },
    select: (res: any) => res.data,
  });
};
