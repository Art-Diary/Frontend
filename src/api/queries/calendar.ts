import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery} from 'react-query';
import {fetchCalendar} from '../calendar';

export const calendarQueryKeys = createQueryKeys('calendar', {
  fetchCalendar: (
    kind: string,
    gatherId: number | null,
    year: number,
    month: number,
  ) => ['fetchCalendar', {kind, gatherId, year, month}],
});

export const useFetchCalendar = (
  kind: string,
  gatherId: number | null,
  year: number,
  month: number,
) =>
  useQuery({
    queryKey: calendarQueryKeys.fetchCalendar(kind, gatherId, year, month)
      .queryKey,
    queryFn: () => fetchCalendar(kind, gatherId, year, month),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[CalendarScreen] error fetch Calendar');
    },
    onSuccess: () => {
      console.log('[CalendarScreen] success fetch Calendar');
    },
    select: (res: any) => res.data,
  });
