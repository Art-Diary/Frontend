import Toast, {ToastConfig} from 'react-native-toast-message';
import styled from 'styled-components/native';
import {
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

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
  background-color: #9e9d9d;
  border-radius: 50px;
  padding: ${hp(7)}px;
  /* height: 150%; */
  width: 70%;
  /* justify-content: center; */
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${fp(17.9)}px;
  color: white;
  font-family: 'omyu pretty';
  padding-top: ${hp(3)}px;
  padding-bottom: ${hp(3)}px;
`;
