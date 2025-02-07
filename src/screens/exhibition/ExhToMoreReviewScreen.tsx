import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {RefreshControl, ScrollView} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {useFetchDiaryListForExh} from '~/api/queries/exhibition';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {
  EmptyStarIcon,
  FullStarIcon,
  WriteDiaryButtonIcon,
} from '~/components/common/icon';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';
import {DEFAULT_IMAGE} from '@env';
import CustomTouchable from '~/components/common/CustomTouchable';
import BackView from '~/components/common/BackView';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

type RootStackParamList = {
  ExhToMoreReview: {exhId: number};
};

type ExhToMoreReviewProp = RouteProp<RootStackParamList, 'ExhToMoreReview'>;

interface Props {
  route: ExhToMoreReviewProp;
}

const ExhToMoreReviewScreen: React.FC<Props> = ({route}) => {
  const limit = 10; // 한 페이지에 보이는 리뷰 개수
  const PAGE_GROUP_SIZE = 5; // 한 번에 보여줄 페이지 번호 개수
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions(); //exhId 넘겨주기
  const {exhId} = route.params;
  const {updateIsUpdate, updateInGathering, resetWriteInfo} =
    useWriteMyDiaryActions();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();

  // State Management
  const [page, setPage] = useState<number>(1); //현재 페이지
  const [offset, setOffset] = useState<number>(0); //해당 페이지의 첫번째 인덱스
  const [avgRate, setAvgRate] = useState<string>();
  const [avgNumber, setAvgNumber] = useState<number>(0);
  const [numPagesArr, setNumPagesArr] = useState<number[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // API Hooks
  const {
    data: diaryData,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchDiaryListForExh(exhId);

  // Effects
  useEffect(() => {
    if (isFocused) {
      refetch();
      if (tabIdentifierInfo.tab !== 'exhibitionMoreReview') {
        updateTab('exhibitionMoreReview');
      }
    }
  }, [isFocused]);

  useEffect(() => {
    setOffset((page - 1) * limit);

    // 시작 페이지와 끝 페이지 계산
    let startPage = 1;
    let endPage = Math.min(PAGE_GROUP_SIZE, numPages);

    if (page > 3 && page <= numPages - 3) {
      startPage = page - 2;
      endPage = page + 2;
    } else if (page > numPages - 3) {
      startPage = Math.max(1, numPages - 4);
      endPage = numPages;
    }

    const tmp = [];
    for (let i = startPage; i <= endPage; i++) {
      tmp.push(i);
    }
    setNumPagesArr(tmp);
  }, [page, numPages]);

  useEffect(() => {
    if (isSuccess) {
      const totalItems = diaryData.length;
      const newNumPages = Math.ceil(totalItems / limit);

      // 페이지 수 감소로 현재 페이지가 초과된 경우 처리
      if (page > newNumPages) {
        setPage(newNumPages);
      }
      setNumPages(Math.ceil(diaryData.length / limit));
      //기록들 평균
      var tmp: number = 0;
      diaryData.map((item: any) => (tmp += item.rate));
      console.log(
        '기록들 평균 확인',
        tmp,
        diaryData.length,
        tmp / diaryData.length,
      );
      setAvgNumber(diaryData.length);
      if (tmp === 0) {
        setAvgRate('0.0');
      } else {
        tmp = tmp / diaryData.length;
        var avg: string = tmp.toFixed(2);
        setAvgRate(avg);
      }
      updateVisitedExhId(exhId);
    }
  }, [isSuccess, diaryData]);

  useEffect(() => {
    if (refreshing) {
      handleRefetch();
    }
  }, [refreshing]);

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  // Handlers
  const handleRefetch = async () => {
    await refetch().then(() => {
      setRefreshing(false);
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  const changeDateType = (visitDate: string | undefined) => {
    if (visitDate === undefined) return '방문날짜모름';
    else return visitDate;
  };

  const showRate = (rate: string) => {
    const result = [];
    const rateInt = parseInt(rate);
    let num = 0;
    for (let i = 0; i < rateInt; i++) {
      result.push(<FullStarIcon customHeight={2.55} key={`${num++}`} />);
    }
    for (let i = 0; i < 5 - rateInt; i++) {
      result.push(<EmptyStarIcon customHeight={2.55} key={`${num++}`} />);
    }
    return result;
  };

  const onPressButton = () => {
    resetWriteInfo();
    updateIsUpdate(false);
    updateInGathering(false, null);
    navigation.navigate('CreateExhVisitedDate', {exhId: exhId});
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      <BackView title="기록" line={false}>
        <ButtonView>
          <CustomTouchable
            onPress={onPressButton}
            style={{paddingRight: 10, paddingVertical: 3}}>
            <WriteDiaryButtonIcon />
          </CustomTouchable>
        </ButtonView>
      </BackView>
      <ContentsContainer>
        <AvgRateView>
          <FullStarIcon customHeight={4.3} />
          <AvgTitle>{avgRate}</AvgTitle>
          <AvgText>
            {'(기록 '}
            {avgNumber}
            {'개 평점)'}
          </AvgText>
        </AvgRateView>
        <ReView>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }>
            {diaryData && diaryData.length > 0 ? (
              diaryData
                .slice(offset, offset + limit)
                .map((item: any, index: number) => (
                  <ReViewWrapper key={index}>
                    <ReViewList
                      activeOpacity={0.6}
                      key={index}
                      onPress={() =>
                        navigation.navigate('ExhToDiary', {
                          diary: item,
                        })
                      }>
                      <ReviewImage
                        source={{uri: `${item.thumbnail ?? DEFAULT_IMAGE}`}}
                        resizeMode="cover"
                        alt={'이미지 읽기 실패'}
                      />
                      <ReviewTextView>
                        <ReviewTitle>
                          {'"'}
                          {item.title}
                          {'"'}
                        </ReviewTitle>
                        <TextView>
                          <SubTextView key={index}>
                            <ReviewName>{item.nickname}</ReviewName>
                            <ReviewRate>{showRate(item.rate)}</ReviewRate>
                          </SubTextView>
                          <ReviewDate>
                            {changeDateType(item.writeDate)}
                          </ReviewDate>
                        </TextView>
                      </ReviewTextView>
                    </ReViewList>
                  </ReViewWrapper>
                ))
            ) : (
              <NoReView>
                <AvgText>기록이 아직 없습니다.</AvgText>
              </NoReView>
            )}
          </ScrollView>
        </ReView>
        <PageNumberView>
          <CustomTouchable
            onPress={() => setPage(page - 1)}
            disabled={page === 1}>
            <PageNumber>{'<'}</PageNumber>
          </CustomTouchable>

          {numPagesArr.map(item => (
            <CustomTouchable key={item} onPress={() => setPage(item)}>
              {item === page ? (
                <CurrentPageNumber>{item}</CurrentPageNumber>
              ) : (
                <PageNumber>{item}</PageNumber>
              )}
            </CustomTouchable>
          ))}

          <CustomTouchable
            onPress={() => setPage(page + 1)}
            disabled={page === numPages}>
            <PageNumber>{'>'}</PageNumber>
          </CustomTouchable>
        </PageNumberView>
      </ContentsContainer>
    </Container>
  );
};

export default ExhToMoreReviewScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

const ButtonView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(1.5)}px;
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-bottom: ${hp(1.5)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
  gap: ${hp(0.2)}px;
`;

// review section
const AvgRateView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${wp(1.4)}px;
  padding-bottom: ${wp(2.5)}px;
  gap: ${wp(0.8)}px;
`;

const AvgTitle = styled.Text`
  font-size: ${rf(20)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const AvgText = styled.Text`
  font-size: ${rf(17)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;

// review list
const ReViewWrapper = styled.View`
  padding-top: ${wp(1)}px;
  padding-bottom: ${wp(1)}px;
  border-bottom-color: ${LIGHT_GREY};
  border-bottom-width: ${wp(0.3)}px;
`;

const ReView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const NoReView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ReViewList = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-top: ${wp(1.4)}px;
  padding-bottom: ${wp(1.4)}px;
  gap: ${wp(2)}px;
`;

const ReviewImage = styled.Image`
  width: ${wp(11)}px;
  height: ${wp(11)}px;
  border-radius: ${wp(50)}px; /* width의 절반을 사용하여 원형으로 만듦 */
`;

const ReviewTextView = styled.View`
  flex: 1;
  flex-direction: column;
  gap: ${wp(1.2)}px;
`;

const ReviewTitle = styled.Text`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const TextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubTextView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(0.8)}px;
`;

const ReviewName = styled.Text`
  font-size: ${rf(13.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const ReviewRate = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ReviewDate = styled.Text`
  font-size: ${rf(11)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  align-items: center;
`;

// page
const PageNumberView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

const PageNumber = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
`;

const CurrentPageNumber = styled.Text`
  font-size: ${rf(17)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
`;
