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
import {useTabIdentifierInfo} from '~/zustand/tabIdentifier';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';

const mydiaryQueryKeys = createQueryKeys('mydiary', {
  fetchMyExhList: () => ['fetchMyExhList'],
  fetchMyDiaryList: (
    exhId: number,
    forget: boolean | null,
    visitDate: string | null,
    gatherId: number | null,
  ) => ['fetchMyDiaryList', [exhId, forget, visitDate, gatherId]],
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

export const useFetchMyDiaryList = (
  exhId: number,
  forget: boolean | null,
  visitDate: string | null,
  gatherId: number | null,
) => {
  return useQuery({
    queryKey: mydiaryQueryKeys.fetchMyDiaryList(
      exhId,
      forget,
      visitDate,
      gatherId,
    ).queryKey,
    queryFn: () => fetchMyDiaryList(exhId, forget, visitDate, gatherId),
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
  const tabIdentifierInfo = useTabIdentifierInfo();
  const exhFromCalendarInfo = useExhFromCalendarInfo();

  return useMutation({
    mutationFn: () => deleteMyDiary(exhId, diaryId, solo),
    onError: err => {
      console.log(err);
      console.log('[MyDiaryDeleteModal] error fetch MyDiaryDelete');
    },
    onSuccess: () => {
      if (tabIdentifierInfo.tab === 'mydiary') {
        console.log('[MyDiaryDeleteModal] success delete MyDiaryDelete');
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyDiaryList(exhId, null, null, null),
        );
        queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyExhList());
      } else {
        console.log(
          '[MyDiaryDeleteModal] success delete MyDiaryDelete from Calendar',
        );
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyDiaryList(
            exhId,
            exhFromCalendarInfo.forget,
            exhFromCalendarInfo.visitDate,
            exhFromCalendarInfo.gatherId,
          ),
        );
      }
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

export const useAddMyExhVisitDate = (
  exhId: number,
  visitDate: string | null,
) => {
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
  const tabIdentifierInfo = useTabIdentifierInfo();
  const exhFromCalendarInfo = useExhFromCalendarInfo();

  return useMutation({
    mutationFn: () => createMyDiary(exhId, newMyDiary),
    onError: err => {
      console.log(err);
      console.log('[WriteMyDiaryScreen] error create WriteMyDiary');
    },
    onSuccess: () => {
      if (tabIdentifierInfo.tab === 'mydiary') {
        console.log('[WriteMyDiaryScreen] success create WriteMyDiary');
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyDiaryList(exhId, null, null, null),
        );
        queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyExhList());
      } else {
        console.log(
          '[WriteMyDiaryScreen] success create WriteMyDiary From Calendar',
        );
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyDiaryList(
            exhId,
            exhFromCalendarInfo.forget,
            exhFromCalendarInfo.visitDate,
            exhFromCalendarInfo.gatherId,
          ),
        );
      }
    },
  });
};

export const useUpdateMyDiary = (
  exhId: number,
  diaryId: number,
  newMyDiary: FormData | null,
) => {
  const queryClient = useQueryClient();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const exhFromCalendarInfo = useExhFromCalendarInfo();

  return useMutation({
    mutationFn: () => updateMyDiary(exhId, diaryId, newMyDiary),
    onError: err => {
      console.log(err);
      console.log('[WriteMyDiaryScreen(Update)] error update WriteMyDiary');
    },
    onSuccess: () => {
      if (tabIdentifierInfo.tab === 'mydiary') {
        console.log('[WriteMyDiaryScreen(Update)] success update WriteMyDiary');
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyDiaryList(exhId, null, null, null),
        );
      } else {
        console.log(
          '[WriteMyDiaryScreen(Update)] success update WriteMyDiary From Calendar',
        );
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyDiaryList(
            exhId,
            exhFromCalendarInfo.forget,
            exhFromCalendarInfo.visitDate,
            exhFromCalendarInfo.gatherId,
          ),
        );
      }
    },
  });
};
