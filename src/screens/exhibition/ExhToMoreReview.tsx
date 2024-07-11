import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {TouchableOpacity} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {useFetchDiaryListForExh} from '~/api/queries/exhibition';
import {JoinDateWithDot} from '~/utils/Date';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {EmptyStarIcon, FullStarIcon} from '~/components/common/icon';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';

type RootStackParamList = {
  ExhToMoreReview: {exhId: number};
};

type ExhToMoreReviewProp = RouteProp<RootStackParamList, 'ExhToMoreReview'>;

interface Props {
  route: ExhToMoreReviewProp;
}

const ExhToMoreReview: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {updateVisitedExhId} = useVisitedExhIdActions(); //exhId 넘겨주기
  const {exhId} = route.params;
  const limit = 1; // 한 페이지에 보이는 리뷰 개수 -[변경 예정]
  const [page, setPage] = useState<number>(1); //현재 페이지
  const offset = (page - 1) * limit; //해당 페이지의 첫번째 인덱스
  const [avgRate, setAvgRate] = useState<string>();
  const [avgNumber, setAvgNumber] = useState<number>(0);
  const [numPagesArr, setNumPagesArr] = useState<number[]>([]);

  const {
    data: diaryData,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchDiaryListForExh(exhId);
  const [total, setTotal] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    if (isSuccess) {
      setTotal(diaryData.length);
      setNumPages(Math.ceil(diaryData.length / limit));
    }
  }, [isSuccess, diaryData]);

  useEffect(() => {
    //numPage 변경 후, 변경
    let tmp = new Array(numPages).fill(0);
    setNumPagesArr(tmp);
  }, [numPages]);

  useEffect(() => {
    //기록들 평균
    var tmp: number = 0;
    if (isSuccess) {
      diaryData.map((item: any) => (tmp += item.rate));
      console.log(
        '기록들 평균 확인',
        tmp,
        diaryData.length,
        tmp / diaryData.length,
      );
      setAvgNumber(diaryData.length);
      if (tmp === 0) {
        setAvgRate('기록이 아직 없습니다');
      } else {
        tmp = tmp / diaryData.length;
        var avg: string = tmp.toFixed(2);
        setAvgRate(avg);
      }
      updateVisitedExhId(exhId);
    }
  }, [isSuccess, diaryData]);

  const changeDateType = (visitDate: number[] | undefined) => {
    if (visitDate === undefined) return '방문날짜모름';
    else return JoinDateWithDot(visitDate);
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

  return (
    <Container>
      <Title>{'기록'} </Title>
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
        {diaryData &&
          diaryData
            .slice(offset, offset + limit)
            .map((item: any, index: number) => (
              <>
                <ReViewList
                  key={index}
                  onPress={() =>
                    navigation.navigate('ExhToDiary', {
                      diary: item,
                    })
                  }>
                  <ReviewImage
                    source={{
                      uri: `data:image/png;base64,${item.thumbnail}`,
                    }}
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
                      <ReviewDate>{changeDateType(item.writeDate)}</ReviewDate>
                    </TextView>
                  </ReviewTextView>
                </ReViewList>
                <BorderView />
              </>
            ))}
      </ReView>
      <PageNumberView>
        <TouchableOpacity
          onPress={() => setPage(page - 1)}
          disabled={page === 1}>
          <PageNumber>{'<'}</PageNumber>
        </TouchableOpacity>

        {numPagesArr.map((item, index) => (
          <TouchableOpacity key={index + 1} onPress={() => setPage(index + 1)}>
            {index + 1 == page ? (
              <CurrentPageNumber>{index + 1}</CurrentPageNumber>
            ) : (
              <PageNumber>{index + 1}</PageNumber>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => setPage(page + 1)}
          disabled={page === numPages}>
          <PageNumber>{'>'}</PageNumber>
        </TouchableOpacity>
      </PageNumberView>
    </Container>
  );
};

export default ExhToMoreReview;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: white;
  align-items: center;
  padding: ${wp(5.2)}px;
  gap: ${wp(2)}px;
`;

const Title = styled.Text`
  font-size: ${rf(19)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
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
const ReView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: ${wp(2)}px;
`;

const ReViewList = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-top: ${wp(1.4)}px;
  padding-bottom: ${wp(1.4)}px;
  gap: ${wp(2)}px;
`;

const BorderView = styled.View`
  width: 100%;
  background-color: ${LIGHT_GREY};
  height: ${wp(0.3)}px;
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
