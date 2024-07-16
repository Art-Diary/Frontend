export type MyVisitedDateType = {
  index: number;
  exhId: number;
  gatherId: number | null; // 개인일 경우엔 null
  gatherName: string | null; // 개인일 경우엔 null
  dateInfoList: VisitedDateInfo[];
};

export type VisitedDateInfo = {
  exhVisitId: number;
  visitDate: string;
};
