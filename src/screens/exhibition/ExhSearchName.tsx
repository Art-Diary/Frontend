import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import SearchExhFrame from '../../components/exhSearch/SearchExhFrame';
import {showToast} from '~/components/common/modal/toastConfig';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useSearchNameActions} from '~/zustand/exhibition/exhibition';
import {checkBlankInKeyword} from '~/utils/keyword';
import {BACK_COLOR, LIGHT_GREY, MIDDLE_GREY} from '~/components/common/colors';
import {AREA_FONT_SIZE, DASH_WIDTH, FONT_NAME} from '~/components/common/style';
import {
  useFetchAddSearchContent,
  useFetchDeleteSearchContent,
  useFetchSearchContentList,
} from '~/api/queries/exhibition';
import CustomTouchable from '~/components/common/CustomTouchable';
import SearchContentsListScreen from './SearchContentsListScreen';
import ExhListBySearchContentsScreen from './ExhListBySearchContentsScreen';

const ExhSearchName = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const {updateSearchName} = useSearchNameActions();
  //search_list 가져오기
  const {
    data: examples,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchSearchContentList();
  const currentTime = new Date();
  const [content, setContent] = useState<string>(''); // 검색할 단어 (검색 기록 추가,업데이트하기 위해 필요)
  const [check, setCheck] = useState<boolean>(false); // 검색 결과 페이지로 돌아가기 위해 필요.
  const [searchContentId, setSearchContentId] = useState<number>(-1);
  const limit = 10; //보여주는 검색 기록 개수
  const [currentPage, setCurrentPage] = useState<boolean>(false); // 최근 기록한 검색어(false), 검색 결과 전시회 리스트(true) 분별 용도
  //검색 기록 추가
  const {
    mutate: fetchAddSearchContent,
    isLoading: isLoadingAddSearch,
    isError: isErrorAddSearch,
    isSuccess: isSuccessAddSearch,
  } = useFetchAddSearchContent(content, currentTime);

  const {
    mutate: fetchDeleteSearchContent,
    isLoading: isLoadingDeleteSearch,
    isError: isErrorDeleteSearch,
    isSuccess: isSuccessDeleteSearch,
  } = useFetchDeleteSearchContent(searchContentId);

  useEffect(() => {
    //DB에서 데이터 추가 or 업데이트

    if (content) {
      fetchAddSearchContent();
      // setContent(content); //setCheck(true);
      // setSearchKeyword(content);
      console.log('content?', content);
    }
  }, [content]);

  useEffect(() => {
    //console.log(Object.keys(examples).length);
  }, [examples]);

  useEffect(() => {
    if (check) {
      navigation.goBack();
    }
  }, [check]);

  useEffect(() => {
    if (searchContentId != -1) {
      fetchDeleteSearchContent(); //검색기록삭제
    }
  }, [searchContentId]);

  const onPressSearch = () => {
    if (checkBlankInKeyword(searchKeyword)) {
      showToast('다시 검색해 주세요.');
    } else {
      setContent(searchKeyword);
      // setKeyword(searchKeyword);
      setCurrentPage(true);
      //updateSearchName(searchKeyword);
    }
    Keyboard.dismiss();
  };

  /* const onPressPreSearch = (text: string) => {
    //setKeyword(text);
    //setContent(text);
    //updateSearchName(text);
  };

  const onPressDelete = (searchId: number) => {
    //searchList에서 삭제할 기록 searchId
    setSearchContentId(searchId);
  };*/

  return (
    <Container>
      <BackView line={false} children={null} />
      <SearchExhFrame
        searchKeyword={searchKeyword}
        onPressSearch={onPressSearch}
        handleSearchKeyword={setSearchKeyword}>
        {/* <ExhListBySearchContentsScreen searchContent={content} /> */}
        {/* <SearchContentsListScreen /> */}
        {currentPage ? (
          <ExhListBySearchContentsScreen searchContent={content} />
        ) : (
          <SearchContentsListScreen
            currentPage={currentPage}
            handlePage={setCurrentPage}
            changeContent={setContent}
            // setSearchKeyword 추가
          />
        )}

        {/* <PreSearch>{'최근검색기록'}</PreSearch>
        {examples && Object.keys(examples).length ? (
          examples.slice(0, limit).map((item: any, index: number) => (
            <PreSearchView key={index}>
              <CustomTouchable
                onPress={() => onPressPreSearch(item.searchContent)}>
                <PreSearchList>{item.searchContent}</PreSearchList>
              </CustomTouchable>
              <CustomTouchable onPress={() => onPressDelete(item.searchId)}>
                <PreSearchList>{'X'}</PreSearchList>
              </CustomTouchable>
            </PreSearchView>
          ))
        ) : (
          <PreSearchView>
            <PreSearch>{'최근검색기록이 없습니다.'}</PreSearch>
          </PreSearchView>
        )} */}
      </SearchExhFrame>
    </Container>
  );
};

export default ExhSearchName;

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
