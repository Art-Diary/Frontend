import {ExhDetailInfo} from './dataTypes';

// types.ts
export type GatheringStackParamList = {
  GatheringInfo: undefined;
  GatheringDiaryList: {pageNum: number};
  GatheringDiaryBack: undefined;
  SearchAddVisitExhInGathering: undefined;
  NewVisitDateOfExhInGathering: undefined;
  AddNewMateInGathering: undefined;
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
  Main: undefined;
  // mydiary
  MyExhibitionSearch: undefined;
  MyDiaryRoutes: {
    screen: keyof MyDiaryStackParamList;
    params: MyDiaryStackParamList[keyof MyDiaryStackParamList];
  };
  AddMyVisitDateRoutes: undefined;
  ChooseVisitDate: undefined;
  AddSoloVisitDate: undefined;
  WriteMyDiaryRoutes: undefined;
  WriteMyDiaryContents: undefined;
  //setting
  SettingRoutes: {
    screen: keyof SettingStackParamList;
    params: SettingStackParamList[keyof SettingStackParamList];
  };
  RegisterNewExhScreen: {
    isAdmin: boolean;
  };
  CheckRegExh: {
    regExhId: number;
  };
  ConfirmRegExhScreen: {
    regExhId: number;
    forUpdate: boolean;
  };
  EditRegExhByUser: {
    regExhInfo: any;
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
  ExhAddForm: undefined;
  ExhDetailEdit: {
    exhDetailInfo: ExhDetailInfo;
  };
  //CalendarSearch: undefined;
  // login
  Login: undefined;
  InitProfile: undefined;
  UserInfo: undefined;
  // mate
  CreateGathering: undefined;
  AddNewMate: undefined;
  MateDiaryRoutes: undefined;
  MateDiaryList: undefined;
  MateDiaryBack: undefined;
  // gathering
  GatheringRoutes: {
    screen: keyof GatheringStackParamList;
    params: GatheringStackParamList[keyof GatheringStackParamList];
  };
};
