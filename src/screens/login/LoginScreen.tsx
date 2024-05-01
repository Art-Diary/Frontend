import React from 'react';
import styled from 'styled-components/native';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {GoogleIcon, KakaoIcon, NaverIcon} from '~/assets/images';
import {TouchableOpacity} from 'react-native';
import GreyNameTag from '../../components/common/GreyNameTag';

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const move = () => {
    navigation.navigate('Main');
  };

  return (
    <Container>
      <Contents>
        <ArtDiary>Art Diary</ArtDiary>
        <LoginWrapper>
          <TouchableOpacity onPress={move}>
            <GreyNameTag login={true} content="Google 로그인">
              <GoogleIcon />
            </GreyNameTag>
          </TouchableOpacity>
          <TouchableOpacity onPress={move}>
            <GreyNameTag login={true} content="Naver 로그인">
              <NaverIcon />
            </GreyNameTag>
          </TouchableOpacity>
          <TouchableOpacity onPress={move}>
            <GreyNameTag login={true} content="Kakao 로그인">
              <KakaoIcon />
            </GreyNameTag>
          </TouchableOpacity>
        </LoginWrapper>
      </Contents>
      <LineWrapper>
        <Line />
      </LineWrapper>
    </Container>
  );
};

export default LoginScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #ff6f61;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
`;

const LineWrapper = styled.View`
  height: 100%;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  align-items: center;
`;

const Line = styled.View`
  height: 100%;
  background-color: #f6f6f6;
  width: 28px;
`;

const ArtDiary = styled.Text`
  font-size: ${fp(120)}px;
  color: white;
  font-family: 'omyu pretty';
  text-align: center;
`;

const LoginWrapper = styled.View`
  justify-content: center;
  padding-left: ${wp(35)}px;
  padding-right: ${wp(18)}px;
  width: 100%;
  gap: ${hp(-10)}px;
`;
