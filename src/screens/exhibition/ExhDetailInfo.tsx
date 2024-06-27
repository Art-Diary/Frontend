import React, {useEffect, ReactNode, useCallback, useState} from 'react';
import {
  Keyboard,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import styled, {css} from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import SearchExhFrame from '../../components/exhSearch/SearchExhFrame';
import {showToast} from '~/components/common/modal/toastConfig';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {
  useFetchDiaryListForExh,
  useFetchExhDetailInfo,
} from '~/api/queries/exhibition';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {
  EmptyHeart,
  FullHeart,
  CalendarShare,
  Share,
  Homepage,
  MoreContents,
  ReduceContents,
  BackButton,
  FillStarSmall,
  EmptyStarSmall,
  FillStarIcon,
  KakaoIconBig,
  Instagram,
  Copy,
} from '~/assets/images/index';
import {useAddLike, useDeleteLike} from '~/api/queries/exhibition';
import {useIsFocused} from '@react-navigation/native';
import {JoinDateWithDot, dateToString} from '~/utils/Date';
import ExhShareModal from './ExhShareModal';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import ExhShare from './ExhShare';
import ExhToMoreReview from './ExhToMoreReview';

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
  const [tmp, setTmp] = useState<string>(
    'The Page Gallery is pleased to announce a solo exhibition by German artist André Butzer from November 9 to December 30. This will be the first solo exhibition in Asia in three years and the first for Korean audiences since Yuz Museum in Shanghai in 2020. The exhibition, which will be held at The Page Gallery East, consists of 15 major new works that span the artist"s oeuvre over the past 30 years. At the end of the 20th century, with the end of the Cold War and the sweep of industrialization.',
  );
  const [isMoreContent, setIsMoreContent] = useState<boolean>(false);
  const [avgRate, setAvgRate] = useState<string>();
  const [avgNumber, setAvgNumber] = useState<number>(0);
  const [sharedModal, setSharedModal] = useState<boolean>(false);

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
        //소개글 200자 이상일시 tmp.length ->data.intro.length로 바꿔야함
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
      //showToast('좋아요 실패했습니다.');
      console.log('좋아요 실패');
    }
    if (isLoadingLike) {
      // setIsLoadingOpen(true);
      console.log('좋아요 로딩중');
    }
    if (isSuccessLike) {
      console.log(favExhId);
      console.log('좋아요 성공');
    }

    if (isErrorDislike) {
      showToast('좋아요 삭제 실패했습니다.');
      //console.log('좋아요 실패');
    }
    if (isLoadingDislike) {
      // setIsLoadingOpen(true);
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
  // useEffect(()=>{},[data.e]);

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'로딩 중 :)'} />;
  }
  if (isSuccess) {
    // console.log(data.painter);
    // console.log('불러오기성공:', exhId, data);
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
    //const renderingRate = (rate: string) => {
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
    // };
  };

  const onPressSharedModal = () => {
    setSharedModal(true);
  };

  const closeSharedModal = () => {
    setSharedModal(false);
  };

  const clickMoreReview = () => {
    console.log('더 많은 리뷰', exhId);
    navigation.navigate('ExhToMoreReview', {
      exhId: exhId,
    });
  };

  return (
    <Container>
      <ScrollView style={{flex: 1}} scrollEventThrottle={200}>
        <TopView>
          <BackgroundImage
            source={{uri: `data:image/png;base64,${data.poster}`}}
            blurRadius={40}
            resizeMode="cover"
            alt={'이미지 읽기 실패'}
          />
          <ForegroundImage
            source={{uri: `data:image/png;base64,${data.poster}`}}
            resizeMode="contain"
            alt={'이미지 읽기 실패'}
          />
          <TopLayer>
            <TouchableOpacity onPress={handlePressBack}>
              <BackButton />
            </TouchableOpacity>
            <EmptyHeartContent>
              <TouchableOpacity onPress={() => onPressHeart(exhId)}>
                {hearts ? <FullHeart /> : <EmptyHeart />}
              </TouchableOpacity>
            </EmptyHeartContent>
          </TopLayer>
        </TopView>
        <NameView>
          <Title>{data.exhName}</Title>
          <IconView>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ExhToCal', {
                  exhId: data.exhId,
                })
              }>
              <CalendarShare />
            </TouchableOpacity>
            <Bar>{'|'}</Bar>
            {/* <TouchableOpacity onPress={() => onPressSharedModal()}>
              <Share />
            </TouchableOpacity> */}
            <ExhShare
              poster={data.poster}
              exhId={data.exhId}
              exhName={data.exhName}
            />
            {/* {sharedModal && (
              <ExhShareModal
                handleCloseModal={closeSharedModal}
                shareWithInsta={shareWithInsta}
              />
            )} */}
            <Bar>{'|'}</Bar>
            <TouchableOpacity>
              <Homepage />
            </TouchableOpacity>
          </IconView>
        </NameView>
        <StateView>
          {/* <State>{exhState}</State> */}
          {exhState === '진행중' ? (
            <StateIng>{exhState}</StateIng>
          ) : exhState === '종료' ? (
            <StatePast>{exhState}</StatePast>
          ) : exhState === '예정' ? (
            <StateIng>{exhState}</StateIng>
          ) : null}
        </StateView>
        <InfoListView>
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
            {/* {data.intro} */}
            {'"'}
          </Content>
          {isReadable && (
            <TouchableOpacity onPress={showMore}>
              <MoreContents />
            </TouchableOpacity>
          )}
          {isMoreContent && (
            <TouchableOpacity onPress={backToIntro}>
              <ReduceContents />
            </TouchableOpacity>
          )}
        </IntroduceView>
        <ReView>
          <TitleView>
            <TitleTopView>
              <Title>{'기록'} </Title>
            </TitleTopView>
            {avgNumber === 0 ? (
              <TitleTopView>
                <NonAvg> {'아직 기록이 없습니다.'}</NonAvg>
              </TitleTopView>
            ) : (
              <AvgRateView>
                <FillStarIcon />
                <AvgTitle> {avgRate}</AvgTitle>
                <AvgText>
                  {' (기록 '}
                  {avgNumber}
                  {'개 평점)'}
                </AvgText>
              </AvgRateView>
            )}
          </TitleView>

          {diaryData &&
            diaryData.slice(0, 2).map(
              (
                item: any,
                index: number, //slice(0,n) 해당 개수 넣기
              ) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('ExhToDiary', {
                      diary: item,
                    })
                  }>
                  <ReViewList>
                    <ReviewImage
                      source={{uri: `data:image/png;base64,${data.poster}`}}
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
                        <ReviewDate>
                          {changeDateType(item.writeDate)}
                        </ReviewDate>
                      </TextView>
                    </ReviewTextView>
                  </ReViewList>
                </TouchableOpacity>
              ),
            )}
          {avgNumber > 2 && ( //제한 개수 수정 slice(0,n)이랑 같은 수
            <MoreReview>
              <TouchableOpacity onPress={clickMoreReview}>
                <MoreReviewTitle>{'기록들 더보기>'}</MoreReviewTitle>
              </TouchableOpacity>
            </MoreReview>
          )}
        </ReView>
      </ScrollView>
    </Container>
  );
};

