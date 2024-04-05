import {create} from 'zustand';

interface AuthState {
  userId: number;
  nickname: string;
  email: string;
  profile: string;
  favoriteArt: string;
  alarm1: boolean;
  alarm2: boolean;
  alarm3: boolean;
  actions: {
    updateUserId: (userId: number) => void;
    updateNickname: (nickname: string) => void;
    updateEmail: (email: string) => void;
    updateProfile: (profile: string) => void;
    updateFavoriteArt: (favoriteArt: string) => void;
    updateAlarm1: (alarm1: boolean) => void;
    updateAlarm2: (alarm2: boolean) => void;
    updateAlarm3: (alarm3: boolean) => void;
  };
}

const useAuth = create<AuthState>(set => ({
  userId: -1,
  nickname: '',
  email: '',
  profile: '',
  favoriteArt: '',
  alarm1: false,
  alarm2: false,
  alarm3: false,
  actions: {
    updateUserId: userId => set(state => ({userId: userId})),
    updateNickname: nickname => set(state => ({nickname: nickname})),
    updateEmail: email => set(state => ({email: email})),
    updateProfile: profile => set(state => ({profile: profile})),
    updateFavoriteArt: favoriteArt =>
      set(state => ({favoriteArt: favoriteArt})),
    updateAlarm1: (alarm1: boolean) => set(state => ({alarm1: alarm1})),
    updateAlarm2: (alarm2: boolean) => set(state => ({alarm2: alarm2})),
    updateAlarm3: (alarm3: boolean) => set(state => ({alarm3: alarm3})),
  },
}));

export const useUserInfo = () =>
  useAuth(state => ({
    userId: state.userId,
    nickname: state.nickname,
    email: state.email,
    profile: state.profile,
    favoriteArt: state.favoriteArt,
    alarm1: state.alarm1,
    alarm2: state.alarm2,
    alarm3: state.alarm3,
  }));

export const useUserActions = () => useAuth(state => state.actions);
