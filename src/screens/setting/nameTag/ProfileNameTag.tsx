import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {TouchableOpacity} from 'react-native';
import {useUserInfo} from '~/zustand/auth/auth';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {FONT_NAME} from '~/components/common/style';
import {
  DEFAULT_TEXT,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {ProfileTagIcon, ProfileUpdateIcon} from '~/components/common/icon';

const ProfileNameTag = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const userInfo = useUserInfo();

  return (
    <Container>
      <ProfileTagIcon />

      <WordContainer>
        <Wrapper>
          <ProfileWrapper isPresent={userInfo.authInfo.profile}>
            <Profile
              source={{
                uri: `data:image/png;base64,${userInfo.authInfo.profile}`,
              }}
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SettingRoutes', {
                screen: 'EditProfile',
                params: undefined,
              })
            }>
            <ProfileUpdateIcon />
          </TouchableOpacity>
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

interface ProfileWrapperProps {
  isPresent: boolean;
}

const ProfileWrapper = styled.View<ProfileWrapperProps>`
  border-radius: ${wp(39)}px;
  align-items: center;
  justify-content: center;
  width: ${wp(12)}px;
  height: ${wp(12)}px;
  overflow: hidden;
  border-color: ${MAIN_COLOR};
  border-width: ${(props: ProfileWrapperProps) =>
    props.isPresent ? `0px` : `${wp(0.3)}px;`};
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;
