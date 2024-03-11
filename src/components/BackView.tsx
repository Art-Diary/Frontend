import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, BackHandler} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {BackButton} from '~/assets/images/index';

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
    <View style={backStyles.view}>
      <TouchableOpacity onPress={handlePressBack}>
        <BackButton />
      </TouchableOpacity>
      {children}
    </View>
  );
};

export default BackView;

/** style */
const backStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 양 끝으로 버튼 배치
    alignItems: 'center',
    padding: 17,
    width: '100%',
    height: 57,
    backgroundColor: '#F6F6F6',
  },
});
