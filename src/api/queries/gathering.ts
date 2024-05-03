import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery} from 'react-query';
import {fetchGatheringInfo, fetchGatheringList} from '../gathering';

const gatheringQueryKeys = createQueryKeys('gathering', {
  fetchGatheringList: () => ['fetchGatheringList'],
  fetchGatheringInfo: (gatherId: number) => ['fetchGatheringInfo', gatherId],
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
