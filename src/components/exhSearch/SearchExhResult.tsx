import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import ExhItemView from '../exhibition/ExhItemView';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';

interface SearchExhResultFrameProps {
  exhList: any[];
  forGathering: boolean;
}

const SearchExhResult: React.FC<SearchExhResultFrameProps> = ({
  exhList,
  forGathering,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const {updateIsUpdate, updateInGathering, resetWriteInfo} =
    useWriteMyDiaryActions();

  const onPressExh = (exhId: number) => {
    updateVisitedExhId(exhId);
    if (forGathering) {
      navigation.navigate('GatheringRoutes', {
        screen: 'NewVisitDateOfExhInGathering',
        params: undefined,
      });
    } else {
      resetWriteInfo();
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
          style={{paddingLeft: wp(2), paddingRight: wp(2)}}
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

export default SearchExhResult;

/** style */
const ExhListView = styled.View`
  flex: 1;
  flex-direction: column;
`;
