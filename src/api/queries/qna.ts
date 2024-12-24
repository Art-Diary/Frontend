import {createQueryKeys} from '@lukemorales/query-key-factory';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  AnswerRequestType,
  createQna,
  deleteQna,
  fetchQnaDetail,
  fetchQnaList,
  QnaRequestType,
  updateAnswerByAdmin,
  updateQuestionByUser,
} from '../qna';

export const qnaQueryKeys = createQueryKeys('qna', {
  fetchQnaList: (isAdmin: boolean) => ['fetchQnaList', isAdmin],
  fetchQnaDetail: (qnaId: number) => ['fetchQnaDetail', qnaId],
});

export const useFetchQnaList = (isAdmin: boolean) =>
  useQuery({
    queryKey: qnaQueryKeys.fetchQnaList(isAdmin).queryKey,
    queryFn: () => fetchQnaList(isAdmin),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[FetchQnaList] error fetch QnaList');
    },
    onSuccess: () => {
      console.log('[FetchQnaList] success fetch QnaList');
    },
    select: (res: any) => res.data,
  });

export const useFetchQnaDetail = (qnaId: number, isAdmin: boolean) =>
  useQuery({
    queryKey: qnaQueryKeys.fetchQnaDetail(qnaId).queryKey,
    queryFn: () => fetchQnaDetail(qnaId, isAdmin),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[FetchQnaDetail] error fetch QnaDetail');
    },
    onSuccess: () => {
      console.log('[FetchQnaDetail] success fetch QnaDetail');
    },
    select: (res: any) => res.data,
  });

export const useCreateQna = (): UseMutationResult<
  any,
  any,
  QnaRequestType,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<any, any, QnaRequestType, unknown>({
    mutationFn: (request: QnaRequestType) => createQna(request),
    onError: err => {
      console.log(err);
      console.log('[CreateQna] error create Qna');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(qnaQueryKeys.fetchQnaList(false).queryKey);
      console.log('[CreateQna] success create Qna');
    },
  });
};

export const useUpdateQuestionByUser = (
  qnaId: number,
): UseMutationResult<any, any, QnaRequestType, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<any, any, QnaRequestType, unknown>({
    mutationFn: (request: QnaRequestType) => updateQuestionByUser(request),
    onError: err => {
      console.log(err);
      console.log('[UpdateQuestionByUser] error update QuestionByUser');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        qnaQueryKeys.fetchQnaDetail(qnaId).queryKey,
      );
      console.log('[UpdateQuestionByUser] success update QuestionByUser');
    },
  });
};

export const useDeleteQna = (qnaId: number) => {
  return useMutation({
    mutationFn: () => deleteQna(qnaId),
    onError: err => {
      console.log(err);
      console.log('[DeleteQna] error delete Qna');
    },
    onSuccess: () => {
      console.log('[DeleteQna] success delete Qna');
    },
  });
};

export const useUpdateAnswerByAdmin = (
  qnaId: number,
): UseMutationResult<any, any, AnswerRequestType, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<any, any, AnswerRequestType, unknown>({
    mutationFn: (request: AnswerRequestType) => updateAnswerByAdmin(request),
    onError: err => {
      console.log(err);
      console.log('[UpdateAnswerByAdmin] error update AnswerByAdmin');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        qnaQueryKeys.fetchQnaDetail(qnaId).queryKey,
      );
      console.log('[UpdateAnswerByAdmin] success update AnswerByAdmin');
    },
  });
};
