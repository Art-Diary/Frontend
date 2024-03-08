import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import {fetchMyExhList} from '~/api/mydiary';
import MyExhItem from './MyExhItem';
import InfoView from '~/components/InfoView';

const MyExhList = () => {
  const {
    data: myExhList,
    isLoading,
    isError,
  } = useQuery('myExhList', fetchMyExhList, {
    staleTime: 500000,
    onError: err => {
      console.log(err);
      console.log('[MyExhListScreen] error fetch MyExhList');
    },
    onSuccess: (data: any) => {
      console.log('[MyExhListScreen] success fetch MyExhList');
    },
    select: (res: any) => res.data,
  });

  if (isError) {
    return <InfoView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <InfoView message={'로딩중 :)'} />;
  }

  if (myExhList.length === 0) {
    return <InfoView message={'아직 전시회에 대한 기록이 없습니다 >_<'} />;
  }

  return (
    // <Container bottom="Diary">
    <>
      {/* body */}
      <View style={myDiaryStyles.view}>
        <FlatList
          data={myExhList}
          renderItem={({item}) => (
            <MyExhItem
              title={item.exhName}
              star={item.rate}
              poster={item.poster}
            />
          )}
          numColumns={2}
        />
      </View>
    </>
    // </Container>
  );
};

export default MyExhList;

const myDiaryStyles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
  },
  text: {
    fontSize: 25,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  button: {
    backgroundColor: '#FF6F61',
    borderRadius: 4,
    padding: 12,
  },
});
