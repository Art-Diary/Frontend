import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyDiaryScreen from './MyDiaryScreen';

const MyDiary = createNativeStackNavigator();

const MyDiaryRoutes = () => {
  return (
    <MyDiary.Navigator initialRouteName="mydiary-screen">
      <MyDiary.Screen
        name="mydiary-screen"
        component={MyDiaryScreen}
        options={{headerShown: false}}
      />
    </MyDiary.Navigator>
  );
};

export default MyDiaryRoutes;
