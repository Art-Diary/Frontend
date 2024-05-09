import {create} from 'zustand';

type MateInfo = {
  userId: number;
  nickname: string;
  profile: string | undefined;
  favoriteArt: string;
};

interface MateState {
  mateInfo: MateInfo;
  actions: {
    updateMate: (mateInfo: MateInfo) => void;
  };
}

const useMate = create<MateState>(set => ({
  mateInfo: {
    userId: -1,
    nickname: '',
    profile: undefined,
    favoriteArt: '',
  },
  actions: {
    updateMate: (mateInfo: MateInfo) => set(state => ({mateInfo: mateInfo})),
  },
}));

export const useMateInfo = () => useMate(state => ({mateInfo: state.mateInfo}));

export const useMateActions = () => useMate(state => state.actions);
