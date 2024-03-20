import {create} from 'zustand';

/** 내가 방문한 전시회 선택 */
interface MyExhIdState {
  exhId: number;
  actions: {
    updateMyExhIdInfo: (exhId: number) => void;
  };
}

const useMyExhId = create<MyExhIdState>(set => ({
  exhId: -1,
  actions: {
    updateMyExhIdInfo: (exhId: number) => set(state => ({exhId: exhId})),
  },
}));

export const useMyExhIdInfo = () => useMyExhId(state => state.exhId);
export const useMyExhIdActions = () => useMyExhId(state => state.actions);

/** 내가 작성한 기록의 뒷면에 들어갈 데이터 */
interface MyDiaryBackInfoState {
  contents: string;
  writeDate: number[];
  actions: {
    updateforBackInfo: (contents: string, writeDate: number[]) => void;
  };
}

const useMyDiaryBack = create<MyDiaryBackInfoState>(set => ({
  contents: '',
  writeDate: [],
  actions: {
    updateforBackInfo: (contents: string, writeDate: number[]) => {
      set(state => ({contents: contents, writeDate: writeDate}));
    },
  },
}));

export const useMyDiaryBackInfo = () =>
  useMyDiaryBack(state => ({
    contents: state.contents,
    writeDate: state.writeDate,
  }));
export const useMyDiaryBackActions = () =>
  useMyDiaryBack(state => state.actions);

/** 내 기록 삭제하기 */
interface DeleteMyDiaryState {
  exhId: number;
  diaryId: number;
  userExhId: number;
  actions: {
    updateforDeleteMyDiary: (
      exhId: number,
      diaryId: number,
      userExhId: number,
    ) => void;
  };
}

// create: 보관함(Store)을 만들어주는 유용한 함수
const useDeleteMyDiary = create<DeleteMyDiaryState>(set => ({
  exhId: -1,
  diaryId: -1,
  userExhId: -1,
  actions: {
    updateforDeleteMyDiary: (
      exhId: number,
      diaryId: number,
      userExhId: number,
    ) => set(state => ({exhId: exhId, diaryId: diaryId, userExhId: userExhId})),
  },
}));

export const useDeleteMyDiaryInfo = () =>
  useDeleteMyDiary(state => ({
    exhId: state.exhId,
    diaryId: state.diaryId,
    userExhId: state.userExhId,
  }));
export const useDeleteMyDiaryActions = () =>
  useDeleteMyDiary(state => state.actions);
// https://itchallenger.tistory.com/814
// https://www.nextree.io/zustand/
