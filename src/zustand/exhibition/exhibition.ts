import {create} from 'zustand';

/** 전시회 검색 */
interface SearchName {
  name: string;
  updateSearchName: (newName: string) => void;
}

const useSearchName = create<SearchName>(set => ({
  name: '',
  updateSearchName: (newName: string) => set(state => ({name: newName})),
}));

export default useSearchName;
