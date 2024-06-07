import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {
  fetchSearchExh,
  fetchExhDetailInfo,
  fetchAddLike,
  fetchLikeList,
  fetchDeleteLike,
  fetchAllExh,
  fetchDiaryListForExh,
  fetchStoredDateOfExhInGroup,
} from '../exhibition';

const exhibitionQueryKeys = createQueryKeys('exhibition', {
  fetchSearchExh: (
    searchName?: string,
    price?: string,
    field?: string[],
    state?: string[],
    date?: Date,
  ) => ['fetchSearchExh', searchName, price, field, state, date],
  fetchLikeList: () => ['fetchLikeList'],
  fetchExhDetailInfo: (exhId: number) => ['fetchExhDetailInfo', exhId],
  fetchDiaryListForExh: (exhId: number) => ['fetchDiaryListForExh', exhId],
  fetchStoredDateOfExhInGroup: (exhId: number, gatherId?: number) => [
    'fetchStoredDateOfExhInGroup',
    exhId,
    gatherId,
  ],
});

export const useFetchSearchExh = (
  searchName: string | null,
  price: string | null,
  field: string[] | null,
  state: string[] | null,
  date: string | null,
) =>
  useQuery({
    queryKey: [
      exhibitionQueryKeys.fetchSearchExh().queryKey,
      searchName,
      price,
      field,
      state,
      date,
    ],
    queryFn: () => fetchSearchExh(searchName, price, field, state, date),
    staleTime: 500000,
    onError: err => {
      console.log('error fetch SearchExh');
    },
    onSuccess: () => {
      console.log('success fetch SearchExh');
    },
    select: (res: any) => res.data,
  });

export const useFetchExhDetailInfo = (exhId: number) =>
  useQuery({
    queryKey: exhibitionQueryKeys.fetchExhDetailInfo(exhId).queryKey,
    queryFn: () => fetchExhDetailInfo(exhId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[ExhDetailInfoScreen] error fetch ExhDetailInfo');
    },
    onSuccess: () => {
      console.log(exhId, '[ExhDetailInfoScreen] success fetch ExhDetailInfo');
    },
    select: (res: any) => res.data,
  });

export const useFetchDiaryListForExh = (exhId: number) =>
  useQuery({
    queryKey: exhibitionQueryKeys.fetchDiaryListForExh(exhId).queryKey,
    queryFn: () => fetchDiaryListForExh(exhId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[ExhDetailInfoScreen] error fetch DiaryList');
    },
    onSuccess: () => {
      console.log(exhId, '[ExhDetailInfoScreen] success fetch DiaryList');
    },
    select: (res: any) => res.data,
  });

export const useFetchDatesforExh = (exhId: number, gatherId: number[] | null) =>
  useQuery({
    queryKey: [exhibitionQueryKeys.fetchDatesforExh(exhId).queryKey, gatherId],
    queryFn: () => fetchDatesforExh(exhId, gatherId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[ExhDetailInfoScreen] error fetch Dates for exh');
    },
    onSuccess: () => {
      console.log(exhId, '[ExhDetailInfoScreen] success fetch Dates for exh');
    },
    select: (res: any) => res.data,
  });

export const useAddLike = (exhId: number) => {
  return useMutation({
    mutationFn: () => fetchAddLike(exhId),
    onError: err => {
      console.log(err);
      console.log('[AddLikeExhibition] error fetch favorite');
    },
    onSuccess: () => {
      console.log('[AddLikeExhibition] success fetch favorite');
    },
  });
};

export const useDeleteLike = (favoriteExhsList: number[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fetchDeleteLike(favoriteExhsList),
    onError: err => {
      console.log(err);
      console.log('[DeleteLikeExhibition] error fetch delete favorite');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(exhibitionQueryKeys.fetchLikeList());
      console.log('[DeleteLikeExhibition] success fetch delete favorite');
    },
  });
};

export const useFetchFavoriteList = () =>
  useQuery({
    queryKey: exhibitionQueryKeys.fetchLikeList().queryKey,
    queryFn: () => fetchLikeList(),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[FavoriteListScreen] error fetch FavoriteList');
    },
    onSuccess: () => {
      console.log('[FavoriteListScreen] success fetch FavoriteList');
    },
    select: (res: any) => res.data,
  });

export const useFetchStoredDateOfExhInGroup = (
  exhId: number,
  gatherId: number | null,
) =>
  useQuery({
    queryKey: [
      exhibitionQueryKeys.fetchStoredDateOfExhInGroup(exhId).queryKey,
      gatherId,
    ],
    queryFn: () => fetchStoredDateOfExhInGroup(exhId, gatherId),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log(
        '[StoredDateOfExhInGroup] error fetch StoredDateOfExhInGroup',
      );
    },
    onSuccess: () => {
      console.log(
        '[StoredDateOfExhInGroup] success fetch StoredDateOfExhInGroup',
      );
    },
    select: (res: any) => res.data,
  });
