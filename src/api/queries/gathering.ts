import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  createGathering,
  fetchGatheringDiaryList,
  fetchGatheringInfo,
  fetchGatheringList,
} from '../gathering';

export const gatheringQueryKeys = createQueryKeys('gathering', {
  fetchGatheringList: () => ['fetchGatheringList'],
  fetchGatheringInfo: (gatherId: number) => ['fetchGatheringInfo', gatherId],
  fetchGatheringDiaryList: (gatherId: number, exhId: number) => [
    'fetchGatheringDiaryList',
    gatherId,
    exhId,
  ],
});

export const useFetchGatheringList = () =>
  useQuery({
    queryKey: gatheringQueryKeys.fetchGatheringList().queryKey,
    queryFn: () => fetchGatheringList(),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[GatheringList] error fetch GatheringList');
    },
    onSuccess: () => {
      console.log('[GatheringList] success fetch GatheringList');
    },
    select: (res: any) => res.data,
  });

export const useFetchGatheringInfo = (gatherId: number) =>
  useQuery({
    queryKey: gatheringQueryKeys.fetchGatheringInfo(gatherId).queryKey,
    queryFn: () => fetchGatheringInfo(gatherId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[GatheringInfo] error fetch GatheringInfo');
    },
    onSuccess: () => {
      console.log('[GatheringInfo] success fetch GatheringInfo');
    },
    select: (res: any) => res.data,
  });

export const useCreateGathering = (gatherName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createGathering(gatherName),
    onError: err => {
      console.log(err);
      console.log('[CreateGathering] error create CreateGathering');
    },
    onSuccess: () => {
      console.log('[CreateGathering] success create CreateGathering');
      queryClient.invalidateQueries(gatheringQueryKeys.fetchGatheringList());
    },
  });
};

export const useFetchGatheringDiaryList = (gatherId: number, exhId: number) =>
  useQuery({
    queryKey: gatheringQueryKeys.fetchGatheringDiaryList(gatherId, exhId)
      .queryKey,
    queryFn: () => fetchGatheringDiaryList(gatherId, exhId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[GatheringDiaryList] error fetch GatheringDiaryList');
    },
    onSuccess: () => {
      console.log('[GatheringDiaryList] success fetch GatheringDiaryList');
    },
    select: (res: any) => res.data,
  });
