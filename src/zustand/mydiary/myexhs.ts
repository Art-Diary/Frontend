import {create} from 'zustand';

interface MyExhState {
  exhId: number;
  actions: {
    updateExhId: (exhId: number) => void;
  };
}

// create: 보관함(Store)을 만들어주는 유용한 함수
const useMyExh = create<MyExhState>(set => ({
  exhId: -1,
  actions: {
    updateExhId: exhId => set(state => ({exhId: exhId})),
  },
}));

export const useMyExhExhId = () => useMyExh(state => state.exhId);
export const useMyExhActions = () => useMyExh(state => state.actions);
// https://itchallenger.tistory.com/814
// https://www.nextree.io/zustand/
