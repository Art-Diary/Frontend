import {create} from 'zustand';

type GatheringListParams = {
  gatherId: number;
  exhId: number;
};

interface GatheringListParamsState {
  params: GatheringListParams;
  actions: {
    updateGatheringListParams: (params: GatheringListParams) => void;
  };
}

const useGatheringListParams = create<GatheringListParamsState>(set => ({
  params: {
    gatherId: -1,
    exhId: -1,
  },
  actions: {
    updateGatheringListParams: (params: GatheringListParams) =>
      set(state => ({params: params})),
  },
}));

export const useGatheringListParamsInfo = () =>
  useGatheringListParams(state => ({params: state.params}));

export const useGatheringListParamsActions = () =>
  useGatheringListParams(state => state.actions);
