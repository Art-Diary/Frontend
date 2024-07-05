import React, {useEffect, useState} from 'react';
import {TouchableOpacity, BackHandler, Linking, Alert} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {showToast} from '~/components/common/modal/toastConfig';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {
  useFetchDiaryListForExh,
  useFetchExhDetailInfo,
} from '~/api/queries/exhibition';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useAddLike, useDeleteLike} from '~/api/queries/exhibition';
import {useIsFocused} from '@react-navigation/native';
import {JoinDateWithDot, dateToString} from '~/utils/Date';
//import ExhShareModal from './ExhShareModal';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import ExhShare from './ExhShare';
import {
  BackButtonIcon,
  EmptyHeartIcon,
  FullHeartIcon,
  EmptyStarIcon,
  FullStarIcon,
  MoreContentsIcon,
  ReduceContentsIcon,
  CalendarShareIcon,
  HomepageIcon,
} from '~/components/common/icon';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {DASH_WIDTH, FONT_NAME} from '~/components/common/style';

type RootStackParamList = {
  ExhDetailInfo: {exhId: number};
};

type ExhDetailInfoScreenRouteProp = RouteProp<
  RootStackParamList,
  'ExhDetailInfo'
>;

interface Props {
  route: ExhDetailInfoScreenRouteProp;
}

