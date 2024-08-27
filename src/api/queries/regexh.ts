import {createQueryKeys} from '@lukemorales/query-key-factory';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from 'react-query';
import {createRegExh, fetchRegExhDetail, fetchRegExhs} from '../regexh';

export const regexhQueryKeys = createQueryKeys('regexh', {
  fetchRegExhs: (isAdmin: boolean) => ['fetchRegExhs', isAdmin],
  fetchRegExhDetail: (regExhId: number) => ['fetchRegExhDetail', regExhId],
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

export const useCreateRegExh = (): UseMutationResult<
  any,
  any,
  FormData | null,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<any, any, FormData | null, unknown>({
    mutationFn: (formData: FormData | null) => createRegExh(formData),
    onError: err => {
      console.log(err);
      console.log('[ExhAddFormScreen] error create ExhAddForm');
    },
    onSuccess: () => {
      console.log('[ExhAddFormScreen] success create ExhAddForm');
      // TODO queryClient.invalidateQueries();
    },
  });
};

export const usefetchRegExhDetail = (regExhId: number) =>
  useQuery({
    queryKey: regexhQueryKeys.fetchRegExhDetail(regExhId).queryKey,
    queryFn: () => fetchRegExhDetail(regExhId),
    staleTime: 500000,
    onError: err => {
      console.log('[FetchRegExhDetail] error fetch RegExhDetail');
    },
    onSuccess: () => {
      console.log('[FetchRegExhDetail] success fetch RegExhDetail');
    },
    select: (res: any) => res.data,
  });
