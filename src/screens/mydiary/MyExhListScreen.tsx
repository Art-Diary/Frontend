import React, {useEffect} from 'react';
import {RefreshControl, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '~/components/common/Header';
import {RootStackNavigationProp} from '~/App';
import StoredExhList from '../../components/diary/StoredExhList';
import {AddMyExhButton} from '~/assets/images/index';
import {useFetchMyExhList} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';

const MyExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();

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
    return (
      <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다 >_<'} />
    );
  }

  return (
    <Container>
      {/* <RefreshControl onRefresh={refresh} refreshing={isRefreshing} /> */}
      {/* header */}
      <Header title={'내 기록'}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyExhibitionSearch')}>
          <AddMyExhButton />
        </TouchableOpacity>
      </Header>

      {/* body */}
      <Contents>
        <StoredExhList myExhList={myExhList} />
      </Contents>
    </Container>
  );
};

export default MyExhListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
`;
