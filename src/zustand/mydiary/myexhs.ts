import {create} from 'zustand';

interface MyExhState {
  exhId: number;
  updateExhId: (exhId: number) => void;
  //   increase: () => void;
}

// create: 보관함(Store)을 만들어주는 유용한 함수
export const useMyExh = create<MyExhState>(set => ({
  exhId: -1,
  updateExhId: exhId => set(state => ({exhId: exhId})),
  //   increase: () => set(state => ({count: state.count + 1})),
}));

// https://itchallenger.tistory.com/814
// https://www.nextree.io/zustand/
