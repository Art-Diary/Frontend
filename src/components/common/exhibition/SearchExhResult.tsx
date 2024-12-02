import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {ExhInfoForList} from '~/types';
import ExhItemView from '~/components/exhibition/ExhItemView';

interface SearchExhResultFrameProps {
  exhList: any[];
  handleExhInfo: (exhInfo: ExhInfoForList) => void;
  handleCloseModal: () => void;
}

const SearchExhResult: React.FC<SearchExhResultFrameProps> = ({
  exhList,
  handleExhInfo,
  handleCloseModal,
}) => {
  const {updateVisitedExhId} = useVisitedExhIdActions();

  const onPressExh = (item: ExhInfoForList) => {
    updateVisitedExhId(item.exhId);
    handleExhInfo(item);
    handleCloseModal();
  };

  return (
    <ExhListView>
      {exhList.length === 0 ? (
        <ErrorMessageView message="검색 결과가 없습니다." />
      ) : (
        <FlatList
          data={exhList}
          renderItem={({item, index}) => (
            <ExhItemWrapper>
              <ExhItemView
                exhInfo={{...item}}
                notTouchable={false}
                onTouch={() => onPressExh(item)}
              />
            </ExhItemWrapper>
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

const ExhItemWrapper = styled.View`
  padding-top: ${wp(1.8)}px;
`;
