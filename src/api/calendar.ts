import {QueryFunction, QueryKey} from 'react-query';
import {client} from './client';

/** 캘린더 API */
export const fetchCalendar = (
  kind: string,
  gatherId: number | null,
  year: number,
  month: number,
) =>
  client.get(`/calendars`, {
    params: {kind: kind, gatherId: gatherId, year: year, month: month},
  });
