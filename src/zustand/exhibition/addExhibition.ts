import {create} from 'zustand';

type RegExhData = {
  regExhName: string;
  regGallery: string;
  regExhPeriodStart: string;
  regExhPeriodEnd: string;
  regPainter: string;
  regFee: number;
  regIntro: string | undefined;
  regUrl: string | undefined;
  regPoster: string;
  regArt: string | undefined;
  regDate: string;
};

// 전시회 이름으로 검색
interface AddExhibition {
  regExhData: RegExhData;
  actions: {
    updateRegExhData: (regExhData: RegExhData) => void;
  };
}

const useAddExhibition = create<AddExhibition>(set => ({
  regExhData: {
    regExhName: '',
    regGallery: '',
    regExhPeriodStart: '',
    regExhPeriodEnd: '',
    regPainter: '',
    regFee: -1,
    regIntro: undefined,
    regUrl: undefined,
    regPoster: '',
    regArt: undefined,
    regDate: '',
  },
  actions: {
    updateRegExhData: (regExhData: RegExhData) =>
      set(state => ({regExhData: regExhData})),
  },
}));

export const useAddExhibitionInfo = () =>
  useAddExhibition(state => ({regExhData: state.regExhData}));
export const useAddExhibitionActions = () =>
  useAddExhibition(state => state.actions);
