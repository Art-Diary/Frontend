import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useQueryClient} from 'react-query';
import styled from 'styled-components/native';
import {
  exhibitionQueryKeys,
  useFetchSearchExhInMyDiary,
} from '~/api/queries/exhibition';
import BackView from '~/components/common/BackView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {showToast} from '~/components/common/modal/toastConfig';
import SearchExhFrame from '~/components/exhSearch/SearchExhFrame';
import SearchExhList from '~/screens/mydiary/SearchExhList';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';

const SearchAddVisitExhInGatheringScreen = () => {
  const queryClient = useQueryClient();
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
      showToast('에러 발생 ;(');
    }
    if (isLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
    if (isSuccess) {
      setExhibitionList(exhList);
      queryClient.removeQueries(
        exhibitionQueryKeys.fetchSearchExhInMyDiary(searchKeyword),
      );
    }
  }, [isSuccess, isError, isLoading]);

  const onPressSearch = () => {
    if (checkBlankInKeyword(searchKeyword)) {
      showToast('다시 검색해 주세요');
    } else {
      refetch();
    }
    Keyboard.dismiss();
  };

  return (
    <Container>
      <BackView
        line={true}
        children={null}
        title={'모임에 추가할 전시회 검색'}
      />
      {/* 검색창 */}
      <SearchExhFrame
        searchKeyword={searchKeyword}
        onPressSearch={onPressSearch}
        handleSearchKeyword={setSearchKeyword}>
        {/* 전시회 목록 */}
        <SearchExhList exhList={exhibitionList} forGathering={false} />
      </SearchExhFrame>
      {openLoading && <LoadingModal message={'전시회 조회 중 :)'} />}
    </Container>
  );
};

export default SearchAddVisitExhInGatheringScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
`;
