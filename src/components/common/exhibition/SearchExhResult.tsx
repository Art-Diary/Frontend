import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import InfoMessageView from '~/components/common/InfoMessageView';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {ExhInfoForList} from '~/types';
import ExhItemView from '~/components/exhibition/ExhItemView';

interface SearchExhResultFrameProps {
  exhList: any[];
  handleExhInfo: (exhInfo: ExhInfoForList) => void;
  handleCloseModal?: () => void;
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
    if (handleCloseModal) {
      handleCloseModal();
    }
  };

  return (
    <ExhListView>
      {exhList.length === 0 ? (
        <InfoMessageView message="검색 결과가 없습니다." />
      ) : (
        <FlatList
          data={exhList}
          renderItem={({item, index}) => (
            <ExhItemView
              exhInfo={{...item}}
              notTouchable={false}
              noLine={index === exhList.length - 1 ? true : false}
              onTouch={() => onPressExh(item)}
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
