import {ExhDetailInfo, QnaInfo, RegExhDetailInfo} from '~/types';

// types.ts
export type GatheringStackParamList = {
  GatheringInfo: {gatherId: number};
  GatheringDiaryList: {pageNum: number};
  GatheringDiaryBack: undefined;
  CreateExhVisitDateInGathering: {gatherId: number};
};

export type SettingStackParamList = {
  EditProfile: undefined;
  FavoriteList: undefined;
  EditFavorite: undefined;
  AlarmSetting: undefined;
  LeaveArtDiary: undefined;
};

export type MyDiaryStackParamList = {
  MyDiaryList: {pageNum: number};
  MyDiaryBack: undefined;
};

export type CalendarDiaryStackParamList = {
  CalendarDiaryList: {pageNum: number};
  CalendarDiaryBack: undefined;
};

export type RootStackParamList = {
  Main: {
    screen: 'Calendar' | 'Setting' | 'Diary' | 'Exhibition' | 'Mate';
    params?: {modalOpen?: boolean; fromPushAlarm?: boolean; visitDate?: string};
  };
  // mydiary
  CreateExhVisitedDate: {
    exhId?: number;
    exhVisitId?: number;
    isInGathering?: boolean;
  };
  WriteMyDiaryRoutes: undefined;
  WriteMyDiaryContents: undefined;
  MyDiaryRoutes: {
    screen: keyof MyDiaryStackParamList;
    params: MyDiaryStackParamList[keyof MyDiaryStackParamList];
  };
  //setting
  SettingRoutes: {
    screen: keyof SettingStackParamList;
    params: SettingStackParamList[keyof SettingStackParamList];
  };
  RegExhList: {
    isAdmin: boolean;
  };
  CheckRegExhByUser: {
    regExhId: number;
  };
  ConfirmRegExhByAdmin: {
    regExhId: number;
  };
  EditRegExh: {
    regExhInfo: RegExhDetailInfo;
    role: 'ADMIN' | 'USER_WAIT';
  };
  QnaList: {
    isAdmin: boolean;
  };
  CreateQna: undefined;
  QnaDetail: {
    isAdmin: boolean;
    qnaId: number;
  };
  UpdateQna: {
    qnaInfo: QnaInfo;
  };
  AnswerQna: {
    qnaInfo: QnaInfo;
  };
  // calendar
  CalendarDiaryRoutes: {
    screen: keyof CalendarDiaryStackParamList;
    params: CalendarDiaryStackParamList[keyof CalendarDiaryStackParamList];
  };
  // exhibition
  ExhibitionSearch: undefined;
  ExhDetailInfo: {
    exhId: number;
    modalOpen?: boolean;
  };
  ExhToDiary: {
    diary: any;
  };
  ExhToDiaryBack: undefined;
  ExhToCal: {
    exhId: number;
  };
  ExhToMoreReview: {
    exhId: number;
  };
  RegisterNewExh: undefined;
  ExhDetailEdit: {
    exhDetailInfo: ExhDetailInfo;
  };
  //CalendarSearch: undefined;
  // login
  Login: undefined;
  InitProfile: undefined;
  // mate
  MateDiaryRoutes: undefined;
  MateDiaryList: undefined;
  MateDiaryBack: undefined;
  // gathering
  GatheringRoutes: {
    screen: keyof GatheringStackParamList;
    params: GatheringStackParamList[keyof GatheringStackParamList];
  };
};
