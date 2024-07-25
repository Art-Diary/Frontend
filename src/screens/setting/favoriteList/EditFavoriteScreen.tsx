import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useDeleteLike} from '~/api/queries/exhibition';
import BackView from '~/components/common/BackView';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {BACK_COLOR, MAIN_COLOR} from '~/components/common/colors';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {FONT_NAME} from '~/components/common/style';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {useFavoriteInfoList} from '~/zustand/setting/favoriteList';
import {EmptyHeartIcon, FullHeartIcon} from '~/components/common/icon';
import CustomTouchable from '~/components/common/CustomTouchable';

interface Like {
  exhId: number;
  like: boolean;
}

const EditFavoriteScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [likeList, setLikeList] = useState<Like[]>([]);
  const exhList = useFavoriteInfoList();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {
    mutate: deleteFavoriteList,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteLike(deleteList);

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
      handleSuccess(false);
    }
  }, [isSuccess, isError, isLoading]);

  const handleSuccess = (isZeroLength: boolean) => {
    if (!isZeroLength) {
      showToast('편집 완료했습니다.');
    }
    navigation.navigate('SettingRoutes', {
      screen: 'FavoriteList',
      params: undefined,
    });
  };

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
    if (result.length === 0) {
      handleSuccess(true);
    }
  };

  return (
    <Container>
      <BackView title="좋아요 전시회" line={true}>
        <CustomTouchable onPress={onPressComplete}>
          <EditText>완료</EditText>
        </CustomTouchable>
      </BackView>

      {/* body */}
      <Contents>
        <FlatList
          data={exhList}
          renderItem={({item, index}) => (
            <ExhItemView
              exhInfo={{...item}}
              noLine={index === exhList.length - 1 ? true : false}
              notTouchable={true}>
              <HeartView>
                <CustomTouchable onPress={() => onPressHeart(index)}>
                  {likeList[index]?.like ? (
                    <FullHeartIcon />
                  ) : (
                    <EmptyHeartIcon />
                  )}
                </CustomTouchable>
              </HeartView>
            </ExhItemView>
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
  background-color: ${BACK_COLOR};
`;

const EditText = styled.Text`
  font-size: ${rf(15.2)}px;
  color: white;
  background-color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  padding-top: ${wp(0.9)}px;
  padding-bottom: ${wp(0.9)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
  border-radius: ${wp(1)}px;
`;

const HeartView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
