import {create} from 'zustand';
// [NEW] 1. exhibition 추가 2. exhibition 탭에 들어갈 때마다 tab 없데이트

// [NEW] 기록 목록 으로 넘어가는 부분에 이런 형식으로 추가
// const pressExh = (item: ExhInfo) => {
//   // 기록으로 넘어가기
//   updateVisitedExhId(item.exhId);
//   updateGatheringListParams({gatherId: gatherId, exhId: item.exhId});
//   navigation.navigate('GatheringRoutes', {
//     screen: 'GatheringDiaryList',
//     params: undefined,
//   });
// };
type TabName = 'mydiary' | 'calendar' | 'mate' | 'gathering';

/** 캘린더와 내 기록 구분 */
interface TabIdentifierState {
  tab: TabName;
  actions: {
    updateTab: (tab: TabName) => void;
  };
}

const TabIdentifier = create<TabIdentifierState>(set => ({
  tab: 'mydiary',
  actions: {
    updateTab: (tab: TabName) => set(state => ({tab: tab})),
  },
}));

export const useTabIdentifierInfo = () =>
  TabIdentifier(state => ({
    tab: state.tab,
  }));
export const useTabIdentifierActions = () =>
  TabIdentifier(state => state.actions);
