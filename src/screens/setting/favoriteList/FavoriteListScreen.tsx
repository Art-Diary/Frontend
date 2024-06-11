import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import BackView from '~/components/common/BackView';
import {
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import FetchFavoriteList from './FetchFavoriteList';

const FavoriteListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressEditButton = () => {
    navigation.navigate('SettingRoutes', {
      screen: 'EditFavorite',
      params: undefined,
    });
  };

  return (
    <Container>
      <BackView title="좋아요 전시회" line={true}>
        <TouchableOpacity onPress={onPressEditButton}>
          <EditText>편집</EditText>
        </TouchableOpacity>
      </BackView>

      {/* body */}
      <FetchFavoriteList />
    </Container>
  );
};

export default FavoriteListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const EditText = styled.Text`
  font-size: ${fp(17)}px;
  color: #ff6f61;
  font-family: 'omyu pretty';
  border-bottom-color: #ff6f61;
  border-bottom-width: 1px;
`;
