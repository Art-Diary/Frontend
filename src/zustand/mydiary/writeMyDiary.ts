import {create} from 'zustand';

/** 내 기록 작성하기 */
interface WriteMyDiaryState {
  isInGathering: boolean;
  gatherId: number | null;
  isUpdate: boolean | null;
  diaryId: number | null;
  exhVisitId: number | null;
  title: string | null;
  rate: number | null;
  diaryPrivate: boolean | null;
  contents: string | null;
  thumbnail: string | null;
  writeDate: string | null;
  saying: string | null;
  actions: {
    updateInGathering: (
      isInGathering: boolean,
      gatherId: number | null,
    ) => void;
    updateIsUpdate: (isUpdate: boolean | null) => void;
    updateforIds: (diaryId: number | null, exhVisitId: number | null) => void;
    updateforDetailInfo: (
      title: string | null,
      rate: number | null,
      diaryPrivate: boolean | null,
      thumbnail: string | null,
      saying: string | null,
    ) => void;
    updateTitle: (title: string | null) => void;
    updateRate: (rate: number | null) => void;
    updateDiaryPrivate: (diaryPrivate: boolean | null) => void;
    updateThumbnail: (thumbnail: string | null) => void;
    updateSaying: (saying: string | null) => void;
    updateforContent: (contents: string | null) => void;
    resetWriteInfo: () => void;
  };
}

const useWriteMyDiary = create<WriteMyDiaryState>(set => ({
  isInGathering: false,
  gatherId: null,
  isUpdate: null,
  diaryId: null,
  exhVisitId: null,
  title: null,
  rate: null,
  diaryPrivate: null,
  thumbnail: null,
  writeDate: null,
  saying: null,
  contents: null,
  actions: {
    updateInGathering: (isInGathering: boolean, gatherId: number | null) =>
      set(state => ({isInGathering: isInGathering, gatherId: gatherId})),
    updateIsUpdate: (isUpdate: boolean | null) =>
      set(state => ({isUpdate: isUpdate})),
    updateforIds: (diaryId: number | null, exhVisitId: number | null) =>
      set(state => ({
        diaryId: diaryId,
        exhVisitId: exhVisitId,
      })),
    updateforDetailInfo: (
      title: string | null,
      rate: number | null,
      diaryPrivate: boolean | null,
      thumbnail: string | null,
      saying: string | null,
    ) =>
      set(state => ({
        title: title,
        rate: rate,
        diaryPrivate: diaryPrivate,
        thumbnail: thumbnail,
        saying: saying,
      })),
    updateTitle: (title: string | null) =>
      set(state => ({
        title: title,
      })),
    updateRate: (rate: number | null) =>
      set(state => ({
        rate: rate,
      })),
    updateDiaryPrivate: (diaryPrivate: boolean | null) =>
      set(state => ({
        diaryPrivate: diaryPrivate,
      })),
    updateThumbnail: (thumbnail: string | null) =>
      set(state => ({
        thumbnail: thumbnail,
      })),
    updateSaying: (saying: string | null) =>
      set(state => ({
        saying: saying,
      })),
    updateforContent: (contents: string | null) =>
      set(state => ({contents: contents})),
    resetWriteInfo: () =>
      set(state => ({
        isUpdate: null,
        diaryId: null,
        exhVisitId: null,
        title: null,
        rate: null,
        diaryPrivate: null,
        thumbnail: null,
        writeDate: null,
        saying: null,
        contents: null,
      })),
  },
}));

export const useWriteMyDiaryInfo = () =>
  useWriteMyDiary(state => ({
    isInGathering: state.isInGathering,
    gatherId: state.gatherId,
    isUpdate: state.isUpdate,
    diaryId: state.diaryId,
    exhVisitId: state.exhVisitId,
    title: state.title,
    rate: state.rate,
    diaryPrivate: state.diaryPrivate,
    thumbnail: state.thumbnail,
    writeDate: state.writeDate,
    saying: state.saying,
    contents: state.contents,
  }));
export const useWriteMyDiaryActions = () =>
  useWriteMyDiary(state => state.actions);
