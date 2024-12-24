import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchUserInfo} from '~/api/queries/auth';
import {useUserActions} from '~/zustand/auth/auth';
import {View} from 'react-native';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

export const UserInfo = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const {updateAuthInfo} = useUserActions();
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
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

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <View>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
    </View>
  );
};
