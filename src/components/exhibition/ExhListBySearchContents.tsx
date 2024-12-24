import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {BACK_COLOR, MIDDLE_GREY} from '~/components/common/colors';
import {AREA_FONT_SIZE, FONT_NAME} from '~/components/common/style';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {useFetchExhListBySearchContent} from '~/api/queries/exhibition';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '../common/modal/ErrorModal';

interface SearchProps {
  searchContent: string;
}

const ExhListBySearchContents: React.FC<SearchProps> = ({searchContent}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  // search_result_list 가져오기
  const {
    data: searchContents,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchExhListBySearchContent(searchContent);

  // Effects
  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  // Handlers
  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      <ScrollView style={{flex: 1}} scrollEventThrottle={200}>
        {searchContents && searchContents.length ? (
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

export default ExhListBySearchContents;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
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
