import {useMutation, useQuery} from 'react-query';
import {
  deleteUser,
  fetchUserInfo,
  loginUser,
  updateAlarm1,
  updateAlarm2,
  updateAlarm3,
  updateUserInfo,
  verifyNickname,
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
      console.log('[EditProfileScreen] success update UserInfo');
    },
  });
};

export const useVerifyNickname = (nickname: string) => {
  return useMutation({
    mutationFn: () => verifyNickname(nickname),
    onError: err => {
      console.log(err);
      console.log('[EditProfileScreen] error verify VerifyNickname');
    },
    onSuccess: res => {
      console.log('[EditProfileScreen] success verify VerifyNickname');
    },
  });
};

export const useDeleteUser = (reason: string) => {
  return useMutation({
    mutationFn: () => deleteUser(reason),
    onError: err => {
      console.log(err);
      console.log('[LeaveScreen] error delete User');
    },
    onSuccess: res => {
      console.log('[LeaveScreen] success delete User');
    },
  });
};

export const useLoginUser = (
  email: string,
  nickname: string,
  profile: string,
  providerType: string,
  providerId: string,
) => {
  const {
    updateUserId,
    updateNickname,
    updateEmail,
    updateProfile,
    updateFavoriteArt,
    updateAlarm1,
    updateAlarm2,
    updateAlarm3,
  } = useUserActions();
  return useMutation({
    mutationFn: () =>
      loginUser(email, nickname, profile, providerType, providerId),
    onError: err => {
      console.log(err);
      console.log('[Login] error Login +', providerType);
    },
    onSuccess: (res: any) => {
      // 사용자 정보 저장
      // 현재는 지정된 사용자로 사용 중이기 때문에 주석 처리
      const resData = res.data;

      // updateUserId(resData.userId);
      // updateNickname(resData.nickname);
      // updateEmail(resData.email);
      // updateProfile(resData.profile);
      // updateFavoriteArt(resData.favoriteArt);
      // updateAlarm1(resData.alarm1);
      // updateAlarm2(resData.alarm2);
      // updateAlarm3(resData.Alarm3);
      // AsyncStorage.setItem('userId', resData.userId);
      console.log('[Login] success Login +', providerType);
    },
  });
};
