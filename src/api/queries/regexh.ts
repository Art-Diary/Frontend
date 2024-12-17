import {createQueryKeys} from '@lukemorales/query-key-factory';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  createRegExh,
  deleteRegExh,
  fetchRegExhDetail,
  fetchRegExhs,
  updateRegExhByAdmin,
  updateRegExhByUser,
  UpdateRegExhType,
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
  const queryClient = useQueryClient();

  return useMutation<any, any, FormData | null, unknown>({
    mutationFn: (formData: FormData | null) => createRegExh(formData),
    onError: err => {
      console.log(err);
      console.log('[ExhAddFormScreen] error create ExhAddForm');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        regexhQueryKeys.fetchRegExhs(false).queryKey,
      );
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

export const useDeleteRegExh = (regExhId: number) => {
  return useMutation({
    mutationFn: () => deleteRegExh(regExhId),
    onError: err => {
      console.log(err);
      console.log('[DeleteRegExh] error delete DeleteRegExh');
    },
    onSuccess: () => {
      console.log('[DeleteRegExh] success delete DeleteRegExh');
    },
  });
};

export const useUpdateRegExhByAdmin = (): UseMutationResult<
  any,
  any,
  UpdateRegExhType,
  unknown
> => {
  return useMutation<any, any, UpdateRegExhType, unknown>({
    mutationFn: (updateData: UpdateRegExhType) =>
      updateRegExhByAdmin(updateData),
    onError: err => {
      console.log(err);
      console.log('[UpdateRegExhByAdmin] error update RegExhByAdmin');
    },
    onSuccess: () => {
      console.log('[UpdateRegExhByAdmin] success update RegExhByAdmin');
    },
  });
};

export const useUpdateRegExhByUser = (): UseMutationResult<
  any,
  any,
  UpdateRegExhType,
  unknown
> => {
  return useMutation<any, any, UpdateRegExhType, unknown>({
    mutationFn: (updateData: UpdateRegExhType) =>
      updateRegExhByUser(updateData),
    onError: err => {
      console.log(err);
      console.log('[UpdateRegExhByUser] error update RegExhByUser');
    },
    onSuccess: () => {
      console.log('[UpdateRegExhByUser] success update RegExhByUser');
    },
  });
};
