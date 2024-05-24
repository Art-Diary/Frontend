import {create} from 'zustand';

type QueryMateDiary = {
  mateId: number;
  exhId: number;
  contents?: string;
};

interface QueryMateDiaryState {
  queryInfo: QueryMateDiary;
  actions: {
    updateQueryInfo: (queryInfo: QueryMateDiary) => void;
  };
}

const useQueryMateDiary = create<QueryMateDiaryState>(set => ({
  queryInfo: {
    mateId: -1,
    exhId: -1,
    contents: '',
  },
  actions: {
    updateQueryInfo: (queryInfo: QueryMateDiary) =>
      set(state => ({queryInfo: queryInfo})),
  },
}));

export const useQueryMateDiaryInfo = () =>
  useQueryMateDiary(state => ({mateInfo: state.queryInfo}));

export const useQueryMateDiaryActions = () =>
  useQueryMateDiary(state => state.actions);
