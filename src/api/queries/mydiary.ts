import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  addMyExhVisitDate,
  createMyDiary,
  deleteMyDiary,
  fetchMyDiaryList,
  fetchMyExhList,
  fetchMyStoredDateListOfExh,
  updateMyDiary,
} from '../mydiary';

const mydiaryQueryKeys = createQueryKeys('mydiary', {
  fetchMyExhList: () => ['fetchMyExhList'],
  fetchMyDiaryList: (exhId: number) => ['fetchMyDiaryList', exhId],
  fetchMyStoredDateListOfExh: (exhId: number) => [
    'fetchMyStoredDateListOfExh',
    exhId,
  ],
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
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMyDiary(exhId, diaryId, solo),
    onError: err => {
      console.log(err);
      console.log('[MyDiaryDeleteModal] error fetch MyDiaryDelete');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyDiaryList(exhId));
      console.log('[MyDiaryDeleteModal] success fetch MyDiaryDelete');
    },
  });
};

export const useFetchMyStoredDateListOfExh = (exhId: number) => {
  return useQuery({
    queryKey: mydiaryQueryKeys.fetchMyStoredDateListOfExh(exhId).queryKey,
    queryFn: () => fetchMyStoredDateListOfExh(exhId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[ChooseVisitDateScreen] error fetch MyStoredDateListOfExh');
    },
    onSuccess: () => {
      console.log(
        '[ChooseVisitDateScreen] success fetch MyStoredDateListOfExh',
      );
    },
    select: (res: any) => res.data,
  });
};

export const useAddMyExhVisitDate = (exhId: number, visitDate: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addMyExhVisitDate({exhId, visitDate}),
    onError: err => {
      console.log(err);
      console.log('[AddSoloVisitDateScreen] error fetch AddSoloVisitDate');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        mydiaryQueryKeys.fetchMyStoredDateListOfExh(exhId),
      );
      console.log('[AddSoloVisitDateScreen] success fetch AddSoloVisitDate');
    },
  });
};

export const useCreateMyDiary = (
  exhId: number,
  newMyDiary: FormData | null,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createMyDiary(exhId, newMyDiary),
    onError: err => {
      console.log(err);
      console.log('[WriteMyDiaryScreen] error fetch WriteMyDiary');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyDiaryList(exhId));
      console.log('[WriteMyDiaryScreen] success fetch WriteMyDiary');
    },
  });
};

export const useUpdateMyDiary = (
  exhId: number,
  diaryId: number,
  newMyDiary: FormData | null,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateMyDiary(exhId, diaryId, newMyDiary),
    onError: err => {
      console.log(err);
      console.log('[WriteMyDiaryScreen(Update)] error fetch WriteMyDiary');
    },
    onSuccess: () => {
      console.log('[WriteMyDiaryScreen(Update)] success fetch WriteMyDiary');
      queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyDiaryList(exhId));
    },
  });
};
