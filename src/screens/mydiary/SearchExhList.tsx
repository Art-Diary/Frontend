import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchSearchExh} from '~/api/queries/exhibition';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import ExhItemView from '../../components/exhibition/ExhItemView';
import LoadingModal from '../../components/common/modal/LoadingModal';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';

interface SearchExhListProps {
  searchKeyword: string;
  changeIsPressed: () => void;
}

const SearchExhList: React.FC<SearchExhListProps> = ({
  searchKeyword,
  changeIsPressed,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    data: exhList,
    isLoading,
    isError,
    isSuccess,
  } = useFetchSearchExh(searchKeyword, null, null, null, null);
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const {updateIsUpdate} = useWriteMyDiaryActions();

  useEffect(() => {
    if (isSuccess) {
      changeIsPressed();
    }
  }, [isSuccess]);

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'전시회 조회 중 :)'} />;
  }

  const onPressExh = (exhId: number) => {
    updateVisitedExhId(exhId);
    updateIsUpdate(false);
    navigation.navigate('AddMyVisitDateRoutes');
  };

  return (
    <ExhListView>
      {exhList.length === 0 ? (
        <ErrorMessageView message="검색 결과가 없습니다." />
      ) : (
        <FlatList
          data={exhList}
          renderItem={({item, index}) => (
            <ExhItemView
              exhInfo={{...item}}
              notTouchable={false}
              onTouch={() => onPressExh(item.exhId)}
            />
          )}
        />
      )}
    </ExhListView>
  );
};

export default SearchExhList;

/** style */
const ExhListView = styled.View`
  flex: 1;
  flex-direction: column;
`;
