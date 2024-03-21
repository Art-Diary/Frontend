import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useEffect} from 'react';
import {TouchableOpacity, BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {BackButton} from '~/assets/images/index';
import {
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';

interface BackProps {
  line: boolean;
  children: ReactNode;
}

const BackView: React.FC<BackProps> = ({line, children}) => {
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
        <TouchableOpacity onPress={handlePressBack}>
          <BackButton />
        </TouchableOpacity>
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
  padding: ${hp(12.5)}px;
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
