import {create} from 'zustand';

type BackInfo = {
  contents: string;
  writeDate: number[];
};

// 다이어리 뒷면
interface DiaryBackState {
  backInfo: BackInfo;
  actions: {
    updateBackInfo: (backInfo: BackInfo) => void;
  };
}

const useDiaryBack = create<DiaryBackState>(set => ({
  backInfo: {
    contents: '',
    writeDate: [],
  },
  actions: {
    updateBackInfo: (backInfo: BackInfo) =>
      set(state => ({backInfo: backInfo})),
  },
}));

export const useDiaryBackInfo = () =>
  useDiaryBack(state => ({backInfo: state.backInfo}));

export const useDiaryBackActions = () => useDiaryBack(state => state.actions);
