import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery} from 'react-query';
import {fetchMyExhList} from '../mydiary';

const mydiaryQueryKeys = createQueryKeys('mydiary', {
  fetchMyExhList: () => ['fetchMyExhList'],
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