export default ExhDetailInfo;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
`;

const NameView = styled.View`
  flex: 1;
  flex-direction: row;
  padding-top: ${wp(20)}px;
  padding-left: ${wp(20)}px;
  padding-right: ${wp(20)}px;
  background-color: #ffffff;
  justify-content: space-between;
`;
const IconView = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  background-color: #ffffff;
`;

const StateView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-top: ${wp(10)}px;
  padding-left: ${wp(20)}px;
  background-color: #ffffff;
`;

const InfoListView = styled.View`
  flex: 1;
  flex-direction: column;
  padding-top: ${wp(20)}px;
  padding-left: ${wp(20)}px;
  padding-bottom: ${wp(20)}px;
  gap: 10px;
  background-color: #ffffff;
  border-style: dashed;
  border-bottom-width: ${wp(1)}px;
  border-bottom-color: #979797;
`;

const InfoView = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 20px;
  background-color: #ffffff;
`;

const IntroduceView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${wp(15)}px;
  background-color: #ffffff;
  border-style: dashed;
  border-bottom-width: ${wp(1)}px;
  border-bottom-color: #979797;
`;

const TopView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const TopLayer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${wp(10)}px;
  //align-items: center;
  width: 100%;
  // background-color: #f6f6f6;
  position: absolute;
  z-index: 2;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: ${fp(19)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const Bar = styled.Text`
  font-size: ${fp(18)}px;
  color: #979797;
  font-family: 'omyu pretty';
