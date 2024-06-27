import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {TouchableOpacity} from 'react-native';
import {
  FillStarSmall,
  EmptyStarSmall,
  FillStarIcon,
} from '~/assets/images/index';
import {RootStackNavigationProp} from '~/App';
import {useFetchDiaryListForExh} from '~/api/queries/exhibition';
import {JoinDateWithDot} from '~/utils/Date';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';

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
    setTotal(diaryData.length);
    setNumPages(Math.ceil(diaryData.length / limit));
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
      result.push(<FillStarSmall key={`${num++}`} />);
    }
    for (let i = 0; i < 5 - rateInt; i++) {
      result.push(<EmptyStarSmall key={`${num++}`} />);
    }
    return result;
  };
  return (
    <Container>
      <TitleView>
        <TitleTopView>
          <Title>{'기록'} </Title>
        </TitleTopView>
        <AvgRateView>
          <FillStarIcon />
          <AvgTitle> {avgRate}</AvgTitle>
          <AvgText>
            {' (기록 '}
            {avgNumber}
            {'개 평점)'}
          </AvgText>
        </AvgRateView>
      </TitleView>
      <ReView>
        {diaryData &&
          diaryData
            .slice(offset, offset + limit)
            .map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('ExhToDiary', {
                    diary: item,
                  })
                }>
                <ReViewList>
                  <ReviewImage
                    source={{
                      uri: `data:image/png;base64,${item.thumbnail}`,
                    }}
                    resizeMode="cover"
                    alt={'이미지 읽기 실패'}
                  />
                  <ReviewTextView>
                    <TextView>
                      <ReviewTitle>
                        {'"'}
                        {item.title}
                        {'"'}
                      </ReviewTitle>
                    </TextView>
                    <TextView>
                      <SubTextView key={index}>
                        <ReviewName>{item.nickname}</ReviewName>
                        <ReviewRate>{showRate(item.rate)}</ReviewRate>
                      </SubTextView>
                      <ReviewDate>{changeDateType(item.writeDate)}</ReviewDate>
                    </TextView>
                  </ReviewTextView>
                </ReViewList>
              </TouchableOpacity>
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
  background-color: #ffffff;
  padding: ${wp(10)}px;
`;

const Title = styled.Text`
  font-size: ${fp(19)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const AvgTitle = styled.Text`
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding: ${wp(1)}px;
`;

const AvgText = styled.Text`
  font-size: ${fp(13)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
  padding: ${wp(1)}px;
`;

const ReView = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${wp(15)}px;
  background-color: #ffffff;
`;

const TitleView = styled.View`
  flex-direction: column;
`;

const TitleTopView = styled.View`
  flex-direction: column;
  align-items: center;
  padding: ${wp(15)}px;
`;

const AvgRateView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
  padding-top: ${wp(5)}px;
`;

const ReViewList = styled.View`
  flex-direction: row;
  padding-top: ${wp(5)}px;
  padding-bottom: ${wp(0)}px;
  background-color: #ffffff;
  border-bottom-width: ${wp(1)}px;
  border-bottom-color: #979797;
`;

const ReviewTitle = styled.Text`
  font-size: ${fp(15)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding: ${wp(1)}px;
`;

const ReviewName = styled.Text`
  font-size: ${fp(12)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding: ${wp(1)}px;
`;

const ReviewRate = styled.Text`
  font-size: ${fp(14)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding: ${wp(1)}px;
  padding-left: ${wp(3)}px;
`;

const ReviewDate = styled.Text`
  font-size: ${fp(10)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
  padding: ${wp(1)}px;
`;

const ReviewTextView = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${wp(5)}px;
`;

const TextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SubTextView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${wp(1)}px;
`;

const ReviewImage = styled.Image`
  width: ${wp(36)}px;
  height: ${hp(36)}px;
  border-radius: ${wp(18)}px; /* width의 절반을 사용하여 원형으로 만듦 */
`;

const PageNumberView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: ${wp(1)}px;
`;

const PageNumber = styled.Text`
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding: ${wp(7)}px;
`;

const CurrentPageNumber = styled.Text`
  font-size: ${fp(17)}px;
  color: #ff6f61;
  font-family: 'omyu pretty';
  padding: ${wp(7)}px;
`;
