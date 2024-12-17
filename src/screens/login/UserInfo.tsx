import React, {useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchUserInfo} from '~/api/queries/auth';
import {useUserActions} from '~/zustand/auth/auth';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {View} from 'react-native';

export const UserInfo = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const {updateAuthInfo} = useUserActions();
  const {
    data: userInfo,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchUserInfo();

  useEffect(() => {
    if (isFocused) {
      refetch().then(result => {
        const res = result.data;

        console.log(res);
        updateAuthInfo({...res, role: res.roleType});
        navigation.navigate('Main', {screen: 'Diary'});
      });
    }
  }, [isFocused]);

  if (isLoading) {
    return <LoadingModal message={'사용자 정보 조회 중 :)'} />;
  }

  return <View></View>;
};
