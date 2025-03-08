import {GatheringColorInfo} from '~/types';

export const calendarColor = [
  '#7EB5DF',
  '#E38E49',
  '#85A98F',
  '#D7C3F1',
  '#FFC145',
  '#B9A4FF',
  '#D4A2C4',
  '#FFB3BA',
  '#F1C6D3',
  '#7B75EC',
  '#E9A0A0',
  '#6A0572',
  '#E4B7B2',
  '#FF5D8F',
  '#392F5A',
  '#7158F2',
  '#F7B7A3',
  '#9F7CC3',
  '#C0B0FF',
  '#6A5BFF',
  '#D4A5A5',
  '#9B59B6',
  '#F6A5C0',
  '#B93D3D',
  '#FF677D',
  '#A88CFF',
  '#FFADAD',
  '#FF6F61',
  '#ABA7FF',
  '#F1C8B9',
  '#D3C0EB',
];

export const findGatherColor = (
  gatherColorList: GatheringColorInfo[],
  gatherId: number,
): string => {
  if (gatherId === null) {
    return calendarColor[0];
  }
  for (let i = 0; i < gatherColorList.length; i++) {
    if (gatherColorList[i].gatherId === gatherId) {
      return gatherColorList[i].color;
    }
  }
  return 'black';
};