const ExhDetailInfo: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {exhId} = route.params;
  const {data, isLoading, isError, isSuccess, refetch} =
    useFetchExhDetailInfo(exhId);

  const {
    data: diaryData,
    isLoading: isDiaryListLoading,
    isError: isDiaryListError,
    isSuccess: isDiaryListSuccess,
    refetch: refetchDiaryList,
  } = useFetchDiaryListForExh(exhId);

  const isFocused = useIsFocused();
  const {updateVisitedExhId} = useVisitedExhIdActions(); //exhId 넘겨주기
  const [currentDate, setCurrentDate] = useState(dateToString(new Date())); //현재 날짜
  const [favExhId, setfavExhId] = useState<number>(0); //누른 전시회 exhId
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [like, setLike] = useState<boolean>(false); //좋아요를 누르면 true
  const [dislike, setDislike] = useState<boolean>(false); //삭제할때 true
  const [isReadable, setIsReadable] = useState<boolean>(false); // 소개글 펼쳐보기 모달 확인용
  const [exhState, setExhState] = useState<string>();
  const [hearts, setHearts] = useState<boolean>();
  const [intro, setIntro] = useState<string>();
  const [tmp, setTmp] = useState<string>( // 소개 부분 [변경 예정]
    'The Page Gallery is pleased to announce a solo exhibition by German artist André Butzer from November 9 to December 30. This will be the first solo exhibition in Asia in three years and the first for Korean audiences since Yuz Museum in Shanghai in 2020. The exhibition, which will be held at The Page Gallery East, consists of 15 major new works that span the artist"s oeuvre over the past 30 years. At the end of the 20th century, with the end of the Cold War and the sweep of industrialization.',
  );
  const [isMoreContent, setIsMoreContent] = useState<boolean>(false);
  const [avgRate, setAvgRate] = useState<string>();
  const [avgNumber, setAvgNumber] = useState<number>(0);
  //const [sharedModal, setSharedModal] = useState<boolean>(false);
  const limit = 2; // 한 페이지에 보이는 리뷰 개수 -[변경 예정]

  const {
    mutate: addLike,
    isLoading: isLoadingLike,
    isError: isErrorLike,
    isSuccess: isSuccessLike,
  } = useAddLike(favExhId);

  const {
    mutate: DeleteLike,
    isLoading: isLoadingDislike,
    isError: isErrorDislike,
    isSuccess: isSuccessDislike,
  } = useDeleteLike(deleteList);

  useEffect(() => {
    if (isFocused) {
      refetch();
      refetchDiaryList();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isSuccess) {
      setHearts(data.favoriteExh);

      if (currentDate > JoinDateWithDot(data.exhPeriodEnd)) {
        // 진행상황 확인
        setExhState('종료');
      } else if (
        currentDate >= JoinDateWithDot(data.exhPeriodStart) &&
        currentDate <= JoinDateWithDot(data.exhPeriodEnd)
      ) {
        setExhState('진행중');
      } else if (currentDate < JoinDateWithDot(data.exhPeriodStart)) {
        setExhState('예정');
      }

      if (tmp.length > 300) {
        //소개글 200자 이상일시 tmp.length ->data.intro.length로 바꿔야함 [변경 예정]
        setIsReadable(true);
        //let str: string[];
        setIntro(tmp.substring(0, 300));
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    //기록들 평균

    var tmp: number = 0;
    // if (diaryData.length > 1) {
    if (isDiaryListSuccess) {
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
  }, [isDiaryListSuccess, diaryData]);

  useEffect(() => {
    if (like) {
      addLike();
      setLike(false);
    }
  }, [like]);

  useEffect(() => {
    if (dislike) {
      DeleteLike();
      setDislike(false);
    }
  }, [dislike]);

  useEffect(() => {
    if (isErrorLike) {
      console.log('좋아요 실패');
    }
    if (isLoadingLike) {
      console.log('좋아요 로딩중');
    }
    if (isSuccessLike) {
      console.log(favExhId);
      console.log('좋아요 성공');
    }

    if (isErrorDislike) {
      showToast('좋아요 삭제 실패했습니다.');
    }
    if (isLoadingDislike) {
      console.log('좋아요 삭제 로딩중');
    }
    if (isSuccessDislike) {
      console.log(favExhId);
      console.log('좋아요 삭제');
    }
  }, [
    isErrorLike,
    isLoadingLike,
    isSuccessLike,
    isErrorDislike,
    isLoadingDislike,
    isSuccessDislike,
  ]);

  const handlePressBack = () => {
    //BackButton
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [
                {
                  name: 'Exhibition',
                  params: undefined,
                },
              ],
            },
          },
        ],
      });
      return true;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlePressBack);
    };
  }, [handlePressBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlePressBack);
    };
  }, [handlePressBack]);

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'로딩 중 :)'} />;
  }

  if (isDiaryListSuccess) {
    console.log('다이어리 불러오기 성공');
  }

  const onPressHeart = (exhId: number) => {
    const tmp: number[] = [];
    setfavExhId(exhId);

    if (!hearts) {
      setLike(true);
      setHearts(true);
    } else {
      tmp.push(exhId);
      setDeleteList(tmp);
      setDislike(true);
      setHearts(false);
    }
  };

  const showMore = () => {
    setIntro(tmp);
    setIsReadable(false);
    setIsMoreContent(true);
  };

  const backToIntro = () => {
    setIntro(tmp.substring(0, 300));
    setIsReadable(true);
    setIsMoreContent(false);
  };

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

  const clickMoreReview = () => {
    console.log('더 많은 리뷰', exhId);
    navigation.navigate('ExhToMoreReview', {
      exhId: exhId,
    });
  };

  const exhToHomepage = async () => {
    //홈페이지 이동
    const url = 'https://www.naver.com'; //[변경 예정] 해당 갤러리 홈페이지로 이동

    // 주어진 URL을 열 수 있는지 확인합니다.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // 주어진 URL을 엽니다.
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <ContainerScroll scrollEventThrottle={200}>
      <TopView>
        <BackgroundImage
          source={{uri: `data:image/png;base64,${data.poster}`}}
          blurRadius={40}
          resizeMode="cover"
          alt={'이미지 읽기 실패'}>
          <ForegroundImage
            source={{uri: `data:image/png;base64,${data.poster}`}}
            resizeMode="contain"
            alt={'이미지 읽기 실패'}
          />
        </BackgroundImage>
        <TopLayer>
          <TouchableOpacity onPress={handlePressBack}>
            <BackButtonIcon />
          </TouchableOpacity>
          <EmptyHeartContent>
            <TouchableOpacity onPress={() => onPressHeart(exhId)}>
              {hearts ? <FullHeartIcon /> : <EmptyHeartIcon />}
            </TouchableOpacity>
          </EmptyHeartContent>
        </TopLayer>
      </TopView>
      <InfoListView>
        <NameView>
          <Title>{data.exhName}</Title>
          <IconView>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ExhToCal', {
                  exhId: data.exhId,
                })
              }>
              <CalendarShareIcon />
            </TouchableOpacity>
            <Bar>{'|'}</Bar>

            <ExhShare
              poster={data.poster}
              exhId={data.exhId}
              exhName={data.exhName}
            />

            <Bar>{'|'}</Bar>
            <TouchableOpacity onPress={exhToHomepage}>
              {/* // onPress={() => navigation.navigate('ExhToHomepage')}> */}
              <HomepageIcon />
            </TouchableOpacity>
          </IconView>
        </NameView>
        <StateView>
          <StateText state={exhState}>{exhState}</StateText>
        </StateView>
        <InfoView>
          <InfoTitle>{'장소'}</InfoTitle>
          <Info>{data.gallery}</Info>
        </InfoView>
        <InfoView>
          <InfoTitle>{'일정'}</InfoTitle>
          <Info>
            {JoinDateWithDot(data.exhPeriodStart)}
            {' ~ '}
            {JoinDateWithDot(data.exhPeriodEnd)}
          </Info>
        </InfoView>
        <InfoView>
          <InfoTitle>{'작가'}</InfoTitle>
          {!data.painter ? (
            <Info>{'정보 없음'}</Info>
          ) : (
            <Info>{data.painter}</Info>
          )}
        </InfoView>
        <InfoView>
          <InfoTitle>{'관람료'}</InfoTitle>
          <Info>
            {data.fee}
            {'원'}
          </Info>
        </InfoView>
      </InfoListView>
      <IntroduceView>
        <Title>{'소개'}</Title>
        <Content>
          {'"'}
          {intro}
          {/* {data.intro} [변경 예정] */}
          {'"'}
        </Content>
        {/* 아이콘 */}
        {isReadable && (
          <TouchableOpacity onPress={showMore}>
            <MoreContentsIcon />
          </TouchableOpacity>
        )}
        {isMoreContent && (
          <TouchableOpacity onPress={backToIntro}>
            <ReduceContentsIcon />
          </TouchableOpacity>
        )}
      </IntroduceView>
      <ReView>
        <Title>{'기록'} </Title>
        {avgNumber === 0 ? (
          <TitleTopView>
            <NonAvg> {'아직 기록이 없습니다.'}</NonAvg>
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
        {avgNumber > limit && (
          <MoreReview onPress={clickMoreReview}>
            <MoreReviewTitle>{'기록들 더보기 >'}</MoreReviewTitle>
          </MoreReview>
        )}
      </ReView>
    </ContainerScroll>
  );
};

