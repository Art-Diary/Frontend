import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery} from 'react-query';
import {fetchGatheringList} from '../gathering';

const gatheringQueryKeys = createQueryKeys('gathering', {
  fetchGatheringList: () => ['fetchGatheringList'],
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
