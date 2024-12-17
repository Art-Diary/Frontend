import {client} from './client';

/** 회원(사용자) API */
export const updateFavoriteExhAlarm = (alarm: boolean) =>
  client.patch(`/users/favorite-exh-alarm`, {alarm});

export const updateVisitSoloAlarm = (alarm: boolean) =>
  client.patch(`/users/visit-solo-alarm`, {alarm});

export const updateVisitGatheringAlarm = (alarm: boolean) =>
  client.patch(`/users/visit-gathering-alarm`, {alarm});

export const updateNewGatheringAlarm = (alarm: boolean) =>
  client.patch(`/users/new-gathering-alarm`, {alarm});

export const updateNewDateGatheringAlarm = (alarm: boolean) =>
  client.patch(`/users/new-date-gathering-alarm`, {alarm});

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
