import {NavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '~/utils/stackTypes';

let navigator: NavigationContainerRef<RootStackParamList> | null = null;

export function setNavigator(
  nav: NavigationContainerRef<RootStackParamList> | null,
) {
  navigator = nav;
}

export function navigate(name: string, params?: any) {
  if (navigator) {
    navigator.navigate(name, params);
  }
}
