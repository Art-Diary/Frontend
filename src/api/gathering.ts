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

export const addNewDateOfExhGathering = (
  gatherId: number,
  exhId: number,
  visitDate: string,
) =>
  client.post(`/gatherings/${gatherId}/exhibitions`, {
    exhId: exhId,
    visitDate: visitDate,
  });

export const addNewMateInGathering = (gatherId: number, mateId: number) =>
  client.post(`/gatherings/${gatherId}`, {userId: mateId});

export const fetchSearchNewMateInGathering = (
  gatherId: number,
  nickname: string,
) => client.get(`/gatherings/${gatherId}/search`, {params: {nickname}});
