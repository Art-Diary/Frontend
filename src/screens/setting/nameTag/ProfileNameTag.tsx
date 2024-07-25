import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {useUserInfo} from '~/zustand/auth/auth';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {FONT_NAME} from '~/components/common/style';
import {DEFAULT_TEXT, MIDDLE_GREY} from '~/components/common/colors';
import {ProfileTagIcon, ProfileUpdateIcon} from '~/components/common/icon';
import {DEFAULT_IMAGE} from '@env';
import CustomTouchable from '~/components/common/CustomTouchable';

const ProfileNameTag = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const userInfo = useUserInfo();

  return (
    <Container>
      <ProfileTagIcon />

      <WordContainer>
        <Wrapper>
          <ProfileWrapper>
            <Profile
              source={{uri: `${userInfo.authInfo.profile ?? DEFAULT_IMAGE}`}}
              resizeMode="cover"
              alt={'이미지'}
            />
          </ProfileWrapper>
          <UserInfoColumn>
            <UserInfoRow>
              <NickName>
                {!userInfo.authInfo.nickname ||
                userInfo.authInfo.nickname === ''
                  ? '홍길동'
                  : userInfo.authInfo.nickname}
              </NickName>
              <ArtWrapper>
                <Art>
                  {!userInfo.authInfo.favoriteArt ||
                  userInfo.authInfo.favoriteArt === ''
                    ? '좋아하는 전시 분야'
                    : userInfo.authInfo.favoriteArt}
                </Art>
              </ArtWrapper>
            </UserInfoRow>
            <Email>
              {!userInfo.authInfo.email || userInfo.authInfo.email === ''
                ? '이메일@이메일'
                : userInfo.authInfo.email}
            </Email>
          </UserInfoColumn>
          <CustomTouchable
            onPress={() =>
              navigation.navigate('SettingRoutes', {
                screen: 'EditProfile',
                params: undefined,
              })
            }>
            <ProfileUpdateIcon />
          </CustomTouchable>
        </Wrapper>
      </WordContainer>
    </Container>
  );
};

export default ProfileNameTag;

/** style */
const Container = styled.View`
  position: relative;
`;

const WordContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-left: ${wp(6)}px;
  padding-right: ${wp(8)}px;
  flex-direction: row;
  align-items: center;
  gap: ${wp(3)}px;
`;

const UserInfoRow = styled.View`
  flex-direction: row;
  gap: ${wp(1)}px;
`;

const UserInfoColumn = styled.View`
  flex: 1;
  flex-direction: column;
  gap: ${hp(0.4)}px;
`;

const NickName = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  text-align: center;
`;
const ArtWrapper = styled.View`
  justify-content: flex-end;
`;

const Art = styled.Text`
  font-size: ${rf(11.6)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-align: center;
`;

const Email = styled.Text`
  font-size: ${rf(13.7)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-decoration-line: underline;
`;

const ProfileWrapper = styled.View`
  border-radius: ${wp(50)}px;
  align-items: center;
  justify-content: center;
  width: ${wp(12)}px;
  height: ${wp(12)}px;
  overflow: hidden;
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;
