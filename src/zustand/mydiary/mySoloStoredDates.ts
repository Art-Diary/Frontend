import {create} from 'zustand';
import {JoinDateWithDot} from '~/utils/Date';

/** 혼자 방문한 날짜 목록 데이터 */
interface MySoloStoredDatesState {
  exhId: number;
  visitDates: string[];
  actions: {
    updateSoloExhId: (exhId: number) => void;
    updateVisitDates: (visitDates: number[][]) => void;
    updateOneVisitDate: (visitDates: string) => void;
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
  exhId: -1,
  visitDates: [],
  actions: {
    updateSoloExhId: (exhId: number) => set(state => ({exhId: exhId})),
    updateVisitDates: (visitDates: number[][]) =>
      set(state => ({
        visitDates: change(visitDates),
      })),
    updateOneVisitDate: (newVisitDate: string) =>
      set(state => ({
        visitDates: [...state.visitDates, newVisitDate],
      })),
  },
}));

export const useMySoloInfo = () =>
  useMySoloStoredDates(state => ({
    exhId: state.exhId,
    visitDates: state.visitDates,
  }));
export const useMySoloActions = () =>
  useMySoloStoredDates(state => state.actions);
