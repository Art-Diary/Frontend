import {create} from 'zustand';

type AuthInfo = {
  userId: number;
  nickname: string;
  email: string;
  profile: string | undefined;
  favoriteArt: string;
  alarm1: boolean;
  alarm2: boolean;
  alarm3: boolean;
};

interface AuthState {
  authInfo: AuthInfo;
  actions: {
    updateAuthInfo: (authInfo: AuthInfo) => void;
    updateAlarm1: (alarm1: boolean) => void;
    updateAlarm2: (alarm1: boolean) => void;
    updateAlarm3: (alarm1: boolean) => void;
  };
}

const useAuth = create<AuthState>(set => ({
  authInfo: {
    userId: -1,
    nickname: '',
    email: '',
    profile: undefined,
    favoriteArt: '',
    alarm1: false,
    alarm2: false,
    alarm3: false,
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
          alarm1: authInfo.alarm1,
          alarm2: authInfo.alarm2,
          alarm3: authInfo.alarm3,
        },
      })),
    updateAlarm1: alarm1 =>
      set(state => ({
        authInfo: {
          userId: state.authInfo.userId,
          nickname: state.authInfo.nickname,
          email: state.authInfo.email,
          profile: state.authInfo.profile,
          favoriteArt: state.authInfo.favoriteArt,
          alarm1: alarm1,
          alarm2: state.authInfo.alarm2,
          alarm3: state.authInfo.alarm3,
        },
      })),
    updateAlarm2: alarm2 =>
      set(state => ({
        authInfo: {
          userId: state.authInfo.userId,
          nickname: state.authInfo.nickname,
          email: state.authInfo.email,
          profile: state.authInfo.profile,
          favoriteArt: state.authInfo.favoriteArt,
          alarm1: state.authInfo.alarm1,
          alarm2: alarm2,
          alarm3: state.authInfo.alarm3,
        },
      })),
    updateAlarm3: alarm3 =>
      set(state => ({
        authInfo: {
          userId: state.authInfo.userId,
          nickname: state.authInfo.nickname,
          email: state.authInfo.email,
          profile: state.authInfo.profile,
          favoriteArt: state.authInfo.favoriteArt,
          alarm1: state.authInfo.alarm1,
          alarm2: state.authInfo.alarm2,
          alarm3: alarm3,
        },
      })),
  },
}));

export const useUserInfo = () => useAuth(state => ({authInfo: state.authInfo}));

export const useUserActions = () => useAuth(state => state.actions);
