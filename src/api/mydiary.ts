import {QueryFunction, QueryKey} from 'react-query';
import {client} from './client';

/** 내 기록 API */

export const fetchMyExhList: QueryFunction<ExhList[], QueryKey> = async () =>
  client.get(`/myexhs`);

/** 내 기록 인터페이스 */

export interface ExhList {
  exhId: number;
  exhName: string;
  poster: string;
  rate: number;
}
