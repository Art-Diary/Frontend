import {GatheringColorInfo} from '~/types';

export const calendarColor = [
  '#FF6F61',
  '#FBBC05',
  '#4285F4',
  '#00A86B',
  '#8806CE',
  '#DC143C',
  '#FF4500',
  '#FFD700',
  '#32CD32',
  '#3CB371',
  '#40E0D0',
  '#00BFFF',
  '#1E90FF',
  '#6495ED',
  '#7B68EE',
  '#8A2BE2',
  '#9932CC',
  '#FF00FF',
  '#FF1493',
  '#FF69B4',
  '#FF6347',
  '#F4A460',
  '#CD853F',
  '#DAA520',
  '#708090',
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
