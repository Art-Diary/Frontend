import React, {ReactNode, useEffect, useState} from 'react';
import {Keyboard, ScrollView, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {BACK_COLOR, LIGHT_GREY, MIDDLE_GREY} from '~/components/common/colors';
import {AREA_FONT_SIZE, DASH_WIDTH, FONT_NAME} from '~/components/common/style';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {
  useFetchAddSearchContent,
  useFetchDeleteSearchContent,
  useFetchSearchContentList,
  useFetchExhListBySearchContent,
} from '~/api/queries/exhibition';
import CustomTouchable from '~/components/common/CustomTouchable';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';

interface SearchProps {
  searchContent: string;
}

const ExhListBySearchContentsScreen: React.FC<SearchProps> = ({
  searchContent,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const currentTime = new Date();
  const [content, setContent] = useState<string>(''); // 검색할 단어 (검색 기록 추가,업데이트하기 위해 필요)
  const [check, setCheck] = useState<boolean>(false); // 검색 결과 페이지로 돌아가기 위해 필요.
  const [searchContentId, setSearchContentId] = useState<number>(-1);
  const limit = 10; //보여주는 검색 기록 개수
  const [refreshing, setRefreshing] = useState(false);

  //search_list 가져오기
  const {
    data: searchContents,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchExhListBySearchContent(searchContent);

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

  // useEffect(() => {
  //   //DB에서 데이터 추가 or 업데이트

  //   if (content) {
  //     fetchAddSearchContent();
  //     setCheck(true);
  //   }
  // }, [content]);

  useEffect(() => {
    if (searchContentId != -1) {
      fetchDeleteSearchContent(); //검색기록삭제
    }
  }, [searchContentId]);

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  // const onPressPreSearch = (text: string) => {
  //   //setKeyword(text);
  //   setContent(text);
  //   // updateSearchName(text);
  // };

  // const onPressDelete = (searchId: number) => {
  //   //searchList에서 삭제할 기록 searchId
  //   setSearchContentId(searchId);
  // };

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={{flex: 1}}
        scrollEventThrottle={200}>
        {searchContents && Object.keys(searchContents).length ? (
          <PreSearch>
            {'검색 결과 ('}
            {Object.keys(searchContents).length}
            {'개)'}
          </PreSearch>
        ) : (
          <PreSearch>{'해당 검색 결과가 없습니다.'}</PreSearch>
        )}
        {searchContents &&
          searchContents.map((item: any, index: number) => (
            <ExhItemView
              key={index}
              exhInfo={{...item}}
              noLine={index === searchContents.length - 1 ? true : false}
              notTouchable={false}
              onTouch={() =>
                navigation.navigate('ExhDetailInfo', {
                  exhId: item.exhId,
                })
              }
            />
          ))}
      </ScrollView>
    </Container>
  );
};

export default ExhListBySearchContentsScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
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
