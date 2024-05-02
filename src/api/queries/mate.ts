import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery} from 'react-query';
import {fetchExhMateList} from '../mate';

const mateQueryKeys = createQueryKeys('mate', {
  fetchExhMateList: () => ['fetchExhMateList'],
});

export const useFetchExhMateList = () =>
  useQuery({
    queryKey: mateQueryKeys.fetchExhMateList().queryKey,
    queryFn: () => fetchExhMateList(),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[ExhMateList] error fetch ExhMateList');
    },
    onSuccess: () => {
      console.log('[ExhMateList] success fetch ExhMateList');
    },
    select: (res: any) => res.data,
  });
