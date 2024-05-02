import {client} from './client';

/** 전시 메이트 API */
export const fetchExhMateList = () => client.get(`/mates`);
