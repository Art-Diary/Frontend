import Toast, {ToastConfig} from 'react-native-toast-message';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  sizePercentage as sp,
} from '~/components/common/ResponsiveSize';
import {MIDDLE_GREY} from '../colors';

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
  border-radius: 50px;
  padding: ${sp(10)}px;
  /* height: 150%; */
  width: 70%;
  /* justify-content: center; */
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${rf(19.5)}px;
  color: white;
  font-family: 'omyu pretty';
  padding-top: ${sp(3)}px;
  padding-bottom: ${sp(3)}px;
`;
