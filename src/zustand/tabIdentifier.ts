import {create} from 'zustand';

type TabName =
  | 'mydiary'
  | 'calendar'
  | 'mate'
  | 'gathering'
  | 'exhibition'
  | 'exhibitionMoreReview'
  | 'setting';

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
