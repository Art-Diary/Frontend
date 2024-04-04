import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FavoriteListScreen from '~/screens/setting/FavoriteListScreen';
import EditFavoriteScreen from '~/screens/setting/EditFavoriteScreen';

const Favorite = createNativeStackNavigator();

const FavoriteRoutes = () => {
  return (
    <Favorite.Navigator
      initialRouteName="FavoriteList"
      screenOptions={{gestureEnabled: true}}>
      {/* 좋아요 누른 전시회 목록 */}
      <Favorite.Screen
        name="FavoriteList"
        component={FavoriteListScreen}
        options={{headerShown: false}}
      />
      {/* 좋아요 수정 페이지 */}
      <Favorite.Screen
        name="EditFavorite"
        component={EditFavoriteScreen}
        options={{headerShown: false}}
      />
    </Favorite.Navigator>
  );
};

export default FavoriteRoutes;
