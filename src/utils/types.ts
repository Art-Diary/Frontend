// types.ts
export type GatheringStackParamList = {
  GatheringInfo: undefined;
  GatheringDiaryList: undefined;
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

export type RootStackParamList = {
  Main: undefined;
  // mydiary
  MyExhibitionSearch: undefined;
  MyDiaryRoutes: undefined;
  MyDiaryBack: undefined;
  MyDiaryList: undefined;
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
  // calendar
  CalendarDiaryRoutes: undefined;
  CalendarDiaryBack: undefined;
  ExhibitionSearch: undefined;
  ExhDetailInfo: {
    exhId: number;
  };
  ExhToDiary: {
    diaryId: number;
  };
  ExhToCal: {
    exhId: number;
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
