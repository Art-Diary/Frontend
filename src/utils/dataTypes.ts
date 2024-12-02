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

export type ExhDetailInfo = {
  exhId: number;
  exhName: string;
  gallery: string;
  exhPeriodStart: string;
  exhPeriodEnd: string;
  painter?: string;
  fee: number;
  intro?: string;
  url?: string;
  poster: string;
  art?: string;
};
