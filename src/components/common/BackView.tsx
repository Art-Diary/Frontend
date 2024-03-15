import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useEffect} from 'react';
import {TouchableOpacity, BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {BackButton} from '~/assets/images/index';
import {heightPercentage as hp} from '~/components/common/ResponsiveSize';

interface BackProps {
  children: ReactNode;
}

const BackView: React.FC<BackProps> = ({children}) => {
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
    <Container>
      <TouchableOpacity onPress={handlePressBack}>
        <BackButton />
      </TouchableOpacity>
      {children}
    </Container>
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
