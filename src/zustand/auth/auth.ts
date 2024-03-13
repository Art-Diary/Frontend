import {create} from 'zustand';

interface AuthState {
  userId: number;
  nickname: string;
  email: string;
  profile: string;
  favoriteArt: string;
  actions: {
    updateUserId: (userId: number) => void;
    updateNickname: (nickname: string) => void;
    updateemail: (email: string) => void;
    updateprofile: (profile: string) => void;
    updatefavoriteArt: (favoriteArt: string) => void;
  };
}

const useAuth = create<AuthState>(set => ({
  userId: -1,
  nickname: '',
  email: '',
  profile: '',
  favoriteArt: '',
  actions: {
    updateUserId: userId => set(state => ({userId: userId})),
    updateNickname: nickname => set(state => ({nickname: nickname})),
    updateemail: email => set(state => ({email: email})),
    updateprofile: profile => set(state => ({profile: profile})),
    updatefavoriteArt: favoriteArt =>
      set(state => ({favoriteArt: favoriteArt})),
  },
}));

export const useUserId = () => useAuth(state => state.userId);
export const useNickname = () => useAuth(state => state.nickname);
export const useEmail = () => useAuth(state => state.email);
export const useProfile = () => useAuth(state => state.profile);
export const useFavoriteArt = () => useAuth(state => state.favoriteArt);
