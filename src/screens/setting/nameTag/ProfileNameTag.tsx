import React from 'react';
import styled from 'styled-components/native';
import {Svg, SvgXml} from 'react-native-svg';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {ProfileUpdateIcon} from '~/assets/images';
import {TouchableOpacity} from 'react-native';
import {useUserInfo} from '~/zustand/auth/auth';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';

const ProfileNameTag = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const tag = `<svg width="400" height="74" viewBox="0 0 400 74" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M376.451 37.1406L399.096 73.25H0.5V0.5H399.096L376.451 36.6094L376.285 36.875L376.451 37.1406Z" fill="white" stroke="#FF6F61"/>
  <rect width="11.25" height="73.75" fill="#FF6F61"/>
  </svg>`;
  const userInfo = useUserInfo();

  return (
    <Container>
      <Svg height="200">
        <SvgXml xml={tag} width="100%" />
      </Svg>

      <WordContainer>
        <Wrapper>
          <ProfileWrapper>
            <Profile
              source={{uri: `data:image/png;base64,${userInfo.profile}`}}
              resizeMode="cover"
              alt={'이미지 읽기 실패'}
            />
          </ProfileWrapper>
          <UserInfoColumn>
            <UserInfoRow>
              <NickName>{userInfo.nickname}</NickName>
              <ArtWrapper>
                <Art>{userInfo.favoriteArt}</Art>
              </ArtWrapper>
            </UserInfoRow>
            <Email>{userInfo.email}</Email>
          </UserInfoColumn>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <ProfileUpdateIcon />
          </TouchableOpacity>
        </Wrapper>
      </WordContainer>
    </Container>
  );
};

export default ProfileNameTag;

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
  padding-left: ${wp(20)}px;
  padding-right: ${wp(30)}px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const UserInfoRow = styled.View`
  flex-direction: row;
  gap: 5px;
`;

const UserInfoColumn = styled.View`
  flex: 1;
  flex-direction: column;
`;

const NickName = styled.Text`
  font-size: ${fp(20)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  text-align: center;
`;
const ArtWrapper = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 2px;
`;

const Art = styled.Text`
  font-size: ${fp(12)}px;
  color: #979797;
  font-family: 'omyu pretty';
  text-align: center;
`;

const Email = styled.Text`
  font-size: ${fp(16)}px;
  color: #979797;
  font-family: 'omyu pretty';
  text-decoration-line: underline;
`;

const ProfileWrapper = styled.View`
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  width: ${wp(45)}px;
  height: ${wp(45)}px;
  overflow: hidden;
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;
