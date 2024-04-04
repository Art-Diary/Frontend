import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useDeleteFavoriteList} from '~/api/queries/exhibition';
import {EmptyHeart, FullHeart} from '~/assets/images';
import BackView from '~/components/common/BackView';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {showToast} from '~/components/common/modal/toastConfig';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {
  useFavoriteInfoList,
  useFavoriteListActions,
} from '~/zustand/setting/favoriteList';

interface Like {
  exhId: number;
  like: boolean;
}

const EditFavoriteScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [likeList, setLikeList] = useState<Like[]>([]);
  const exhList = useFavoriteInfoList();
  const {updateFavoriteList} = useFavoriteListActions();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {
    mutate: deleteFavoriteList,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteFavoriteList(deleteList);

  useEffect(() => {
    var list: Like[] = [];

    for (let i = 0; i < exhList.length; i++) {
      list.push({exhId: exhList[i].exhId, like: true});
    }
    setLikeList(list);
  }, [exhList]);

  useEffect(() => {
    if (deleteList.length !== 0) {
      deleteFavoriteList();
    }
  }, [deleteList]);

  useEffect(() => {
    if (isError) {
      showToast('편집에 실패했습니다.');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      updateFavoriteList([]);
      showToast('편집 완료!');
      navigation.navigate('FavoriteList');
    }
  }, [isSuccess, isError, isLoading]);

  const onPressHeart = (index: number) => {
    var changeList: Like[] = [];

    for (let i = 0; i < likeList.length; i++) {
      changeList.push({
        exhId: likeList[i].exhId,
        like: i === index ? !likeList[i].like : likeList[i].like,
      });
    }
    setLikeList(changeList);
  };

  const onPressComplete = () => {
    var result: number[] = [];

    for (let i = 0; i < likeList.length; i++) {
      if (!likeList[i].like) {
        result.push(likeList[i].exhId);
      }
    }
    setDeleteList(result);
  };

  return (
    <Container>
      <BackView title="좋아요 전시회" line={true}>
        <TouchableOpacity onPress={onPressComplete}>
          <EditText>완료</EditText>
        </TouchableOpacity>
      </BackView>

      {/* body */}
      <Contents>
        <FlatList
          data={exhList}
          renderItem={({item, index}) => (
            <ExhWrapper>
              <ExhItemView
                poster={item.poster}
                exhName={item.exhName}
                gallery={item.gallery}
                exhPeriodStart={item.exhPeriodStart}
                exhPeriodEnd={item.exhPeriodEnd}
                noLine={index === exhList.length - 1 ? true : false}>
                <HeartView>
                  <TouchableOpacity onPress={() => onPressHeart(index)}>
                    {likeList[index]?.like ? <FullHeart /> : <EmptyHeart />}
                  </TouchableOpacity>
                </HeartView>
              </ExhItemView>
            </ExhWrapper>
          )}
        />
      </Contents>
      {isLoadingOpen && <LoadingModal message={'편집 중 :)'} />}
    </Container>
  );
};

export default EditFavoriteScreen;

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
  font-size: ${fp(16)}px;
  color: white;
  background-color: #ff6f61;
  font-family: 'omyu pretty';
  padding-top: ${hp(3)}px;
  padding-bottom: ${hp(3)}px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  border-radius: 5px;
`;

const HeartView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${wp(8)}px;
`;
