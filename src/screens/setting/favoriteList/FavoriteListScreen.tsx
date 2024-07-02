import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import BackView from '~/components/common/BackView';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import FetchFavoriteList from './FetchFavoriteList';
import {FONT_NAME} from '~/components/common/style';
import {MAIN_COLOR} from '~/components/common/colors';

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
  font-size: ${rf(16)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  border-bottom-color: ${MAIN_COLOR};
  border-bottom-width: ${wp(0.3)}px;
`;
