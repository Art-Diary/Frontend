import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import SearchExhFrame from '../../components/exhSearch/SearchExhFrame';
import {showToast} from '~/components/common/modal/toastConfig';
import {checkBlankInKeyword} from '~/utils/keyword';
import {BACK_COLOR} from '~/components/common/colors';
import {useAddSearchContent} from '~/api/queries/exhibition';
import SearchContentsList from '../../components/exhibition/SearchContentsList';
import ExhListBySearchContents from '../../components/exhibition/ExhListBySearchContents';
import LoadingModal from '~/components/common/modal/LoadingModal';

const SearchExhNameScreen = () => {
  const [keyword, setKeyword] = useState<string>(''); //검색 단어
  const currentTime = new Date();
  const [content, setContent] = useState<string>(''); // 검색할 단어 (검색 기록 추가,업데이트하기 위해 필요)
  const [currentPage, setCurrentPage] = useState<boolean>(false); // 최근 기록한 검색어(false), 검색 결과 전시회 리스트(true) 분별 용도

  const {
    mutate: addSearchContent,
    isLoading,
    isError,
    isSuccess,
  } = useAddSearchContent(currentTime);

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해주세요.');
    }
    if (isSuccess) {
      setCurrentPage(true);
    }
  }, [isError, isSuccess]);

  const onPressSearch = () => {
    if (checkBlankInKeyword(keyword)) {
      showToast('다시 검색해 주세요.');
    } else {
      addSearchContent(keyword);
      setContent(keyword);
    }
    Keyboard.dismiss();
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <BackView line={false} children={null} />
      <SearchExhFrame
        searchKeyword={keyword}
        onPressSearch={onPressSearch}
        handleSearchKeyword={setKeyword}
        searchMessage={'전시회를 검색하세요'}
        handleCurrentPage={setCurrentPage}>
        {currentPage ? (
          <ExhListBySearchContents searchContent={content} />
        ) : (
          // history
          <SearchContentsList
            handlePage={setCurrentPage}
            changeContent={setContent}
            changeKeyword={setKeyword}
          />
        )}
      </SearchExhFrame>
    </Container>
  );
};

export default SearchExhNameScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;
