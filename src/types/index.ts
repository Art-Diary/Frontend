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
  color: string[];
}

export type ImageType = {
  // 첨부한 사진 타입
  base64: string;
  uri: string;
};
