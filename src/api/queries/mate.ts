import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  addNewMate,
  fetchExhMateList,
  fetchMateExhList,
  fetchSearchMateList,
} from '../mate';

const mateQueryKeys = createQueryKeys('mate', {
  fetchExhMateList: () => ['fetchExhMateList'],
  fetchSearchMateList: (nickname: string) => ['fetchSearchMateList', nickname],
  fetchMateExhList: (mateId: number) => ['fetchMateExhList', mateId],
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

export const useAddNewMate = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addNewMate(userId),
    onError: err => {
      console.log(err);
      console.log('[AddNewMate] error create AddNewMate');
    },
    onSuccess: res => {
      console.log('[AddNewMate] success create AddNewMate');
      queryClient.invalidateQueries(mateQueryKeys.fetchExhMateList());
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
