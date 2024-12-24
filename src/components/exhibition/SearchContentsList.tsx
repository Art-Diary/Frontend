import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {BACK_COLOR, LIGHT_GREY, MIDDLE_GREY} from '~/components/common/colors';
import {AREA_FONT_SIZE, FONT_NAME} from '~/components/common/style';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {
  useAddSearchContent,
  useDeleteSearchContent,
  useFetchSearchContentList,
} from '~/api/queries/exhibition';
import CustomTouchable from '~/components/common/CustomTouchable';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '../common/modal/ErrorModal';
import {showToast} from '../common/modal/toastConfig';

interface SearchProps {
  handlePage: (value: boolean) => void;
  changeContent: (value: string) => void;
  changeKeyword: (value: string) => void;
}

const SearchContentsList: React.FC<SearchProps> = ({
  handlePage,
  changeContent,
  changeKeyword,
}) => {
  const currentTime = new Date();
  const limit = 10; //보여주는 검색 기록 개수

  // State Management
  const [searchContent, setSearchContent] = useState<string>(''); // 검색할 단어 (검색 기록 추가,업데이트하기 위해 필요)
  const [searchContentId, setSearchContentId] = useState<number>(-1);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // API Hooks
  const {
    data: searchContents,
    isLoading,
    isError,
    refetch,
  } = useFetchSearchContentList(); // search_history_list 가져오기
  const {
    mutate: addSearchContent,
    isLoading: isLoadingAddSearch,
    isError: isErrorAddSearch,
  } = useAddSearchContent(searchContent, currentTime); //검색 기록 추가
  const {
    mutate: deleteSearchContent,
    isLoading: isLoadingDeleteSearch,
    isError: isErrorDeleteSearch,
  } = useDeleteSearchContent(searchContentId); //검색 기록 삭제

  // Effects
  useEffect(() => {
    //DB에서 데이터 추가 or 업데이트
    if (searchContent) {
      addSearchContent(); //검색 기록에 추가
      handlePage(true);
    }
  }, [searchContent]);

  useEffect(() => {
    if (searchContentId != -1) {
      deleteSearchContent(); //검색기록삭제
    }
  }, [searchContentId]);

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    if (isErrorAddSearch || isErrorDeleteSearch) {
      showToast('다시 시도해주세요.');
    }
  }, [isErrorAddSearch, isErrorDeleteSearch]);

  // Handlers
  const onPressPreSearch = (text: string) => {
    changeKeyword(text);
    changeContent(text);
    setSearchContent(text);
  };

  const onPressDelete = (searchId: number) => {
    //searchList에서 삭제할 기록 searchId
    setSearchContentId(searchId);
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Container>
      <LoadingModal
        isLoading={isLoading || isLoadingAddSearch || isLoadingDeleteSearch}
      />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      {searchContents && Object.keys(searchContents).length ? (
        <PreSearch>{'최근검색기록'}</PreSearch>
      ) : (
        <PreSearch>{'최근검색기록이 없습니다.'}</PreSearch>
      )}

      {searchContents &&
        searchContents.slice(0, limit).map((item: any, index: number) => (
          <PreSearchView key={index}>
            <CustomTouchable
              onPress={() => onPressPreSearch(item.searchContent)}>
              <PreSearchList>{item.searchContent}</PreSearchList>
            </CustomTouchable>
            <CustomTouchable onPress={() => onPressDelete(item.searchId)}>
              <PreSearchList>{'X'}</PreSearchList>
            </CustomTouchable>
          </PreSearchView>
        ))}
    </Container>
  );
};

export default SearchContentsList;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

const PreSearchView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${wp(1.8)}px;
  padding-bottom: ${wp(1.8)}px;
  padding-left: ${wp(8.3)}px;
  gap: ${wp(6)}px;
`;

const PreSearch = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${wp(4.5)}px;
  padding-bottom: ${wp(1.5)}px;
  padding-left: ${wp(5.5)}px;
  padding-right: ${wp(5.5)}px;
`;

const PreSearchList = styled.Text`
  color: ${LIGHT_GREY};
  font-size: ${AREA_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  text-align: center;
`;
