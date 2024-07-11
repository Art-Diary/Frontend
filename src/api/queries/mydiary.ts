import {createQueryKeys} from '@lukemorales/query-key-factory';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from 'react-query';
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
import {gatheringQueryKeys} from './gathering';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';
import {exhibitionQueryKeys} from './exhibition';

export const mydiaryQueryKeys = createQueryKeys('mydiary', {
  fetchMyExhList: () => ['fetchMyExhList'],
  fetchMyDiaryList: (exhId: number) => ['fetchMyDiaryList', exhId],
  fetchMyDiaryListInCalendar: (
    exhId: number,
    forget: boolean | null,
    visitDate: string | null,
    gatherId: number | null,
  ) => ['fetchMyDiaryListInCalendar', [exhId, forget, visitDate, gatherId]],
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

export const useFetchMyDiaryListInCalendar = (
  exhId: number,
  forget: boolean | null,
  visitDate: string | null,
  gatherId: number | null,
) => {
  return useQuery({
    queryKey: mydiaryQueryKeys.fetchMyDiaryListInCalendar(
      exhId,
      forget,
      visitDate,
      gatherId,
    ).queryKey,
    queryFn: () => fetchMyDiaryList(exhId, forget, visitDate, gatherId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[MyDiaryListInCalendar] error fetch MyDiaryListInCalendar');
    },
    onSuccess: () => {
      console.log(
        '[MyDiaryListInCalendar] success fetch MyDiaryListInCalendar',
      );
    },
    select: (res: any) => res.data,
  });
};

export const useFetchMyDiaryList = (exhId: number) => {
  return useQuery({
    queryKey: mydiaryQueryKeys.fetchMyDiaryList(exhId).queryKey,
    queryFn: () => fetchMyDiaryList(exhId, null, null, null),
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
  const {enterGatheringInfo} = useEnterGatheringInfo();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const exhFromCalendarInfo = useExhFromCalendarInfo();

  return useMutation({
    mutationFn: () => deleteMyDiary(exhId, diaryId, solo),
    onError: err => {
      console.log(err);
      console.log('[MyDiaryDeleteModal] error fetch MyDiaryDelete');
    },
    onSuccess: () => {
      console.log('[MyDiaryDeleteModal] success delete MyDiaryDelete');
      if (tabIdentifierInfo.tab === 'mydiary') {
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyDiaryList(exhId).queryKey,
        );
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyExhList().queryKey,
        );
      } else if (tabIdentifierInfo.tab === 'gathering') {
        queryClient.invalidateQueries(
          gatheringQueryKeys.fetchGatheringDiaryList(
            enterGatheringInfo.gatherId,
            exhId,
          ).queryKey,
        );
      } else if (tabIdentifierInfo.tab === 'calendar') {
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyDiaryListInCalendar(
            exhId,
            exhFromCalendarInfo.forget,
            exhFromCalendarInfo.visitDate,
            exhFromCalendarInfo.gatherId,
          ).queryKey,
        );
      } else if (tabIdentifierInfo.tab === 'exhibition') {
        queryClient.invalidateQueries(
          exhibitionQueryKeys.fetchDiaryListForExh(exhId).queryKey,
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
  return useMutation({
    mutationFn: () => addMyExhVisitDate({exhId, visitDate}),
    onError: err => {
      console.log(err);
      console.log('[AddSoloVisitDateScreen] error fetch AddSoloVisitDate');
    },
    onSuccess: () => {
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
      console.log('[WriteMyDiaryScreen] error create WriteMyDiary');
    },
    onSuccess: () => {
      console.log('[WriteMyDiaryScreen] success create WriteMyDiary');
      queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyExhList().queryKey);
      queryClient.invalidateQueries(
        mydiaryQueryKeys.fetchMyDiaryList(exhId).queryKey,
      );
    },
  });
};

export const useUpdateMyDiary = (
  exhId: number,
  diaryId: number,
  newMyDiary: FormData | null,
): UseMutationResult<any, any, void, unknown> => {
  const queryClient = useQueryClient();
  const tabIdentifierInfo = useTabIdentifierInfo();

  return useMutation<any, any, void, unknown>({
    mutationFn: () => updateMyDiary(exhId, diaryId, newMyDiary),
    onError: err => {
      console.log(err);
      console.log('[WriteMyDiaryScreen(Update)] error update WriteMyDiary');
    },
    onSuccess: () => {
      console.log('[WriteMyDiaryScreen(Update)] success update WriteMyDiary');
      if (tabIdentifierInfo.tab === 'mydiary') {
        queryClient.invalidateQueries(
          mydiaryQueryKeys.fetchMyDiaryList(exhId).queryKey,
        );
      } else if (tabIdentifierInfo.tab === 'exhibition') {
        queryClient.invalidateQueries(
          exhibitionQueryKeys.fetchDiaryListForExh(exhId).queryKey,
        );
      }
    },
  });
};
