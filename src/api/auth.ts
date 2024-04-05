import {client} from './client';

/** 회원(사용자) API */
export const updateAlarm1 = (alarm1: boolean) =>
  client.patch(`/users/alarm1`, {alarm: alarm1});

export const updateAlarm2 = (alarm2: boolean) =>
  client.patch(`/users/alarm2`, {alarm: alarm2});

export const updateAlarm3 = (alarm3: boolean) =>
  client.patch(`/users/alarm3`, {alarm: alarm3});
