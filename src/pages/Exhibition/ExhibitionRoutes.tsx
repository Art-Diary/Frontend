import React from 'react';
// import styled from 'styled-components/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExhScreen from './ExhScreen';

// const Container = styled.View`
//   justify-content: center;
//   align-items: center;
// `;

const Exh = createNativeStackNavigator();

const ExhibitionRoutes = () => {
  return (
    <Exh.Navigator>
      <Exh.Screen
        name="exh-screen"
        component={ExhScreen}
        options={{headerShown: false}}
      />
    </Exh.Navigator>
  );
};

export default ExhibitionRoutes;
