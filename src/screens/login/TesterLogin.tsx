import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchUserInfo} from '~/api/queries/auth';
import {useUserActions} from '~/zustand/auth/auth';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {fontPercentage as fp} from '~/components/common/ResponsiveSize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TesterLogin = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateAuthInfo} = useUserActions();
  const {
    data: userInfo,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchUserInfo();

  if (isLoading) {
    return <LoadingModal message={'사용자 정보 조회 중 :)'} />;
  }

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
    try {
      AsyncStorage.setItem('userId', JSON.stringify(3));
      console.log('[AsyncStorage] Success storing userId TESTER 3');
    } catch (error) {
      console.log('[AsyncStorage] Error storing userId TESTER 3');
    }

    navigation.navigate('Main');
  }

  // const handleTester = async () => {
  //   try {
  //     await AsyncStorage.setItem('userId', JSON.stringify(3));
  //     console.log('[AsyncStorage] Success storing userId TESTER 3');
  //   } catch (error) {
  //     console.log('[AsyncStorage] Error storing userId TESTER 3');
  //   }

  //   navigation.navigate('Main');
  // };
  return (
    <></>
    // <TouchableOpacity onPress={handleTester}>
    //   <Tester>테스터 3</Tester>
    // </TouchableOpacity>
  );
};

const Tester = styled.Text`
  margin: 5px;
  font-size: ${fp(15)}px;
  color: white;
  font-family: 'omyu pretty';
  text-decoration: underline;
`;
