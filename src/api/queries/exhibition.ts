import {createQueryKeys} from '@lukemorales/query-key-factory';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from 'react-query';
import {
  fetchSearchExh,
  fetchExhDetailInfo,
  fetchAddLike,
  fetchLikeList,
  fetchDeleteLike,
  fetchDiaryListForExh,
  fetchStoredDateOfExhInGroup,
  fetchSearchContentList,
  fetchAddSearchContent,
  fetchDeleteSearchContent,
  fetchExhListBySearchContent,
} from '../exhibition';

export const exhibitionQueryKeys = createQueryKeys('exhibition', {
  fetchSearchExhInMyDiary: (searchName: string) => [
    'fetchSearchExhInMyDiary',
    searchName,
  ],
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
  fetchSearchContentList: () => ['fetchSearchContentList'],
  fetchExhListBySearchContent: (searchName?: string) => [
    'fetchExhListBySearchContent',
    searchName,
  ],
});

export const useFetchSearchExhInMyDiary = (searchName: string) =>
  useQuery({
    enabled: false,
    queryKey: exhibitionQueryKeys.fetchSearchExhInMyDiary(searchName).queryKey,
    queryFn: () => fetchSearchExh(searchName, null, null, null, null),
    staleTime: 500000,
    onError: err => {
      console.log('error fetch SearchExh');
    },
    onSuccess: () => {
      console.log('success fetch SearchExh');
    },
    select: (res: any) => res.data,
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
      console.log('[FetchSearchExh] error fetch SearchExh');
    },
    onSuccess: () => {
      console.log('[FetchSearchExh] success fetch SearchExh');
    },
    select: (res: any) => res.data,
  });

export const useFetchExhListBySearchContent = (searchName: string | null) =>
  useQuery({
    queryKey: [
      exhibitionQueryKeys.fetchExhListBySearchContent().queryKey,
      searchName,
    ],
    queryFn: () => fetchExhListBySearchContent(searchName),
    staleTime: 500000,
    onError: err => {
      console.log('[FetchExhBySearchContent] error fetch ExhList', searchName);
    },
    onSuccess: () => {
      console.log('[FetchExhBySearchContent] success fetch ExhList');
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

export const useAddLike = (
  exhId: number,
): UseMutationResult<any, any, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<any, any, number, unknown>({
    mutationFn: (exhId: number) => fetchAddLike(exhId),
    onError: err => {
      console.log(err);
      console.log('[AddLikeExhibition] error fetch favorite');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        exhibitionQueryKeys.fetchLikeList().queryKey,
      );
      console.log('[AddLikeExhibition] success fetch favorite');
    },
  });
};

export const useDeleteLike = (
  favoriteExhsList: number[],
): UseMutationResult<any, any, number[], unknown> => {
  const queryClient = useQueryClient();

  return useMutation<any, any, number[], unknown>({
    mutationFn: (favoriteExhsList: number[]) =>
      fetchDeleteLike(favoriteExhsList),
    onError: err => {
      console.log(err);
      console.log('[DeleteLikeExhibition] error fetch delete favorite');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        exhibitionQueryKeys.fetchLikeList().queryKey,
      );
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

export const useFetchSearchContentList = () =>
  useQuery({
    queryKey: exhibitionQueryKeys.fetchSearchContentList().queryKey,
    queryFn: () => fetchSearchContentList(),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[ExhSearchNameScreen] error fetch SearchContentList');
    },
    onSuccess: () => {
      console.log('[ExhSearchNameScreen] success fetch SearchContentList');
    },
    select: (res: any) => res.data,
  });

export const useFetchAddSearchContent = (
  searchContent: string,
  searchTime: Date,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fetchAddSearchContent(searchContent, searchTime),
    onError: err => {
      console.log(err);
      console.log('[AddSearchContent] error fetch Add SearchContent');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        exhibitionQueryKeys.fetchSearchContentList().queryKey,
      );
      console.log('[AddSearchContent] success fetch Add SearchContent');
    },
  });
};

export const useFetchDeleteSearchContent = (searchId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fetchDeleteSearchContent(searchId),
    onError: err => {
      console.log(err);
      console.log('[DeleteSearchContent] error fetch Delete SearchContent');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        exhibitionQueryKeys.fetchSearchContentList().queryKey,
      );
      console.log('[DeleteSearchContent] success fetch Delete SearchContent');
    },
  });
};
