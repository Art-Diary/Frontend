import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mydiaryQueryKeys} from './mydiary';
import {mateQueryKeys} from './mate';

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

export const useLoginUser = (
  email: string,
  providerType: string,
  providerId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => loginUser(email, providerType, providerId),
    onError: err => {
      console.log(err);
      console.log('[Login] error Login +', providerType);
    },
    onSuccess: async (res: any) => {
      const resData = res.data;
      // TODO
      try {
        await AsyncStorage.setItem('userId', JSON.stringify(resData.userId));
        console.log('[Login] success Login +', providerType);
      } catch (error) {
        console.log('[AsyncStorage] Error storing userId', error);
      }
      // 초기 로딩
      queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyExhList());
      queryClient.invalidateQueries(mateQueryKeys.fetchExhMateList());
      return resData;
    },
  });
};
