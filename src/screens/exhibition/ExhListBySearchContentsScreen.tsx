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
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorMessageView from '~/components/common/ErrorMessageView';

interface SearchProps {
  searchContent: string;
}

const ExhListBySearchContentsScreen: React.FC<SearchProps> = ({
  searchContent,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  //search_list 가져오기
  const {
    data: searchContents,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchExhListBySearchContent(searchContent);

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  if (isError) {
    return <ErrorMessageView message={'검색 결과 조회 실패 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message="검색 중:)" />;
  }

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
