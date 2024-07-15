import {create} from 'zustand';

/** 내가 방문한 전시회 선택 */
interface MyExhIdState {
  exhId: number;
  actions: {
    updateVisitedExhId: (exhId: number) => void;
  };
}

const useVisitedExhId = create<MyExhIdState>(set => ({
  exhId: -1,
  actions: {
    updateVisitedExhId: (exhId: number) => set(state => ({exhId: exhId})),
  },
}));

export const useVisitedExhIdInfo = () =>
  useVisitedExhId(state => ({exhId: state.exhId}));
export const useVisitedExhIdActions = () =>
  useVisitedExhId(state => state.actions);
// https://itchallenger.tistory.com/814
// https://www.nextree.io/zustand/
