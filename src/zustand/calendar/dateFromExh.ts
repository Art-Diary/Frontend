import {create} from 'zustand';

// year.month.day
interface DateFromExhState {
  date: string | null;
  actions: {
    updateDate: (date: string | null) => void;
  };
}

// create: 보관함(Store)을 만들어주는 유용한 함수
const useDateFromExh = create<DateFromExhState>(set => ({
  date: null,
  actions: {
    updateDate: (date: string | null) => set(state => ({date: date})),
  },
}));

export const useDateFromExhInfo = () =>
  useDateFromExh(state => ({
    date: state.date,
  }));
export const useDateFromExhActions = () =>
  useDateFromExh(state => state.actions);
