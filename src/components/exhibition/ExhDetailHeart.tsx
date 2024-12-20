import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {showToast} from '~/components/common/modal/toastConfig';
import {useAddLike, useDeleteLike} from '~/api/queries/exhibition';
import {EmptyHeartIcon, FullHeartIcon} from '~/components/common/icon';
import CustomTouchable from '~/components/common/CustomTouchable';
import LoadingModal from '../common/modal/LoadingModal';

interface Props {
  exhId: number;
  heartState: boolean;
}

const ExhDetailHeart: React.FC<Props> = ({exhId, heartState}) => {
  const [hearts, setHearts] = useState<boolean>(heartState);
  const {
    mutate: addLike,
    isLoading: isLoadingLike,
    isError: isErrorLike,
    isSuccess: isSuccessLike,
    error: errorLike,
  } = useAddLike();
  const {
    mutate: deleteLike,
    isLoading: isLoadingDislike,
    isError: isErrorDislike,
    isSuccess: isSuccessDislike,
    error: errorDislike,
  } = useDeleteLike();

  useEffect(() => {
    setHearts(heartState);
  }, [heartState]);

  useEffect(() => {
    if (isErrorLike) {
      const statusCode = errorLike.response?.status;
      if (statusCode === 409) {
        showToast('이미 좋아요 설정 완료했습니다.');
      } else {
        showToast('다시 시도해주세요.');
      }
    }
    if (isSuccessLike) {
      setHearts(true);
      console.log('좋아요 성공 (exhId: ' + exhId + ')');
    }
  }, [isErrorLike, isSuccessLike]);

  useEffect(() => {
    if (isErrorDislike) {
      const statusCode = errorDislike.response?.status;
      if (statusCode === 409) {
        showToast('이미 좋아요 해제 완료했습니다.');
      } else {
        showToast('다시 시도해주세요.');
      }
    }
    if (isSuccessDislike) {
      setHearts(false);
      console.log('좋아요 해제 (exhId: ' + exhId + ')');
    }
  }, [isErrorDislike, isSuccessDislike]);

  const onPressHeart = (exhId: number) => {
    if (!hearts) {
      addLike(exhId);
    } else {
      deleteLike([exhId]);
    }
  };

  return (
    <TopLayer>
      <LoadingModal isLoading={isLoadingLike || isLoadingDislike} />
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
