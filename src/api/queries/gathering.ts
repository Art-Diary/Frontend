import {createQueryKeys} from '@lukemorales/query-key-factory';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  addNewDateOfExhGathering,
  AddNewDateOfExhGatheringType,
  addNewMateInGathering,
  createGathering,
  deleteGathering,
  fetchGatheringDiaryList,
  fetchGatheringInfo,
  fetchGatheringList,
  fetchSearchNewMateInGathering,
} from '../gathering';

export const gatheringQueryKeys = createQueryKeys('gathering', {
  fetchGatheringList: () => ['fetchGatheringList'],
  fetchGatheringInfo: (gatherId: number) => ['fetchGatheringInfo', gatherId],
  fetchGatheringDiaryList: (gatherId: number, exhId: number) => [
    'fetchGatheringDiaryList',
    gatherId,
    exhId,
  ],
  fetchSearchNewMateInGathering: (gatherId: number, nickname: string) => [
    'fetchSearchNewMateInGathering',
    gatherId,
    nickname,
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
      queryClient.invalidateQueries(
        gatheringQueryKeys.fetchGatheringList().queryKey,
      );
      console.log('[CreateGathering] success create CreateGathering');
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

export const useDeleteGathering = (gatherId: number) => {
  return useMutation({
    mutationFn: () => deleteGathering(gatherId),
    onError: err => {
      console.log(err);
      console.log('[DeleteGathering] error delete DeleteGathering');
    },
    onSuccess: () => {
      console.log('[DeleteGathering] success delete DeleteGathering');
    },
  });
};

export const useAddNewDateOfExhGathering = (): UseMutationResult<
  any,
  any,
  AddNewDateOfExhGatheringType,
  unknown
> => {
  return useMutation<any, any, AddNewDateOfExhGatheringType, unknown>({
    mutationFn: (data: AddNewDateOfExhGatheringType) =>
      addNewDateOfExhGathering(data),
    onError: err => {
      console.log(err);
      console.log(
        '[AddNewDateOfExhGathering] error create AddNewDateOfExhGathering',
      );
    },
    onSuccess: () => {
      console.log(
        '[AddNewDateOfExhGathering] success create AddNewDateOfExhGathering',
      );
    },
  });
};

export const useAddNewMateInGathering = (gatherId: number, mateId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addNewMateInGathering(gatherId, mateId),
    onError: err => {
      console.log(err);
      console.log('[AddNewMateInGathering] error create AddNewMateInGathering');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        gatheringQueryKeys.fetchGatheringInfo(gatherId).queryKey,
      );
      console.log(
        '[AddNewMateInGathering] success create AddNewMateInGathering',
      );
    },
  });
};

export const useFetchSearchNewMateInGathering = (
  gatherId: number,
  nickname: string,
) =>
  useQuery({
    queryKey: gatheringQueryKeys.fetchSearchNewMateInGathering(
      gatherId,
      nickname,
    ).queryKey,
    queryFn: () => fetchSearchNewMateInGathering(gatherId, nickname),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log(
        '[SearchNewMateInGathering] error fetch SearchNewMateInGathering',
      );
    },
    onSuccess: () => {
      console.log(
        '[SearchNewMateInGathering] success fetch SearchNewMateInGathering',
      );
    },
    select: (res: any) => res.data,
  });
