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
  } = useFetchSearchExh(searchKeyword, null, null, null);
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
      <FlatList
        data={exhList}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => onPressExh(item.exhId)}>
            <ExhItemView
              poster={item.poster}
              exhName={item.exhName}
              gallery={item.gallery}
              exhPeriodStart={item.exhPeriodStart}
              exhPeriodEnd={item.exhPeriodEnd}
            />
          </TouchableOpacity>
        )}
      />
    </ExhListView>
  );
};

export default SearchExhList;

/** style */
const ExhListView = styled.View`
  flex: 1;
  flex-direction: column;
`;
