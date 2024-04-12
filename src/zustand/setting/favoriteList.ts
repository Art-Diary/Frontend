import {create} from 'zustand';

/** 좋아요 전시회 목록 (좋아요 전시회 편집 화면에서 사용할 목록 저장) */
interface ExhInfo {
  exhId: number;
  poster: string;
  exhName: string;
  gallery: string;
  exhPeriodStart: number[];
  exhPeriodEnd: number[];
}

interface FavoriteListState {
  exhList: ExhInfo[];
  actions: {
    updateFavoriteList: (exhList: ExhInfo[]) => void;
  };
}

const useFavoriteList = create<FavoriteListState>(set => ({
  exhList: [],
  actions: {
    updateFavoriteList: (exhList: ExhInfo[]) =>
      set(state => ({exhList: exhList})),
  },
}));

export const useFavoriteInfoList = () =>
  useFavoriteList(state => state.exhList);
export const useFavoriteListActions = () =>
  useFavoriteList(state => state.actions);
