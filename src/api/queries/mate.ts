import {createQueryKeys} from '@lukemorales/query-key-factory';
import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  addNewMate,
  fetchExhMateList,
  fetchMateDiaryList,
  fetchMateExhList,
  fetchSearchMateList,
} from '../mate';

export const mateQueryKeys = createQueryKeys('mate', {
  fetchExhMateList: () => ['fetchExhMateList'],
  fetchSearchMateList: (nickname: string) => ['fetchSearchMateList', nickname],
  fetchMateExhList: (mateId: number) => ['fetchMateExhList', mateId],
  fetchMateDiaryList: (mateId: number, exhId: number) => [
    'fetchMateDiaryList',
    mateId,
    exhId,
  ],
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

export const useFetchSearchMateList = (nickname: string) =>
  useQuery({
    queryKey: mateQueryKeys.fetchSearchMateList(nickname).queryKey,
    queryFn: () => fetchSearchMateList(nickname),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[SearchMateList] error fetch SearchMateList');
    },
    onSuccess: () => {
      console.log('[SearchMateList] success fetch SearchMateList');
    },
    select: (res: any) => res.data,
  });

export const useAddNewMate = (
  userId: number,
): UseMutationResult<unknown, any, void, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<unknown, any, void, unknown>({
    mutationFn: () => addNewMate(userId),
    onError: err => {
      console.log(err);
      console.log('[AddNewMate] error create AddNewMate');
    },
    onSuccess: res => {
      console.log('[AddNewMate] success create AddNewMate');
      queryClient.invalidateQueries(mateQueryKeys.fetchExhMateList().queryKey);
    },
  });
};

export const useFetchMateExhList = (mateId: number) =>
  useQuery({
    queryKey: mateQueryKeys.fetchMateExhList(mateId).queryKey,
    queryFn: () => fetchMateExhList(mateId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[MateExhList] error fetch MateExhList');
    },
    onSuccess: () => {
      console.log('[MateExhList] success fetch MateExhList');
    },
    select: (res: any) => res.data,
  });

export const useFetchMateDiaryList = (mateId: number, exhId: number) =>
  useQuery({
    queryKey: mateQueryKeys.fetchMateDiaryList(mateId, exhId).queryKey,
    queryFn: () => fetchMateDiaryList(mateId, exhId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[MateDiaryList] error fetch MateDiaryList');
    },
    onSuccess: () => {
      console.log('[MateDiaryList] success fetch MateDiaryList');
    },
    select: (res: any) => res.data,
  });
