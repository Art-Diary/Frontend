import {createQueryKeys} from '@lukemorales/query-key-factory';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from 'react-query';
import {
  createRegExh,
  fetchRegExhDetail,
  fetchRegExhs,
  updateRegExhByAdmin,
  UpdateRegExhByAdminType,
  updateRegExhByUser,
  UpdateRegExhByUserType,
} from '../regexh';

export const regexhQueryKeys = createQueryKeys('regexh', {
  fetchRegExhs: (isAdmin: boolean) => ['fetchRegExhs', isAdmin],
  fetchRegExhDetail: (regExhId: number, isAdmin: boolean) => [
    'fetchRegExhDetail',
    regExhId,
    isAdmin,
  ],
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
  return useMutation<any, any, FormData | null, unknown>({
    mutationFn: (formData: FormData | null) => createRegExh(formData),
    onError: err => {
      console.log(err);
      console.log('[ExhAddFormScreen] error create ExhAddForm');
    },
    onSuccess: () => {
      console.log('[ExhAddFormScreen] success create ExhAddForm');
    },
  });
};

export const usefetchRegExhDetail = (regExhId: number, isAdmin: boolean) =>
  useQuery({
    queryKey: regexhQueryKeys.fetchRegExhDetail(regExhId, isAdmin).queryKey,
    queryFn: () => fetchRegExhDetail(regExhId, isAdmin),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[FetchRegExhDetail] error fetch RegExhDetail');
    },
    onSuccess: () => {
      console.log('[FetchRegExhDetail] success fetch RegExhDetail');
    },
    select: (res: any) => res.data,
  });

export const useUpdateRegExhByAdmin = (): UseMutationResult<
  any,
  any,
  UpdateRegExhByAdminType,
  unknown
> => {
  // const queryClient = useQueryClient();

  return useMutation<any, any, UpdateRegExhByAdminType, unknown>({
    mutationFn: (updateData: UpdateRegExhByAdminType) =>
      updateRegExhByAdmin(updateData),
    onError: err => {
      console.log(err);
      console.log('[UpdateRegExhByAdmin] error update RegExhByAdmin');
    },
    onSuccess: () => {
      console.log('[UpdateRegExhByAdmin] success update RegExhByAdmin');
      // TODO queryClient.invalidateQueries();
    },
  });
};

export const useUpdateRegExhByUser = (): UseMutationResult<
  any,
  any,
  UpdateRegExhByUserType,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<any, any, UpdateRegExhByUserType, unknown>({
    mutationFn: (updateData: UpdateRegExhByUserType) =>
      updateRegExhByUser(updateData),
    onError: err => {
      console.log(err);
      console.log('[ExhAddFormScreen] error create ExhAddForm By User');
    },
    onSuccess: () => {
      console.log('[ExhAddFormScreen] success create ExhAddForm By User');
      // TODO queryClient.invalidateQueries();
    },
  });
};
