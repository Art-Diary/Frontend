import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {showToast} from '~/components/common/modal/toastConfig';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useAddLike, useDeleteLike} from '~/api/queries/exhibition';
import {EmptyHeartIcon, FullHeartIcon} from '~/components/common/icon';
import CustomTouchable from '~/components/common/CustomTouchable';

interface Props {
  exhId: number;
  heartState: boolean;
}

const ExhDetailHeart: React.FC<Props> = ({exhId, heartState}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [hearts, setHearts] = useState<boolean>(heartState);
  const {
    mutate: addLike,
    isLoading: isLoadingLike,
    isError: isErrorLike,
    isSuccess: isSuccessLike,
  } = useAddLike(exhId);
  const {
    mutate: deleteLike,
    isLoading: isLoadingDislike,
    isError: isErrorDislike,
    isSuccess: isSuccessDislike,
  } = useDeleteLike(deleteList);

  useEffect(() => {
    setHearts(heartState);
  }, [heartState]);

  useEffect(() => {
    if (isErrorLike) {
      console.log('좋아요 실패');
    }
    if (isLoadingLike) {
      console.log('좋아요 로딩중');
    }
    if (isSuccessLike) {
      setHearts(true);
      console.log('좋아요 성공 (exhId:', exhId, ')');
    }

    if (isErrorDislike) {
      showToast('좋아요 삭제 실패했습니다.');
    }
    if (isLoadingDislike) {
      console.log('좋아요 삭제 로딩중');
    }
    if (isSuccessDislike) {
      setHearts(false);
      console.log('좋아요 삭제 (exhId:', exhId, ')');
    }
  }, [
    isErrorLike,
    isLoadingLike,
    isSuccessLike,
    isErrorDislike,
    isLoadingDislike,
    isSuccessDislike,
  ]);

  const onPressHeart = (exhId: number) => {
    if (!hearts) {
      addLike(exhId);
    } else {
      deleteLike([exhId]);
    }
  };

  return (
    <TopLayer>
      <EmptyHeartContent>
        <CustomTouchable onPress={() => onPressHeart(exhId)}>
          {hearts ? <FullHeartIcon /> : <EmptyHeartIcon />}
        </CustomTouchable>
      </EmptyHeartContent>
    </TopLayer>
  );
};

export default ExhDetailHeart;

/** style */
const TopLayer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${wp(2.9)}px;
  padding-bottom: ${wp(3.9)}px;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: flex-end;
`;

const EmptyHeartContent = styled.View`
  flex-direction: column;
  justify-content: flex-end;
`;
