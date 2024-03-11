import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useMutation, useQuery} from 'react-query';
import {deleteMyDiary, fetchMyDiaryList, fetchMyExhList} from '../mydiary';

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

export const useDeleteMyDiary = (
  exhId: number,
  diaryId: number,
  solo: boolean,
) =>
  useMutation({
    mutationFn: () => deleteMyDiary(exhId, diaryId, solo),
    onError: err => {
      console.log(err);
      console.log('[MyDiaryDeleteModal] error fetch MyDiaryDelete');
    },
    onSuccess: () => {
      console.log('[MyDiaryDeleteModal] success fetch MyDiaryDelete');
      // queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyDiaryList(exhId));
    },
  });
