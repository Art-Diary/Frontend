import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useEffect} from 'react';
import {TouchableOpacity, BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {BackButton} from '~/assets/images/index';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface BackProps {
  title?: string;
  line: boolean;
  children: ReactNode;
}

const BackView: React.FC<BackProps> = ({title, line, children}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const handlePressBack = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlePressBack);
    };
  }, [handlePressBack]);

  return (
    <>
      <Container>
        <LeftSection>
          <TouchableOpacity onPress={handlePressBack}>
            <BackButton />
          </TouchableOpacity>
          <Title>{title}</Title>
        </LeftSection>
        {children}
      </Container>
      {line && <DashLine />}
    </>
  );
};

export default BackView;

/** style */
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between; // 양 끝으로 버튼 배치
  align-items: center;
  padding-left: ${hp(12.5)}px;
  padding-right: ${hp(12.5)}px;
  width: 100%;
  height: ${hp(35)}px;
  background-color: #f6f6f6;
`;

const DashLine = styled.View`
  width: 100%;
  border-style: dashed;
  border-color: #d3d3d3;
  border-bottom-width: ${wp(1.3)}px;
`;

const Title = styled.Text`
  font-size: ${fp(20)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(12)}px;
`;
