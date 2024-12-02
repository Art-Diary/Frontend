import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {DEFAULT_TEXT, MIDDLE_GREY} from '../colors';
import {FONT_NAME} from '../style';
import {SearchButtonIcon} from '../icon';
import CustomTouchable from '../CustomTouchable';
import {ExhInfoForList} from '~/types';
import SearchExhForDiaryModal from './modal/SearchExhForDiaryModal';
import ExhItemView from '~/components/exhibition/ExhItemView';

interface SearchExhForDiaryProps {
  exhInfo?: ExhInfoForList;
  handleExhId: (exhId: number) => void;
  exhId?: number;
}

const SearchExhForDiary: React.FC<SearchExhForDiaryProps> = ({
  exhInfo,
  handleExhId,
  exhId,
}) => {
  const [exhInfoForList, setExhInfoForList] = useState<ExhInfoForList>();
  const [openModal, setOpenModal] = useState(false);

  const onPressSearch = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setExhInfoForList(exhInfo);
  }, [exhInfo]);

  useEffect(() => {
    if (exhInfoForList) {
      handleExhId(exhInfoForList?.exhId);
    }
  }, [exhInfoForList]);

  return (
    <Container>
      <SectionWrapper>
        <SectionName>전시회</SectionName>
        {!exhInfo && (
          <CustomTouchable onPress={onPressSearch}>
            <SearchButtonIcon />
          </CustomTouchable>
        )}
      </SectionWrapper>
      {/* 선택한 전시회 정보 */}
      {!exhInfoForList ? (
        <NoData>
          <NoDataText>전시회를 선택해주세요.</NoDataText>
        </NoData>
      ) : (
        <ExhItemView exhInfo={exhInfoForList} notTouchable noLine></ExhItemView>
      )}
      {/* 전시회 검색 모달 */}
      {openModal && (
        <SearchExhForDiaryModal
          handleCloseModal={closeModal}
          message={'전시회 검색'}
          handleExhInfo={setExhInfoForList}
          exhId={exhId}
        />
      )}
    </Container>
  );
};

export default SearchExhForDiary;

/** style */
const Container = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${wp(3)}px;
`;

const SectionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SectionName = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const NoData = styled.View`
  align-items: center;
  padding-top: ${hp(2.2)}px;
  padding-bottom: ${hp(2.2)}px;
`;

const NoDataText = styled.Text`
  font-size: ${rf(16)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
