import React from 'react';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchUserInfo} from '~/api/queries/auth';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useUserActions} from '~/zustand/auth/auth';
import ProfileNameTag from './nameTag/ProfileNameTag';
import GreyNameTag from './nameTag/GreyNameTag';

const SettingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  /** 임시 */
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
    updateUserId(userInfo.userId);
    updateNickname(userInfo.nickname);
    updateEmail(userInfo.email);
    updateProfile(userInfo.profile);
    updateFavoriteArt(userInfo.favoriteArt);
    updateAlarm1(userInfo.alarm1);
    updateAlarm2(userInfo.alarm2);
    updateAlarm3(userInfo.alarm3);
  }
  /** 임시 */

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
          <TouchableOpacity
            onPress={() => navigation.navigate('FavoriteRoutes')}>
            <GreyNameTag content="좋아요 전시회 목록" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AlarmSetting')}>
            <GreyNameTag content="알림 설정" />
          </TouchableOpacity>
          <TouchableOpacity>
            <GreyNameTag content="도움말" />
          </TouchableOpacity>
        </SettingWrapper>
        {/* 회원정보 */}
        <SettingWrapper>
          <TitleText>회원정보</TitleText>
          <TouchableOpacity>
            <GreyNameTag content="로그아웃" />
          </TouchableOpacity>
          <TouchableOpacity>
            <GreyNameTag content="탈퇴" />
          </TouchableOpacity>
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
