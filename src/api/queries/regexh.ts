import {createQueryKeys} from '@lukemorales/query-key-factory';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from 'react-query';
import {fetchRegExhs} from '../regexh';

export const regexhQueryKeys = createQueryKeys('regexh', {
  fetchRegExhs: (isAdmin: boolean) => ['fetchRegExhs', isAdmin],
});

export const usefetchRegExhs = (isAdmin: boolean) =>
  useQuery({
    queryKey: [regexhQueryKeys.fetchRegExhs(isAdmin).queryKey, isAdmin],
    queryFn: () => fetchRegExhs(isAdmin),
    staleTime: 500000,
    onError: err => {
      console.log('[FetchRegExhs] error fetch RegExh');
    },
    onSuccess: () => {
      console.log('[FetchRegExhs] success fetch RegExh');
    },
    select: (res: any) => res.data,
  });
