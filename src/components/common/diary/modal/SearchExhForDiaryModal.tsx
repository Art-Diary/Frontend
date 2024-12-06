import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {BUTTON_FONT_SIZE, FONT_NAME} from '../../style';
import {DEFAULT_TEXT} from '../../colors';
import {useFetchSearchExhInMyDiary} from '~/api/queries/exhibition';
import {checkBlankInKeyword} from '~/utils/keyword';
import {showToast} from '../../modal/toastConfig';
import {Keyboard} from 'react-native';
import {ExhInfoForList} from '~/types';
import InfoModal from '../../modal/InfoModal';
import SearchExhFrame from '~/components/exhSearch/SearchExhFrame';
import SearchExhResult from '../../exhibition/SearchExhResult';

interface SearchExhForDiaryModalProps {
  handleCloseModal: () => void;
  message: string;
  handleExhInfo: (exhInfo: ExhInfoForList) => void;
  exhId?: number;
}

const SearchExhForDiaryModal: React.FC<SearchExhForDiaryModalProps> = ({
  handleCloseModal,
  message,
  handleExhInfo,
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [exhibitionList, setExhibitionList] = useState([]);
  const [openLoading, setOpenLoading] = useState(false);
  const {
    data: exhList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchSearchExhInMyDiary(searchKeyword);

  useEffect(() => {
    if (isError) {
      showToast('전시회 조회 실패 ;(');
    }
    if (isLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
    if (isSuccess) {
      setExhibitionList(exhList);
    }
  }, [isSuccess, isError, isLoading, exhList]);

  const onPressSearch = () => {
    if (checkBlankInKeyword(searchKeyword)) {
      showToast('다시 검색해 주세요.');
    } else {
      refetch();
    }
    Keyboard.dismiss();
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <Message>{message}</Message>
      <SearchExhFrame
        searchKeyword={searchKeyword}
        handleSearchKeyword={setSearchKeyword}
        onPressSearch={onPressSearch}
        searchMessage="전시회를 검색해주세요.">
        <SearchExhResult
          exhList={exhibitionList}
          handleExhInfo={handleExhInfo}
          handleCloseModal={handleCloseModal}
        />
      </SearchExhFrame>
    </InfoModal>
  );
};

export default SearchExhForDiaryModal;

/** style */
const Message = styled.Text`
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-top: ${hp(1)}px;
  padding-left: ${wp(4)}px;
  padding-right: ${wp(4)}px;
`;