`;

const StateIng = styled.Text`
  font-size: ${fp(12)}px;
  text-align: center;
  color: #ff6f61;
  font-family: 'omyu pretty';
  padding-bottom: ${wp(2)}px;
  padding-top: ${wp(4)}px;
  padding-left: ${wp(7)}px;
  padding-right: ${wp(7)}px;
  border-color: #ff6f61;
  border-width: ${wp(1)}px;
  border-radius: ${wp(20)}px;
`;

const StatePast = styled.Text`
  font-size: ${fp(12)}px;
  text-align: center;
  color: #979797;
  font-family: 'omyu pretty';
  padding-bottom: ${wp(2)}px;
  padding-top: ${wp(4)}px;
  padding-left: ${wp(7)}px;
  padding-right: ${wp(7)}px;
  border-color: #979797;
  border-width: ${wp(1)}px;
  border-radius: ${wp(20)}px;
`;

const StateSoon = styled.Text`
  font-size: ${fp(12)}px;
  text-align: center;
  color: #fee500;
  font-family: 'omyu pretty';
  padding-bottom: ${wp(2)}px;
  padding-top: ${wp(4)}px;
  padding-left: ${wp(7)}px;
  padding-right: ${wp(7)}px;
  border-color: #fee500;
  border-width: ${wp(1)}px;
  border-radius: ${wp(20)}px;
`;

const Content = styled.Text`
  font-size: ${fp(15.8)}px;
  text-align: center;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding: ${wp(15)}px;
`;

const InfoTitle = styled.Text`
  font-size: ${fp(15)}px;
  color: #979797;
  font-family: 'omyu pretty';
`;

const Info = styled.Text`
  font-size: ${fp(15)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const Poster = styled.Image`
  width: ${wp(137)}px;
  //  width: 100%;
  height: ${hp(169)}px;
  //align-items: center;
`;

const BackgroundImage = styled.Image`
  width: ${wp(360)}px;
  height: ${hp(169)}px;
  opacity: 0.8;
  top: 0;
  left: 0;
`;

const ForegroundImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  align-self: baseline;
  z-index: 1; // Foreground image on top of background image
`;

const EmptyHeartContent = styled.View`
  right: 50%;
  bottom: -45%;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Flex 1을 설정하여 부모 View가 자식 요소에 맞춰 전체 공간을 차지하도록 함
  },
  touchableOpacity: {
    flex: 1,
  },
});

const ReView = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${wp(15)}px;
  background-color: #ffffff;
`;

const TitleView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const TitleTopView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: ${wp(15)}px;
`;

const AvgRateView = styled.View`
  //flex: 1;
  flex-direction: row;
  align-items: center;
  padding: ${wp(5)}px;
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

const NonAvg = styled.Text`
  font-size: ${fp(17)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
  padding: ${wp(1)}px;
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
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: ${wp(1)}px;
`;

const ReviewImage = styled.Image`
  width: ${wp(36)}px;
  height: ${hp(36)}px;
  border-radius: ${wp(18)}px; /* width의 절반을 사용하여 원형으로 만듦 */
`;

const MoreReviewTitle = styled.Text`
  font-size: ${fp(15)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
  padding: ${wp(1)}px;
`;

const MoreReview = styled.View`
  flex: 1;
  flex-direction: row;
  padding-top: ${wp(10)}px;
  justify-content: flex-end;
`;

// const ModalContainer = styled.View`
//   // flex: 1;
//   justify-content: center;
//   align-items: center;
//   padding-top: ${wp(15)}px;
//   // background-color: rgba(0, 0, 0, 0.3);
// `;

// const ModalContentView = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   /* background-color: white;
//   border-radius: 20px;
//   justify-content: center;
//   align-items: center;
//   width: 70%;
//   height: 20%;*/
//   padding: ${wp(10)}px;
//   gap: 35px;
// `;

// const Message = styled.Text`
//   text-align: start;
//   font-size: ${fp(17.9)}px;
//   color: #3c4045;
//   font-family: 'omyu pretty';
// `;

// const SnsView = styled.View`
//   flex-direction: column;
//   align-items: center;
//   padding-top: ${wp(15)}px;
// `;

// const Sns = styled.Text`
//   text-align: center;
//   font-size: ${fp(11.9)}px;
//   color: #3c4045;
//   font-family: 'omyu pretty';
//   padding: ${wp(10)}px;
// `;
