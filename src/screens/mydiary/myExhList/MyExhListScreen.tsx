import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '~/components/Header';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import MyExhList from './MyExhList';
import {AddMyExhButton} from '~/assets/images/index';

const MyExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    // <Container bottom="Diary">
    // </Container>
    <View style={screenStyles.view}>
      {/* header */}
      <Header title={'내 기록'}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyAddExhibition')}>
          <AddMyExhButton />
        </TouchableOpacity>
      </Header>

      {/* body */}
      <MyExhList />
    </View>
  );
};

export default MyExhListScreen;

const screenStyles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
