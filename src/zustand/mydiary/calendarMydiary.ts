import {create} from 'zustand';

/** 캘린더와 내 기록 구분 */
interface CalendarMydiaryState {
  isCalendar: boolean;
  actions: {
    updateIsCalendar: (isCalendar: boolean) => void;
  };
}

const useCalendarMydiary = create<CalendarMydiaryState>(set => ({
  isCalendar: false,
  actions: {
    updateIsCalendar: (isCalendar: boolean) =>
      set(state => ({isCalendar: isCalendar})),
  },
}));

export const useCalendarMydiaryInfo = () =>
  useCalendarMydiary(state => ({
    isCalendar: state.isCalendar,
  }));
export const useCalendarMydiaryActions = () =>
  useCalendarMydiary(state => state.actions);
