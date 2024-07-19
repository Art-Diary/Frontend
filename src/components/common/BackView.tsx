import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useEffect} from 'react';
import {BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {BACK_COLOR, BORDER_COLOR, DEFAULT_TEXT} from './colors';
import {BACK_FONT_SIZE, DASH_WIDTH, FONT_NAME} from './style';
import {BackButtonIcon} from './icon';
import CustomTouchable from './CustomTouchable';

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
          <CustomTouchable onPress={handlePressBack}>
            <BackButtonIcon />
          </CustomTouchable>
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
  padding-left: ${wp(3)}px;
  padding-right: ${wp(4)}px;
  padding-top: ${wp(3)}px;
  padding-bottom: ${wp(3)}px;
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
  font-size: ${BACK_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(2)}px;
`;
