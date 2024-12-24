import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {DEFAULT_TEXT, MAIN_COLOR} from '../colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '../style';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import CustomTouchable from '../CustomTouchable';

interface ErrorModalProps {
  isError: boolean;
  retry: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({isError, retry}) => {
  return (
    <Modal visible={isError} animationType="fade" transparent={true}>
      <Container>
        <Content>
          <Message>
            요청 처리에 실패했습니다.{'\n'}잠시 후 다시 시도해주세요.
          </Message>
          <ButtonDetailSection>
            <CustomTouchable onPress={retry}>
              <ButtonText>재시도</ButtonText>
            </CustomTouchable>
          </ButtonDetailSection>
        </Content>
      </Container>
    </Modal>
  );
};

export default ErrorModal;

/** style */
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Content = styled.View`
  background-color: white;
  border-radius: ${wp(4.5)}px;
  width: ${wp(70)}px;
  height: ${hp(25)}px;
  padding: ${wp(5)}px;
  padding-top: ${hp(7)}px;
  justify-content: space-between;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const ButtonText = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${MAIN_COLOR};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;

const ButtonDetailSection = styled.View`
  justify-content: center;
  /* padding: ${wp(5)}px; */
  width: 100%;
`;
