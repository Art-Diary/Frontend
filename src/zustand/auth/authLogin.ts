import {create} from 'zustand';

interface AuthLoginState {
  email: string;
  providerType: string;
  providerId: string;
  actions: {
    updateEmail: (email: string) => void;
    updateProviderType: (providerType: string) => void;
    updateProviderId: (providerId: string) => void;
  };
}

const useAuthLogin = create<AuthLoginState>(set => ({
  email: '',
  providerType: '',
  providerId: '',
  actions: {
    updateEmail: email => set(state => ({email: email})),
    updateProviderType: providerType =>
      set(state => ({providerType: providerType})),
    updateProviderId: providerId => set(state => ({providerId: providerId})),
  },
}));

export const useUserLoginInfo = () =>
  useAuthLogin(state => ({
    email: state.email,
    providerType: state.providerType,
    providerId: state.providerId,
  }));

export const useUserLoginActions = () => useAuthLogin(state => state.actions);
