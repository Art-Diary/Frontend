import {create} from 'zustand';

/** 내 기록 작성하기 */
interface WriteMyDiaryState {
  userExhId: number;
  gatheringExhId: number;
  title: string;
  rate: number;
  diaryPrivate: boolean;
  contents: string;
  thumbnail: string;
  writeDate: number[];
  saying: string;
  actions: {
    updateforIds: (userExhId: number, gatheringExhId: number) => void;
    updateforDetailInfo: (
      title: string,
      rate: number,
      diaryPrivate: boolean,
      thumbnail: string,
      writeDate: number[],
      saying: string,
    ) => void;
    updateforContent: (contents: string) => void;
  };
}

const useWriteMyDiary = create<WriteMyDiaryState>(set => ({
  userExhId: -1,
  gatheringExhId: -1,
  title: '',
  rate: 0.0,
  diaryPrivate: true,
  thumbnail: 'string',
  writeDate: [],
  saying: '',
  contents: '',
  actions: {
    updateforIds: (userExhId: number, gatheringExhId: number) =>
      set(state => ({userExhId: userExhId, gatheringExhId: gatheringExhId})),
    updateforDetailInfo: (
      title: string,
      rate: number,
      diaryPrivate: boolean,
      thumbnail: string,
      writeDate: number[],
      saying: string,
    ) =>
      set(state => ({
        title: title,
        rate: rate,
        diaryPrivate: diaryPrivate,
        thumbnail: thumbnail,
        writeDate: writeDate,
        saying: saying,
      })),
    updateforContent: (contents: string) =>
      set(state => ({contents: contents})),
  },
}));

export const useWriteMyDiaryInfo = () =>
  useWriteMyDiary(state => ({
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
