import Toast from 'react-native-simple-toast';
import {MIDDLE_GREY} from '../colors';

export const showToast = (text: string) => {
  Toast.show(text, Toast.SHORT, {
    backgroundColor: MIDDLE_GREY,
  });
};
