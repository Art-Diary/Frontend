import {create} from 'zustand';

type enterGatheringType = {
  gatherId: number;
  gatherName: string;
};

interface EnterGatheringState {
  enterGatheringInfo: enterGatheringType;
  actions: {
    updateEnterGatheringInfo: (enterGatheringInfo: enterGatheringType) => void;
  };
}

const useEnterGathering = create<EnterGatheringState>(set => ({
  enterGatheringInfo: {
    gatherId: -1,
    gatherName: '',
  },
  actions: {
    updateEnterGatheringInfo: (enterGatheringInfo: enterGatheringType) =>
      set(state => ({enterGatheringInfo: enterGatheringInfo})),
  },
}));

export const useEnterGatheringInfo = () =>
  useEnterGathering(state => ({
    enterGatheringInfo: state.enterGatheringInfo,
  }));

export const useEnterGatheringActions = () =>
  useEnterGathering(state => state.actions);
