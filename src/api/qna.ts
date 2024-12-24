import {client} from './client';

/** qna API */
export const fetchQnaList = (isAdmin: boolean) =>
  client.get(`/qna`, {params: {isAdmin}});

export const fetchQnaDetail = (qnaId: number, isAdmin: boolean) =>
  client.get(`/qna/${qnaId}`, {params: {isAdmin}});

export const createQna = (request: QnaRequestType) =>
  client.post(`/qna`, {...request});

export const updateQuestionByUser = (request: QnaRequestType) =>
  client.patch(`/qna/${request.qnaId}`, {...request});

export const deleteQna = (qnaId: number) => client.delete(`/qna/${qnaId}`);

export const updateAnswerByAdmin = (request: AnswerRequestType) =>
  client.patch(`/qna/${request.qnaId}/answer`, {...request});

export type QnaRequestType = {
  qnaId?: number;
  title: string;
  body: string;
  writeDate: string;
};

export type AnswerRequestType = {
  qnaId: number;
  answer: string;
  answerDate: string;
};
