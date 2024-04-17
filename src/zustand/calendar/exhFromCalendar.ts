import {create} from 'zustand';

/** 혼자 방문한 날짜 목록 데이터 */
interface ExhFromCalendarState {
  forget: boolean | null;
  visitDate: string | null;
  gatherId: number | null;
  userExhId: number | null;
  gatherExhId: number | null;
  actions: {
    updateForget: (forget: boolean | null) => void;
    updateVisitDate: (visitDate: string | null) => void;
    updateGatherId: (gatherId: number | null) => void;
    updateUserExhId: (userExhId: number | null) => void;
    updateGatherExhId: (gatherExhId: number | null) => void;
  };
}

// create: 보관함(Store)을 만들어주는 유용한 함수
const useExhFromCalendar = create<ExhFromCalendarState>(set => ({
  forget: null,
  visitDate: null,
  gatherId: null,
  userExhId: null,
  gatherExhId: null,
  actions: {
    updateForget: (forget: boolean | null) => set(state => ({forget: forget})),
    updateVisitDate: (visitDate: string | null) =>
      set(state => ({visitDate: visitDate})),
    updateGatherId: (gatherId: number | null) =>
      set(state => ({gatherId: gatherId})),
    updateUserExhId: (userExhId: number | null) =>
      set(state => ({userExhId: userExhId})),
    updateGatherExhId: (gatherExhId: number | null) =>
      set(state => ({gatherExhId: gatherExhId})),
  },
}));

export const useExhFromCalendarInfo = () =>
  useExhFromCalendar(state => ({
    forget: state.forget,
    visitDate: state.visitDate,
    gatherId: state.gatherId,
    userExhId: state.userExhId,
    gatherExhId: state.gatherExhId,
  }));
export const useExhFromCalendarActions = () =>
  useExhFromCalendar(state => state.actions);
