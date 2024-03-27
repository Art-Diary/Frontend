import {create} from 'zustand';

/** 내 기록 작성하기 */
interface WriteMyDiaryState {
  isUpdate: boolean | null;
  diaryId: number | null;
  userExhId: number | null;
  gatheringExhId: number | null;
  title: string | null;
  rate: number | null;
  diaryPrivate: boolean | null;
  contents: string | null;
  thumbnail: string | null;
  writeDate: number[] | null;
  saying: string | null;
  actions: {
    updateIsUpdate: (isUpdate: boolean | null) => void;
    updateforIds: (
      diaryId: number | null,
      userExhId: number | null,
      gatheringExhId: number | null,
    ) => void;
    updateforDetailInfo: (
      title: string | null,
      rate: number | null,
      diaryPrivate: boolean | null,
      thumbnail: string | null,
      writeDate: number[] | null,
      saying: string | null,
    ) => void;
    updateforContent: (contents: string | null) => void;
  };
}

const useWriteMyDiary = create<WriteMyDiaryState>(set => ({
  isUpdate: null,
  diaryId: null,
  userExhId: null,
  gatheringExhId: null,
  title: null,
  rate: null,
  diaryPrivate: null,
  thumbnail: null,
  writeDate: null,
  saying: null,
  contents: null,
  actions: {
    updateIsUpdate: (isUpdate: boolean | null) =>
      set(state => ({isUpdate: isUpdate})),
    updateforIds: (
      diaryId: number | null,
      userExhId: number | null,
      gatheringExhId: number | null,
    ) =>
      set(state => ({
        diaryId: diaryId,
        userExhId: userExhId,
        gatheringExhId: gatheringExhId,
      })),
    updateforDetailInfo: (
      title: string | null,
      rate: number | null,
      diaryPrivate: boolean | null,
      thumbnail: string | null,
      writeDate: number[] | null,
      saying: string | null,
    ) =>
      set(state => ({
        title: title,
        rate: rate,
        diaryPrivate: diaryPrivate,
        thumbnail: thumbnail,
        writeDate: writeDate,
        saying: saying,
      })),
    updateforContent: (contents: string | null) =>
      set(state => ({contents: contents})),
  },
}));

export const useWriteMyDiaryInfo = () =>
  useWriteMyDiary(state => ({
    isUpdate: state.isUpdate,
    diaryId: state.diaryId,
    userExhId: state.userExhId,
    gatheringExhId: state.gatheringExhId,
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
