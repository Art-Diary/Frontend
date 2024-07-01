import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useEffect} from 'react';
import {TouchableOpacity, BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {
  sizePercentage as sp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {BACK_COLOR, BORDER_COLOR, DEFAULT_TEXT} from './colors';
import {DASH_WIDTH, FONT_NAME} from './style';
import {BackButtonIcon} from './icon';

interface BackProps {
  title?: string;
  line: boolean;
  children?: ReactNode;
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
            <BackButtonIcon />
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
  padding-left: ${sp(14)}px;
  padding-right: ${sp(15)}px;
  padding-top: ${sp(14)}px;
  padding-bottom: ${sp(14)}px;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

const DashLine = styled.View`
  width: 100%;
  border-style: dashed;
  border-color: ${BORDER_COLOR};
  border-bottom-width: ${DASH_WIDTH}px;
`;

const Title = styled.Text`
  font-size: ${rf(20.2)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${sp(13)}px;
`;
