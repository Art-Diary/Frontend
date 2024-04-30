import {create} from 'zustand';

// 전시회 이름으로 검색
interface SearchName {
  name: string | null;
  actions: {
    updateSearchName: (name: string | null) => void;
  };
}

const useSearchName = create<SearchName>(set => ({
  name: null,
  actions: {
    updateSearchName: (name: string | null) => set(state => ({name: name})),
  },
}));

export const useSearchNameInfo = () =>
  useSearchName(state => ({name: state.name}));
export const useSearchNameActions = () => useSearchName(state => state.actions);

/*전시회 날짜로 검색
interface SearchDate {
  date: Date | null;
  updateSearchDate: (newDate: Date) => void;
}

export const useSearchDate = create<SearchDate>(set => ({
  date: null,
  updateSearchDate: (newDate: Date) => set(state => ({date: newDate})),
}));
//export default useSearchDate;*/
