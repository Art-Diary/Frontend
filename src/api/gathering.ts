import {client} from './client';

/** 모임 메이트 API */
export const fetchGatheringList = () => client.get(`/gatherings`);

export const fetchGatheringInfo = (gatherId: number) =>
  client.get(`/gatherings/${gatherId}`);

export const createGathering = (gatherName: string) =>
  client.post(`/gatherings`, {gatherName: gatherName});

export const fetchGatheringDiaryList = (gatherId: number, exhId: number) =>
  client.get(`/gatherings/${gatherId}/exhibitions/${exhId}`);

export const deleteGathering = (gatherId: number) =>
  client.delete(`/gatherings/${gatherId}`);
