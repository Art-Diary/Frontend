import {create} from 'zustand';

interface MyDiaryInfo {
  diaryId: number;
  title: string;
  rate: number;
  diaryPrivate: boolean;
  contents: string;
  thumbnail: string;
  writeDate: number[];
  saying: string;
  nickname: string;
  gatherName: string;
  visitDate: number[];
  exhName: string;
  userExhId: number;
  gatheringExhId: number;
}

interface MyExhState {
  exhId: number;
  myDiaryInfo: MyDiaryInfo;
  actions: {
    updateExhId: (exhId: number) => void;
    updateMyDiaryInfo: (myDiaryInfo: MyDiaryInfo) => void;
  };
}

// create: 보관함(Store)을 만들어주는 유용한 함수
const useMyDiary = create<MyExhState>(set => ({
  exhId: -1,
  myDiaryInfo: {
    diaryId: -1,
    title: '',
    rate: 0,
    diaryPrivate: false,
    contents: '',
    thumbnail: '',
    writeDate: [],
    saying: '',
    nickname: '',
    gatherName: '',
    visitDate: [],
    exhName: '',
    userExhId: -1,
    gatheringExhId: -1,
  },
  actions: {
    updateExhId: exhId => set(state => ({exhId: exhId})),
    updateMyDiaryInfo: myDiaryInfo =>
      set(state => ({myDiaryInfo: myDiaryInfo})),
  },
}));

export const useMyDiaryExhId = () => useMyDiary(state => state.exhId);
export const useMyDiaryInfo = () => useMyDiary(state => state.myDiaryInfo);
export const useMyDiaryActions = () => useMyDiary(state => state.actions);
// https://itchallenger.tistory.com/814
// https://www.nextree.io/zustand/
