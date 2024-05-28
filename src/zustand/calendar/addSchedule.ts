import {create} from 'zustand';
import {changeDotToHyphen} from '~/utils/Date';

/** 혼자 방문한 날짜 목록 데이터 */
interface AddScheduleState {
  addDate: string | null;
  actions: {
    updateAddDate: (addDate: string | null) => void;
  };
}

// create: 보관함(Store)을 만들어주는 유용한 함수
const useAddSchedule = create<AddScheduleState>(set => ({
  addDate: null,
  actions: {
    updateAddDate: (addDate: string | null) =>
      set(state => ({addDate: addDate ? changeDotToHyphen(addDate) : addDate})),
  },
}));

export const useAddScheduleInfo = () =>
  useAddSchedule(state => ({
    addDate: state.addDate,
  }));
export const useAddScheduleActions = () =>
  useAddSchedule(state => state.actions);
