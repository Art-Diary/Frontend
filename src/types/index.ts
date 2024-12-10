export interface VisitedExh {
  exhId: number;
  exhName: string;
  poster: string;
  rate: number;
}

export interface ExhInfoForList {
  exhId: number;
  exhName: string;
  gallery: string;
  exhPeriodStart: string;
  exhPeriodEnd: string;
  poster: string;
  favoriteExh?: boolean;
  rate?: number;
}

export interface ExhDetailInfo {
  exhId: number;
  exhName: string;
  gallery: string;
  exhPeriodStart: string;
  exhPeriodEnd: string;
  poster: string;
  favoriteExh: boolean;
  painter: string;
  fee: number;
  intro: string;
  url: string;
  art: string;
}

export interface MarkedType {
  date: string;
  color: string[]; // 모두 일때 한 날짜에 여러 모임이 갔을 경우 표시
}

export type ImageType = {
  // 첨부한 사진 타입
  base64: string;
  uri: string;
};

export type GatheringInfo = {
  gatherId: number;
  gatherName: string;
};

export type GatheringColorInfo = {
  gatherId: number;
  color: string;
};

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

export type UserDetailInfo = {
  userId: number;
  nickname: string;
  favoriteArt: string;
  profile: string;
};