export default ExhDetailInfo;

/** style */
const ContainerScroll = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  background-color: white;
`;

const Title = styled.Text`
  font-size: ${rf(19)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

// poster section
const TopView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const BackgroundImage = styled.ImageBackground`
  width: ${wp(100)}px;
  height: ${hp(29)}px;
`;

const ForegroundImage = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const TopLayer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${wp(2.9)}px;
  padding-right: ${wp(3.9)}px;
  padding-bottom: ${wp(3.9)}px;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: space-between;
`;

const EmptyHeartContent = styled.View`
  justify-content: flex-end;
`;

// info section
const InfoListView = styled.View`
  flex-direction: column;
  padding: ${wp(5.2)}px;
  gap: ${wp(2)}px;
  border-style: dashed;
  border-bottom-width: ${wp(0.4)}px;
  border-bottom-color: ${LIGHT_GREY};
`;

const NameView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const IconView = styled.View`
  flex-direction: row;
  gap: ${wp(2)}px;
  align-items: center;
`;

const Bar = styled.Text`
  font-size: ${rf(19)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;

const StateView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${wp(2.9)}px;
`;

interface StateTextProps {
  state: string;
}

const StateText = styled.Text<StateTextProps>`
  font-size: ${rf(12)}px;
  text-align: center;
  color: ${(props: StateTextProps) =>
    props.state === '진행중'
      ? `${MAIN_COLOR}`
      : props.state === '종료'
        ? `${MIDDLE_GREY}`
        : '#fee500'};
  font-family: ${FONT_NAME};
  padding-top: ${wp(1.1)}px;
  padding-bottom: ${wp(0.6)}px;
  padding-left: ${wp(1.9)}px;
  padding-right: ${wp(1.9)}px;
  border-color: ${(props: StateTextProps) =>
    props.state === '진행중'
      ? `${MAIN_COLOR}`
      : props.state === '종료'
        ? `${MIDDLE_GREY}`
        : '#fee500'};
  border-width: ${wp(0.3)}px;
  border-radius: ${wp(50)}px;
`;

const InfoView = styled.View`
  flex-direction: row;
  gap: ${wp(5)}px;
`;

const InfoTitle = styled.Text`
  font-size: ${rf(14.2)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const Info = styled.Text`
  font-size: ${rf(14.2)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

// introduce section
const IntroduceView = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${wp(5.2)}px;
  border-style: dashed;
  border-bottom-width: ${DASH_WIDTH}px;
  border-bottom-color: ${LIGHT_GREY};
`;

const Content = styled.Text`
  font-size: ${rf(15)}px;
  text-align: center;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding: ${wp(4.5)}px;
`;

// review section
const ReView = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${wp(5.2)}px;
  gap: ${wp(2)}px;
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

// more review
const MoreReview = styled.TouchableOpacity`
  padding-top: ${wp(2.9)}px;
`;

const MoreReviewTitle = styled.Text`
  font-size: ${rf(15)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;
