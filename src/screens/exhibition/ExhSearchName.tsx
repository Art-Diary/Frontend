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
import SearchContentsListScreen from './SearchContentsListScreen';
import ExhListBySearchContentsScreen from './ExhListBySearchContentsScreen';
import LoadingModal from '~/components/common/modal/LoadingModal';

const ExhSearchName = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>(''); //검색 단어
  const {updateSearchName} = useSearchNameActions();
  const currentTime = new Date();
  const [content, setContent] = useState<string>(''); // 검색할 단어 (검색 기록 추가,업데이트하기 위해 필요)
  const [check, setCheck] = useState<boolean>(false); // 검색 결과 페이지로 돌아가기 위해 필요.
  const [searchContentId, setSearchContentId] = useState<number>(-1);
  const limit = 10; //보여주는 검색 기록 개수
  const [currentPage, setCurrentPage] = useState<boolean>(false); // 최근 기록한 검색어(false), 검색 결과 전시회 리스트(true) 분별 용도

  const {
    mutate: fetchAddSearchContent,
    isLoading: isLoadingAddSearch,
    isError: isErrorAddSearch,
    isSuccess: isSuccessAddSearch,
  } = useFetchAddSearchContent(keyword, currentTime);

  const {
    mutate: fetchDeleteSearchContent,
    isLoading: isLoadingDeleteSearch,
    isError: isErrorDeleteSearch,
    isSuccess: isSuccessDeleteSearch,
  } = useFetchDeleteSearchContent(searchContentId);

  useEffect(() => {
    if (check) {
      navigation.goBack();
    }
  }, [check]);

  const onPressSearch = () => {
    if (checkBlankInKeyword(keyword)) {
      showToast('다시 검색해 주세요.');
    } else {
      fetchAddSearchContent();
      setContent(keyword);
      setCurrentPage(true);
    }
    Keyboard.dismiss();
  };

  return (
    <Container>
      <BackView line={false} children={null} />
      <SearchExhFrame
        searchKeyword={keyword}
        onPressSearch={onPressSearch}
        handleSearchKeyword={setKeyword}
        searchMessage={'전시회를 검색하세요'}
        deleteButton={true}
        handleCurrentPage={setCurrentPage}>
        {currentPage ? (
          <ExhListBySearchContentsScreen searchContent={content} />
        ) : (
          <SearchContentsListScreen
            handlePage={setCurrentPage}
            changeContent={setContent}
            changeKeyword={setKeyword}
          />
        )}
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
