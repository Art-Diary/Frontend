import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {
  EmptyStarIcon,
  FullStarIcon,
  WriteDiaryButtonIcon,
} from '~/components/common/icon';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';
import {DEFAULT_IMAGE} from '@env';
import CustomTouchable from '~/components/common/CustomTouchable';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';

interface Props {
  exhId: number;
  diaryData: any[];
}

const ExhReviewList: React.FC<Props> = ({exhId, diaryData}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions(); //exhId 넘겨주기
  const [avgRate, setAvgRate] = useState<string>();
  const [avgNumber, setAvgNumber] = useState<number>(0);
  const limit = 4; // 한 페이지에 보이는 리뷰 개수
  const {updateIsUpdate, updateInGathering, resetWriteInfo} =
    useWriteMyDiaryActions();

  useEffect(() => {
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
      setAvgRate('기록이 아직 없습니다');
    } else {
      tmp = tmp / diaryData.length;
      var avg: string = tmp.toFixed(2);
      setAvgRate(avg);
    }
    updateVisitedExhId(exhId);
  }, [diaryData]);

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

  const clickMoreReview = () => {
    console.log('더 많은 리뷰', exhId);
    navigation.navigate('ExhToMoreReview', {
      exhId: exhId,
    });
  };

  const onPressButton = () => {
    resetWriteInfo();
    updateIsUpdate(false);
    updateInGathering(false, null);
    navigation.navigate('CreateExhVisitedDate', {exhId: exhId});
  };

  return (
    <ReView>
      <TitleWrapper>
        <TitleView>
          <Title>{'기록'}</Title>
        </TitleView>
        <CustomTouchable onPress={onPressButton}>
          <WriteDiaryButtonIcon />
        </CustomTouchable>
      </TitleWrapper>
      {avgNumber === 0 ? (
        <TitleTopView>
          <NonAvg> {'기록이 아직 없습니다.'}</NonAvg>
        </TitleTopView>
      ) : (
        <AvgRateView>
          <FullStarIcon customHeight={4.3} />
          <AvgTitle>{avgRate}</AvgTitle>
          <AvgText>
            {'(기록 '}
            {avgNumber}
            {'개 평점)'}
          </AvgText>
        </AvgRateView>
      )}

      {diaryData &&
        diaryData.slice(0, limit).map((item: any, index: number) => (
          <ReViewWrapper key={index}>
            <ReViewList
              activeOpacity={0.6}
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
                  <ReviewDate>{changeDateType(item.writeDate)}</ReviewDate>
                </TextView>
              </ReviewTextView>
            </ReViewList>
          </ReViewWrapper>
        ))}
      {avgNumber > limit && (
        <MoreReview activeOpacity={0.6} onPress={clickMoreReview}>
          <MoreReviewTitle>{'기록들 더보기 >'}</MoreReviewTitle>
        </MoreReview>
      )}
    </ReView>
  );
};

export default ExhReviewList;

/** style */
const TitleWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${wp(1.4)}px;
  justify-content: space-between;
  padding-right: ${wp(4)}px;
`;

const TitleView = styled.View`
  align-items: center;
  width: 100%;
`;

const Title = styled.Text`
  font-size: ${rf(19)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

// review section
const ReViewWrapper = styled.View`
  padding-top: ${wp(1)}px;
  padding-bottom: ${wp(1)}px;
  border-bottom-color: ${LIGHT_GREY};
  border-bottom-width: ${wp(0.3)}px;
`;

const ReView = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${wp(5.2)}px;
  margin-bottom: ${hp(2)}px;
`;

const TitleTopView = styled.View`
  align-items: center;
  padding: ${wp(4.5)}px;
`;

const NonAvg = styled.Text`
  font-size: ${rf(16)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;

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

// more review
const MoreReview = styled.TouchableOpacity`
  padding-top: ${wp(2.9)}px;
`;

const MoreReviewTitle = styled.Text`
  font-size: ${rf(15)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;
