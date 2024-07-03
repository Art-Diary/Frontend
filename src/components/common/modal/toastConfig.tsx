import Toast, {ToastConfig} from 'react-native-toast-message';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {MIDDLE_GREY} from '../colors';
import {FONT_NAME} from '../style';

export const showToast = (text: string) => {
  Toast.show({
    type: 'selectedToast',
    text1: text,
    position: 'bottom',
    visibilityTime: 1500,
  });
};

export const toastConfig: ToastConfig = {
  selectedToast: ({text1}) => (
    <Contents>
      <Message>{text1}</Message>
    </Contents>
  ),
};

const Contents = styled.View`
  background-color: ${MIDDLE_GREY};
  border-radius: ${wp(50)}px;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${rf(17)}px;
  color: white;
  font-family: ${FONT_NAME};
  padding-top: ${hp(1.5)}px;
  padding-bottom: ${hp(1.5)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
`;
