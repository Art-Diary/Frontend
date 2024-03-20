import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery, useQueryClient} from 'react-query';
import {fetchSearchExh} from '../exhibition';

const exhibitionQueryKeys = createQueryKeys('exhibition', {
  fetchSearchExh: (searchName: string) => ['fetchSearchExh', searchName],
});

export const useFetchSearchExh = (searchName: string) =>
  useQuery({
    queryKey: exhibitionQueryKeys.fetchSearchExh(searchName).queryKey,
    queryFn: () => fetchSearchExh(searchName),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[MyExhAddScreen] error fetch MyExhAdd');
    },
    onSuccess: () => {
      console.log('[MyExhAddScreen] success fetch MyExhAdd');
    },
    select: (res: any) => res.data,
  });
