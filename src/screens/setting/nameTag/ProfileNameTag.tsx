import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  sizePercentage as sp,
} from '~/components/common/ResponsiveSize';
import {ProfileUpdateIcon} from '~/assets/images';
import {TouchableOpacity} from 'react-native';
import {useUserInfo} from '~/zustand/auth/auth';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {FONT_NAME} from '~/components/common/style';
import ProfileTag from '../../../assets/name_tag/profile_tag.svg';
import {responsiveScreenWidth as rw} from 'react-native-responsive-dimensions';
import {
  DEFAULT_TEXT,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';

const ProfileNameTag = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const userInfo = useUserInfo();

  const height = rw(16.5);
  const updateIconHeight = rw(6.5);

  return (
    <Container>
      <ProfileTag
        width={2800 * (height / 500)} // Adjust width according to height ratio
        height={height}
      />

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
            <ProfileUpdateIcon
              width={100 * (updateIconHeight / 101)}
              height={updateIconHeight}
            />
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
  padding-left: ${sp(17)}px;
  padding-right: ${sp(19)}px;
  flex-direction: row;
  align-items: center;
  gap: ${sp(14)}px;
`;

const UserInfoRow = styled.View`
  flex-direction: row;
  gap: ${sp(12)}px;
`;

const UserInfoColumn = styled.View`
  flex: 1;
  flex-direction: column;
  gap: ${sp(11.5)}px;
`;

const NickName = styled.Text`
  font-size: ${rf(20)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  text-align: center;
`;
const ArtWrapper = styled.View`
  justify-content: flex-end;
`;

const Art = styled.Text`
  font-size: ${rf(18.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-align: center;
`;

const Email = styled.Text`
  font-size: ${rf(19)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-decoration-line: underline;
`;

interface ProfileWrapperProps {
  isPresent: boolean;
}

const ProfileWrapper = styled.View<ProfileWrapperProps>`
  border-radius: ${sp(50)}px;
  align-items: center;
  justify-content: center;
  width: ${sp(23)}px;
  height: ${sp(23)}px;
  overflow: hidden;
  border-color: ${MAIN_COLOR};
  border-width: ${(props: ProfileWrapperProps) =>
    props.isPresent ? `0px` : `1px`};
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;
