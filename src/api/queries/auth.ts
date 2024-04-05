import {useMutation} from 'react-query';
import {updateAlarm1, updateAlarm2, updateAlarm3} from '../auth';

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
