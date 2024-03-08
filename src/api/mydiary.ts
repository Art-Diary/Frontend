import {QueryFunction, QueryKey} from 'react-query';
import {client} from './client';

/** 내 기록 API */
const fetchMyExhList: QueryFunction<ExhList[], QueryKey> = async () =>
  client.get(`/myexhs`);

export interface ExhList {
  exhId: number;
  exhName: string;
  poster: string;
  rate: number;
}

export {fetchMyExhList};
