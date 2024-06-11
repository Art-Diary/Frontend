import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {RootStackNavigationProp} from '~/App';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useFetchMateExhList} from '~/api/queries/mate';
import {useMateInfo} from '~/zustand/mate/mate';
import VisitedExhListFrame from '~/components/diary/VisitedExhListFrame';
import {useQueryMateDiaryActions} from '~/zustand/mate/queryMateDiary';

const MateExhList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const mateInfo = useMateInfo();
  const {updateQueryInfo} = useQueryMateDiaryActions();
  const {
    data: mateExhList,
    isLoading,
    isError,
    refetch,
  } = useFetchMateExhList(mateInfo.mateInfo.userId);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (isError) {
    return <ErrorMessageView message="전시 메이트 정보 조회 실패 ;(" />;
  }

  if (isLoading) {
    return <LoadingModal message="전시 메이트 정보 조회 중:)" />;
  }

  if (mateExhList.length === 0) {
    return (
      <ErrorMessageView
        message={'아직 전시 메이트의 전시회에 대한 기록이 없습니다.'}
      />
    );
  }

  const onPress = (exhId: number) => {
    updateQueryInfo({
      mateId: mateInfo.mateInfo.userId,
      exhId: exhId,
    });
    navigation.navigate('MateDiaryList');
  };

  return <VisitedExhListFrame exhList={mateExhList} handlePressExh={onPress} />;
};

export default MateExhList;
