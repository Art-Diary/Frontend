import {client} from './client';

/** 회원(사용자) API */
export const updateAlarm1 = (alarm1: boolean) =>
  client.patch(`/users/alarm1`, {alarm: alarm1});

export const updateAlarm2 = (alarm2: boolean) =>
  client.patch(`/users/alarm2`, {alarm: alarm2});

export const updateAlarm3 = (alarm3: boolean) =>
  client.patch(`/users/alarm3`, {alarm: alarm3});

export const fetchUserInfo = () => client.get(`/users`);

export const updateUserInfo = (info: FormData | null) =>
  client.patch(`/users`, info, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

export const verifyNickname = (nickname: string) =>
  client.post(`/users/verify`, {nickname: nickname});

export const deleteUser = (reason: string) =>
  client.post(`/users/leave`, {reason: reason});

export const loginUser = async (loginInfo: LoginUserParams) =>
  client.post(`/users`, {...loginInfo});

export const uniteSocialLogin = async (loginInfo: LoginUserParams) =>
  client.post(`/users/unite`, {...loginInfo});

export const separateSocialLogin = async (loginInfo: LoginUserParams) =>
  client.post(`/users/separate`, {...loginInfo});

export const updateAlarmToken = (alarmToken: string | null) =>
  client.patch(`/users/alarm-token`, {alarmToken: alarmToken});

export type LoginUserParams = {
  email: string;
  providerType: string;
  providerId: string;
  alarmToken: string | null;
};

// TODO 삭제
export const loginUserTest = async (userId: number) =>
  client.post(`/users/test`, {userId});
