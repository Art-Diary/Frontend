import React from 'react';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import ProfileNameTag from './nameTag/ProfileNameTag';
import GreyNameTag from '../../components/common/GreyNameTag';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    // TODO 나중에 로그아웃 구체적으로 하기
    // 로그인 페이지로 이동
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <Container>
      {/* header */}
      <Header title={'설정'} children={null} />

      {/* body */}
      <Contents>
        {/* 내 프로필 */}
        <SettingWrapper>
          <TitleText>내 프로필</TitleText>
          <ProfileNameTag />
        </SettingWrapper>
        {/* 설정 */}
        <SettingWrapper>
          <TitleText>설정</TitleText>
          <GreyNameTag
            content="좋아요 전시회 목록"
            handleTouch={() => navigation.navigate('FavoriteRoutes')}
          />
          <GreyNameTag
            content="알림 설정"
            handleTouch={() => navigation.navigate('AlarmSetting')}
          />
          <GreyNameTag content="도움말" />
        </SettingWrapper>
        {/* 회원정보 */}
        <SettingWrapper>
          <TitleText>회원정보</TitleText>
          <GreyNameTag content="로그아웃" handleTouch={handleLogout} />
          <GreyNameTag
            content="탈퇴"
            handleTouch={() => navigation.navigate('LeaveArtDiary')}
          />
        </SettingWrapper>
      </Contents>
    </Container>
  );
};

export default SettingScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
  padding-top: ${hp(10)}px;
  padding-bottom: ${hp(10)}px;
  gap: ${hp(30)}px;
`;

const SettingWrapper = styled.View`
  gap: ${hp(10)}px;
  justify-content: start;
`;

const TitleText = styled.Text`
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;
