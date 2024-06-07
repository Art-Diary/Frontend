import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import ExhItemView from '../../components/exhibition/ExhItemView';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';

interface SearchExhListProps {
  exhList: any[];
  forGathering: boolean;
}

const SearchExhList: React.FC<SearchExhListProps> = ({
  exhList,
  forGathering,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const {updateIsUpdate, updateInGathering} = useWriteMyDiaryActions();

  const onPressExh = (exhId: number) => {
    updateVisitedExhId(exhId);
    if (forGathering) {
      navigation.navigate('GatheringRoutes', {
        screen: 'NewVisitDateOfExhInGathering',
        params: undefined,
      });
    } else {
      updateIsUpdate(false);
      updateInGathering(false, null);
      navigation.navigate('AddMyVisitDateRoutes');
    }
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
              noLine={index === exhList.length - 1 ? true : false}
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
