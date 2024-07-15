import {create} from 'zustand';

/** 혼자 방문한 날짜 목록 데이터 */
interface ExhFromCalendarState {
  forget: boolean | null;
  visitDate: string | null;
  gatherId: number | null;
  exhVisitId: number | null;
  actions: {
    updateExhFromCalendar: (
      forget: boolean | null,
      visitDate: string | null,
      gatherId: number | null,
      exhVisitId: number | null,
    ) => void;
  };
}

// create: 보관함(Store)을 만들어주는 유용한 함수
const useExhFromCalendar = create<ExhFromCalendarState>(set => ({
  forget: null,
  visitDate: null,
  gatherId: null,
  exhVisitId: null,
  actions: {
    updateExhFromCalendar: (
      forget: boolean | null,
      visitDate: string | null,
      gatherId: number | null,
      exhVisitId: number | null,
    ) =>
      set(state => ({
        forget: forget,
        visitDate: visitDate,
        gatherId: gatherId,
        exhVisitId: exhVisitId,
      })),
  },
}));

export const useExhFromCalendarInfo = () =>
  useExhFromCalendar(state => ({
    forget: state.forget,
    visitDate: state.visitDate,
    gatherId: state.gatherId,
    exhVisitId: state.exhVisitId,
  }));
export const useExhFromCalendarActions = () =>
  useExhFromCalendar(state => state.actions);
