import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchFavoriteList} from '~/api/queries/exhibition';
import BackView from '~/components/common/BackView';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import {
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {useFavoriteListActions} from '~/zustand/setting/favoriteList';

const FavoriteListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const {updateFavoriteList} = useFavoriteListActions();
  const {
    data: favoriteList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchFavoriteList();

  useEffect(() => {
    // 다른 화면을 갔다왔을때 갱신
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'좋아요 전시회 조회 중 :)'} />;
  }

  if (favoriteList.length === 0) {
    return <ErrorMessageView message={'좋아요 누른 전시회가 없습니다 >_<'} />;
  }

  const onPressEditButton = () => {
    var list = [];

    for (let i = 0; i < favoriteList.length; i++) {
      list.push({
        exhId: favoriteList[i].exhId,
        poster: favoriteList[i].poster,
        exhName: favoriteList[i].exhName,
        gallery: favoriteList[i].gallery,
        exhPeriodStart: favoriteList[i].exhPeriodStart,
        exhPeriodEnd: favoriteList[i].exhPeriodEnd,
      });
    }
    updateFavoriteList(list);
    navigation.navigate('EditFavorite');
  };

  return (
    <Container>
      <BackView title="좋아요 전시회" line={true}>
        <TouchableOpacity onPress={onPressEditButton}>
          <EditText>편집</EditText>
        </TouchableOpacity>
      </BackView>

      {/* body */}
      <Contents>
        <FlatList
          data={favoriteList}
          renderItem={({item, index}) => (
            <ExhWrapper>
              <ExhItemView
                poster={item.poster}
                exhName={item.exhName}
                gallery={item.gallery}
                exhPeriodStart={item.exhPeriodStart}
                exhPeriodEnd={item.exhPeriodEnd}
                noLine={index === favoriteList.length - 1 ? true : false}
              />
            </ExhWrapper>
          )}
        />
      </Contents>
    </Container>
  );
};

export default FavoriteListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
`;

const ExhWrapper = styled.View`
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
`;

const EditText = styled.Text`
  font-size: ${fp(17)}px;
  color: #ff6f61;
  font-family: 'omyu pretty';
  border-bottom-color: #ff6f61;
  border-bottom-width: 1px;
`;
