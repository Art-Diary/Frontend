import {create} from 'zustand';

interface MyExhState {
  exhId: number;
  diaryId: number;
  isSolo: boolean;
  actions: {
    updateExhId: (exhId: number) => void;
    updateDiaryId: (diaryId: number) => void;
    updateIsSolo: (isSolo: boolean) => void;
  };
}

// create: 보관함(Store)을 만들어주는 유용한 함수
const useMyDiary = create<MyExhState>(set => ({
  exhId: -1,
  diaryId: -1,
  isSolo: true,
  actions: {
    updateExhId: exhId => set(state => ({exhId: exhId})),
    updateDiaryId: diaryId => set(state => ({diaryId: diaryId})),
    updateIsSolo: isSolo => set(state => ({isSolo: isSolo})),
  },
}));

export const useMyDiaryExhId = () => useMyDiary(state => state.exhId);
export const useMyDiaryId = () => useMyDiary(state => state.diaryId);
export const useMyDiaryIsSolo = () => useMyDiary(state => state.isSolo);
export const useMyDiaryActions = () => useMyDiary(state => state.actions);
// https://itchallenger.tistory.com/814
// https://www.nextree.io/zustand/
