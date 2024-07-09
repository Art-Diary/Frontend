import {UseMutationResult, useMutation, useQuery} from 'react-query';
import {
  LoginUserParams,
  deleteUser,
  fetchUserInfo,
  loginUser,
  separateSocialLogin,
  uniteSocialLogin,
  updateAlarm1,
  updateAlarm2,
  updateAlarm3,
  updateAlarmToken,
  updateUserInfo,
  verifyNickname,
} from '../auth';
import {createQueryKeys} from '@lukemorales/query-key-factory';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  return useMutation({
    mutationFn: () => updateUserInfo(info),
    onError: err => {
      console.log(err);
      console.log('[EditProfileScreen] error update UserInfo');
    },
    onSuccess: res => {
      console.log('[EditProfileScreen] success update UserInfo');
    },
  });
};

export const useVerifyNickname = (
  nickname: string,
): UseMutationResult<unknown, any, void, unknown> => {
  return useMutation<unknown, any, void, unknown>({
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

export const useLoginUser = (): UseMutationResult<
  any,
  any,
  LoginUserParams,
  unknown
> => {
  return useMutation<any, any, LoginUserParams, unknown>({
    mutationFn: (loginInfo: LoginUserParams) => loginUser(loginInfo),
    onError: err => {
      console.log(err);
      console.log('[Login] error Login');
      // console.log('[Login] error Login +', providerType);
    },
    onSuccess: async (res: any) => {
      const resData = res.data;
      // TODO
      try {
        await AsyncStorage.setItem('userId', JSON.stringify(resData.userId));
        await AsyncStorage.setItem(
          'initInfo',
          JSON.stringify(resData.initInfo),
        );
        console.log('[Login] success Login');
        // console.log('[Login] success Login +', providerType);
      } catch (error) {
        console.log('[AsyncStorage] Error storing userId', error);
      }
      return resData;
    },
  });
};

export const useUniteSocialLogin = () => {
  return useMutation({
    mutationFn: (loginInfo: LoginUserParams) => uniteSocialLogin(loginInfo),
    onError: err => {
      console.log(err);
      console.log('[Unite Login] error Login');
    },
    onSuccess: async (res: any) => {
      const resData = res.data;
      // TODO
      try {
        await AsyncStorage.setItem('userId', JSON.stringify(resData.userId));
        await AsyncStorage.setItem(
          'initInfo',
          JSON.stringify(resData.initInfo),
        );
        console.log('[Unite Login] success Login');
        // console.log('[Login] success Login +', providerType);
      } catch (error) {
        console.log('[AsyncStorage] Error storing userId', error);
      }
      return resData;
    },
  });
};

export const useSeparateSocialLogin = () => {
  return useMutation({
    mutationFn: (loginInfo: LoginUserParams) => separateSocialLogin(loginInfo),
    onError: err => {
      console.log(err);
      console.log('[Separate Login] error Login');
    },
    onSuccess: async (res: any) => {
      const resData = res.data;
      // TODO
      try {
        await AsyncStorage.setItem('userId', JSON.stringify(resData.userId));
        await AsyncStorage.setItem(
          'initInfo',
          JSON.stringify(resData.initInfo),
        );
        console.log('[Separate Login] success Login');
        // console.log('[Login] success Login +', providerType);
      } catch (error) {
        console.log('[AsyncStorage] Error storing userId', error);
      }
      return resData;
    },
  });
};

export const useUpdateAlarmToken = () => {
  return useMutation({
    mutationFn: (alarmToken: string | null) => updateAlarmToken(alarmToken),
    onError: err => {
      console.log(err);
      console.log('[AlarmToken] error udpate AlarmToken');
    },
    onSuccess: () => {
      console.log('[AlarmToken] success udpate AlarmToken');
    },
  });
};
