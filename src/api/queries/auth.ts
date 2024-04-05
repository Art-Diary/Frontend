import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  fetchUserInfo,
  updateAlarm1,
  updateAlarm2,
  updateAlarm3,
  updateUserInfo,
} from '../auth';
import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useUserActions} from '~/zustand/auth/auth';

const authQueryKeys = createQueryKeys('auth', {
  fetchUserInfo: () => ['fetchUserInfo'],
});

export const useUpdateAlarm1 = (alarm1: boolean) => {
  return useMutation({
    mutationFn: () => updateAlarm1(alarm1),
    onError: err => {
      console.log(err);
      console.log('[AlarmSettingScreen] error udpate Alarm1');
    },
    onSuccess: () => {
      console.log('[EditFavoriteScreen] success udpate Alarm1');
    },
  });
};

export const useUpdateAlarm2 = (alarm2: boolean) => {
  return useMutation({
    mutationFn: () => updateAlarm2(alarm2),
    onError: err => {
      console.log(err);
      console.log('[AlarmSettingScreen] error udpate Alarm2');
    },
    onSuccess: () => {
      console.log('[EditFavoriteScreen] success udpate Alarm2');
    },
  });
};

export const useUpdateAlarm3 = (alarm3: boolean) => {
  return useMutation({
    mutationFn: () => updateAlarm3(alarm3),
    onError: err => {
      console.log(err);
      console.log('[AlarmSettingScreen] error udpate Alarm3');
    },
    onSuccess: () => {
      console.log('[EditFavoriteScreen] success udpate Alarm3');
    },
  });
};

export const useFetchUserInfo = () =>
  useQuery({
    queryKey: authQueryKeys.fetchUserInfo().queryKey,
    queryFn: () => fetchUserInfo(),
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[FetchUserInfo] error fetch UserInfo');
    },
    onSuccess: () => {
      console.log('[FetchUserInfo] success fetch UserInfo');
    },
    select: (res: any) => res.data,
  });

export const useUpdateUserInfo = (info: FormData | null) => {
  const queryClient = useQueryClient();
  const {updateNickname, updateFavoriteArt, updateProfile} = useUserActions();

  return useMutation({
    mutationFn: () => updateUserInfo(info),
    onError: err => {
      console.log(err);
      console.log('[EditProfileScreen] error update UserInfo');
    },
    onSuccess: res => {
      const resData = res.data;
      updateNickname(resData.nickname);
      updateProfile(resData.profile);
      updateFavoriteArt(resData.favoriteArt);
      console.log('[EditProfileScreen] success fetch UserInfo');
    },
  });
};
