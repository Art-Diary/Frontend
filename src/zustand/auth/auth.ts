import {create} from 'zustand';

type AuthInfo = {
  userId: number;
  nickname: string;
  email: string;
  profile: string | undefined;
  favoriteArt: string;
  favoriteExhAlarm: boolean;
  visitSoloAlarm: boolean;
  visitGatheringAlarm: boolean;
  newGatheringAlarm: boolean;
  newDateGatheringAlarm: boolean;
  providerType: string;
  role: string;
};

interface AuthState {
  authInfo: AuthInfo;
  actions: {
    updateAuthInfo: (authInfo: AuthInfo) => void;
    updateFavoriteExhAlarm: (alarm: boolean) => void;
    updateVisitSoloAlarm: (alarm: boolean) => void;
    updateVisitGatheringAlarm: (alarm: boolean) => void;
    updateNewGatheringAlarm: (alarm: boolean) => void;
    updateNewDateGatheringAlarm: (alarm: boolean) => void;
  };
}

const useAuth = create<AuthState>(set => ({
  authInfo: {
    userId: -1,
    nickname: '',
    email: '',
    profile: undefined,
    favoriteArt: '',
    favoriteExhAlarm: false,
    visitSoloAlarm: false,
    visitGatheringAlarm: false,
    newGatheringAlarm: false,
    newDateGatheringAlarm: false,
    providerType: '',
    role: 'USER',
  },
  actions: {
    updateAuthInfo: authInfo =>
      set(state => ({
        authInfo: {
          userId: authInfo.userId,
          nickname: authInfo.nickname,
          email: authInfo.email,
          profile: authInfo.profile,
          favoriteArt: authInfo.favoriteArt,
          favoriteExhAlarm: authInfo.favoriteExhAlarm,
          visitSoloAlarm: authInfo.visitSoloAlarm,
          visitGatheringAlarm: authInfo.visitGatheringAlarm,
          newGatheringAlarm: authInfo.newGatheringAlarm,
          newDateGatheringAlarm: authInfo.newDateGatheringAlarm,
          providerType: authInfo.providerType,
          role: authInfo.role,
        },
      })),
    updateFavoriteExhAlarm: alarm =>
      set(state => ({
        authInfo: {...state.authInfo, favoriteExhAlarm: alarm},
      })),
    updateVisitSoloAlarm: alarm =>
      set(state => ({
        authInfo: {...state.authInfo, visitSoloAlarm: alarm},
      })),
    updateVisitGatheringAlarm: alarm =>
      set(state => ({
        authInfo: {...state.authInfo, visitGatheringAlarm: alarm},
      })),
    updateNewGatheringAlarm: alarm =>
      set(state => ({
        authInfo: {...state.authInfo, newGatheringAlarm: alarm},
      })),
    updateNewDateGatheringAlarm: alarm =>
      set(state => ({
        authInfo: {...state.authInfo, newDateGatheringAlarm: alarm},
      })),
  },
}));

export const useUserInfo = () => useAuth(state => ({authInfo: state.authInfo}));

export const useUserActions = () => useAuth(state => state.actions);
