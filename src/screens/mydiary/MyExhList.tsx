import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useFetchMyExhList} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import VisitedExhListFrame from '~/components/diary/VisitedExhListFrame';
import {RootStackNavigationProp} from '~/App';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';

const MyExhList = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const {data: myExhList, isLoading, isError, refetch} = useFetchMyExhList();

  // useEffect(() => { 새로고침에서 사용
  //   refetch(); // 데이터를 다시 가져오는 메서드를 사용하여 데이터를 다시 가져옴
  // }, []); // 처음 렌더링 시에만 호출되도록 빈 배열 전달

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
    return <LoadingModal message={'내가 기록한 전시회 목록 조회 중 :)'} />;
  }

  if (myExhList.length === 0) {
    return <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다'} />;
  }

  const onPress = (exhId: number) => {
    updateVisitedExhId(exhId);
    navigation.navigate('MyDiaryRoutes');
  };

  return (
    <Contents>
      {/* body */}
      <VisitedExhListFrame exhList={myExhList} handlePressExh={onPress} />
    </Contents>
  );
};

export default MyExhList;

/** style */
const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
`;
