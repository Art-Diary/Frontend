// types.ts
export type GatheringStackParamList = {
  GatheringInfo: undefined;
  GatheringDiaryList: undefined;
  GatheringDiaryBack: undefined;
  SearchAddVisitExhInGathering: undefined;
  NewVisitDateOfExhInGathering: undefined;
  // 다른 스크린이 있다면 여기에 추가합니다.
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
  FavoriteRoutes: undefined;
  FavoriteList: undefined;
  EditFavorite: undefined;
  AlarmSetting: undefined;
  EditProfile: undefined;
  LeaveArtDiary: undefined;
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
