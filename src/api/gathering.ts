import {client} from './client';

/** 모임 메이트 API */
export const fetchGatheringList = () => client.get(`/gatherings`);
