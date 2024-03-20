import {create} from 'zustand';
import {JoinDateWithDot} from '~/utils/Date';

interface MySoloStoredDatesState {
  //   exhId: number;
  visitDates: string[];
  actions: {
    // updateExhId: (exhId: number) => void;
    updateVisitDates: (exvisitDateshId: number[][]) => void;
  };
}

const change = (visitDates: number[][]): string[] => {
  const changedFormatDates = [];
  for (let i = 0; i < visitDates.length; i++) {
    changedFormatDates.push(JoinDateWithDot(visitDates[i]));
  }
  return changedFormatDates;
};

// create: 보관함(Store)을 만들어주는 유용한 함수
const useMySoloStoredDates = create<MySoloStoredDatesState>(set => ({
  //   exhId: -1,
  visitDates: [],
  actions: {
    // updateExhId: exhId => set(state => ({exhId: exhId})),
    updateVisitDates: (visitDates: number[][]) =>
      set(state => ({
        visitDates: change(visitDates),
      })),
  },
}));

// export const useMySoloExhId = () => useMySoloStoredDates(state => state.exhId);
export const useMySoloVisitDates = () =>
  useMySoloStoredDates(state => state.visitDates);
export const useMySoloActions = () =>
  useMySoloStoredDates(state => state.actions);
