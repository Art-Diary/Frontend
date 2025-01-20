import {UseMutationResult, useMutation, useQuery} from 'react-query';
import {
  LoginUserParams,
  deleteUser,
  fetchUserInfo,
  loginUser,
  // loginUserTest,
  separateSocialLogin,
  uniteSocialLogin,
  updateAlarmToken,
  updateFavoriteExhAlarm,
  updateNewDateGatheringAlarm,
  updateNewGatheringAlarm,
  updateUserInfo,
  updateVisitGatheringAlarm,
  updateVisitSoloAlarm,
  verifyNickname,
} from '../auth';
import {createQueryKeys} from '@lukemorales/query-key-factory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const authQueryKeys = createQueryKeys('auth', {
  fetchUserInfo: () => ['fetchUserInfo'],
});

export const useUpdateFavoriteExhAlarm = (): UseMutationResult<
  any,
  any,
  boolean,
  unknown
> => {
  return useMutation<any, any, boolean, unknown>({
    mutationFn: (alarm: boolean) => updateFavoriteExhAlarm(alarm),
    onError: err => {
      console.log(err);
      console.log('[UpdateFavoriteExhAlarm] error update FavoriteExhAlarm');
    },
    onSuccess: () => {
      console.log('[UpdateFavoriteExhAlarm] success update FavoriteExhAlarm');
    },
  });
};

export const useUpdateVisitSoloAlarm = (): UseMutationResult<
  any,
  any,
  boolean,
  unknown
> => {
  return useMutation<any, any, boolean, unknown>({
    mutationFn: (alarm: boolean) => updateVisitSoloAlarm(alarm),
    onError: err => {
      console.log(err);
      console.log('[UpdateVisitSoloAlarm] error update UpdateVisitSoloAlarm');
    },
    onSuccess: () => {
      console.log('[UpdateVisitSoloAlarm] success update UpdateVisitSoloAlarm');
    },
  });
};

export const useUpdateVisitGatheringAlarm = (): UseMutationResult<
  any,
  any,
  boolean,
  unknown
> => {
  return useMutation<any, any, boolean, unknown>({
    mutationFn: (alarm: boolean) => updateVisitGatheringAlarm(alarm),
    onError: err => {
      console.log(err);
      console.log(
        '[UpdateVisitGatheringAlarm] error update UpdateVisitGatheringAlarm',
      );
    },
    onSuccess: () => {
      console.log(
        '[UpdateVisitGatheringAlarm] success update UpdateVisitGatheringAlarm',
      );
    },
  });
};

export const useUpdateNewGatheringAlarm = (): UseMutationResult<
  any,
  any,
  boolean,
  unknown
> => {
  return useMutation<any, any, boolean, unknown>({
    mutationFn: (alarm: boolean) => updateNewGatheringAlarm(alarm),
    onError: err => {
      console.log(err);
      console.log(
        '[UpdateNewGatheringAlarm] error update UpdateNewGatheringAlarm',
      );
    },
    onSuccess: () => {
      console.log(
        '[UpdateNewGatheringAlarm] success update UpdateNewGatheringAlarm',
      );
    },
  });
};

export const useUpdateNewDateGatheringAlarm = (): UseMutationResult<
  any,
  any,
  boolean,
  unknown
> => {
  return useMutation<any, any, boolean, unknown>({
    mutationFn: (alarm: boolean) => updateNewDateGatheringAlarm(alarm),
    onError: err => {
      console.log(err);
      console.log(
        '[UpdateNewDateGatheringAlarm] error update UpdateNewDateGatheringAlarm',
      );
    },
    onSuccess: () => {
      console.log(
        '[UpdateNewDateGatheringAlarm] success update UpdateNewDateGatheringAlarm',
      );
    },
  });
};

export const useFetchUserInfo = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
    };
    getToken();
  }, []);

  return useQuery({
    queryKey: authQueryKeys.fetchUserInfo().queryKey,
    queryFn: () => fetchUserInfo(),
    enabled: !!accessToken,
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
};

export const useUpdateUserInfo = (): UseMutationResult<
  any,
  any,
  FormData,
  unknown
> => {
  return useMutation<any, any, FormData, unknown>({
    mutationFn: (info: FormData | null) => updateUserInfo(info),
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
    },
    onSuccess: async (res: any) => {
      const resData = res.data;
      try {
        await AsyncStorage.setItem('accessToken', resData.accessToken);
        await AsyncStorage.setItem(
          'initInfo',
          JSON.stringify(resData.initInfo),
        );
        console.log('[Login] success Login');
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
      try {
        await AsyncStorage.setItem('accessToken', resData.accessToken);
        await AsyncStorage.setItem(
          'initInfo',
          JSON.stringify(resData.initInfo),
        );
        console.log('[Unite Login] success Login');
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
      try {
        await AsyncStorage.setItem('accessToken', resData.accessToken);
        await AsyncStorage.setItem(
          'initInfo',
          JSON.stringify(resData.initInfo),
        );
        console.log('[Separate Login] success Login');
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

// // TODO 삭제
// export const useLoginTest = () => {
//   return useMutation({
//     mutationFn: (userId: number) => loginUserTest(userId),
//     onError: err => {
//       console.log(err);
//       console.log('[Tester Login] error Login');
//     },
//     onSuccess: async (res: any) => {
//       const resData = res.data;
//       try {
//         await AsyncStorage.setItem('accessToken', resData.accessToken);
//         await AsyncStorage.setItem(
//           'initInfo',
//           JSON.stringify(resData.initInfo),
//         );
//         console.log('[Tester Login] success Login');
//       } catch (error) {
//         console.log('[AsyncStorage] Error storing userId', error);
//       }
//       return resData;
//     },
//   });
// };
