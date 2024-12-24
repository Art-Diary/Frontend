import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useFetchFavoriteList} from '~/api/queries/exhibition';
import InfoMessageView from '~/components/common/InfoMessageView';
import {BACK_COLOR} from '~/components/common/colors';
import ErrorModal from '~/components/common/modal/ErrorModal';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {useFavoriteListActions} from '~/zustand/setting/favoriteList';

const FetchFavoriteList = () => {
  const {updateFavoriteList} = useFavoriteListActions();
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const {
    data: favoriteList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchFavoriteList();

  if (isSuccess) {
    updateFavoriteList(favoriteList);
  }

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Contents>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      {favoriteList &&
        (!favoriteList.length ? (
          <InfoMessageView message={'좋아요 누른 전시회가 없습니다.'} />
        ) : (
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
        ))}
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
