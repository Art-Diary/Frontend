import {create} from 'zustand';

/** 혼자 방문한 날짜 목록 데이터 */
interface MySoloMarkedDatesState {
  // exhId: number;
  visitDates: string[];
  haveForgot: boolean;
  actions: {
    // updateSoloExhId: (exhId: number) => void;
    updateVisitDates: (visitDates: string[]) => void;
  };
}

const isForgot = (visitDates: string[]): boolean => {
  for (let i = 0; i < visitDates.length; i++) {
    if (!visitDates[i]) {
      return true;
    }
  }
  return false;
};

// create: 보관함(Store)을 만들어주는 유용한 함수
const useMySoloMarkedDates = create<MySoloMarkedDatesState>(set => ({
  // exhId: -1,
  visitDates: [],
  haveForgot: false,
  actions: {
    // updateSoloExhId: (exhId: number) => set(state => ({exhId: exhId})),
    updateVisitDates: (visitDates: string[]) =>
      set(state => ({
        visitDates: visitDates,
        haveForgot: isForgot(visitDates),
      })),
  },
}));

export const useMySoloMarkedDatesInfo = () =>
  useMySoloMarkedDates(state => ({
    // exhId: state.exhId,
    haveForgot: state.haveForgot,
    visitDates: state.visitDates,
  }));
export const useMySoloMarkedDatesActions = () =>
  useMySoloMarkedDates(state => state.actions);
