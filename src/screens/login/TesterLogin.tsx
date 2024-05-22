import React, {useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchUserInfo} from '~/api/queries/auth';
import {useUserActions} from '~/zustand/auth/auth';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {View} from 'react-native';

export const TesterLogin = () => {
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
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isSuccess) {
      updateAuthInfo({
        userId: userInfo.userId,
        nickname: userInfo.nickname,
        email: userInfo.email,
        profile: userInfo.profile,
        favoriteArt: userInfo.favoriteArt,
        alarm1: userInfo.alarm1,
        alarm2: userInfo.alarm2,
        alarm3: userInfo.alarm3,
      });
      navigation.navigate('Main');
    }
  }, [isSuccess, updateAuthInfo, userInfo, navigation]);

  if (isLoading) {
    return <LoadingModal message={'사용자 정보 조회 중 :)'} />;
  }

  return <View></View>;
};
