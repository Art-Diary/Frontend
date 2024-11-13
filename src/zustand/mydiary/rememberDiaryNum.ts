import {create} from 'zustand';

/** 작성한 기록 수정 페이지로 넘어가기 전 해당 페이지 위치 기억 */
interface rememberDiaryNumState {
  diaryNum: number;
  actions: {
    updateDiaryNum: (diaryNum: number) => void;
  };
}

const useRememberDiaryNum = create<rememberDiaryNumState>(set => ({
  diaryNum: -1,
  actions: {
    updateDiaryNum: (diaryNum: number) => set(state => ({diaryNum: diaryNum})),
  },
}));

export const useRememberDiaryNumInfo = () =>
  useRememberDiaryNum(state => ({diaryNum: state.diaryNum}));
export const useRememberDiaryNumActions = () =>
  useRememberDiaryNum(state => state.actions);
