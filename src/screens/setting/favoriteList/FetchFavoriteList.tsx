import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useFetchFavoriteList} from '~/api/queries/exhibition';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import {BACK_COLOR} from '~/components/common/colors';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {useFavoriteListActions} from '~/zustand/setting/favoriteList';

const FetchFavoriteList = () => {
  const {updateFavoriteList} = useFavoriteListActions();
  const {
    data: favoriteList,
    isLoading,
    isError,
    isSuccess,
  } = useFetchFavoriteList();

  if (isSuccess) {
    updateFavoriteList(favoriteList);
  }

  if (isError) {
    return <ErrorMessageView message={'좋아요 누른 전시회 조회 실패 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'좋아요 전시회 조회 중 :)'} />;
  }

  if (favoriteList.length === 0) {
    return <ErrorMessageView message={'좋아요 누른 전시회가 없습니다.'} />;
  }

  return (
    <Contents>
      <FlatList
        data={favoriteList}
        renderItem={({item, index}) => (
          <ExhItemView
            exhInfo={{...item}}
            noLine={index === favoriteList.length - 1 ? true : false}
            notTouchable={true}
          />
        )}
      />
    </Contents>
  );
};

export default FetchFavoriteList;

/** style */
const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
`;
