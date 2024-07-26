import React, {useEffect, useState} from 'react';
import {BackHandler, Linking, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {
  useFetchDiaryListForExh,
  useFetchExhDetailInfo,
} from '~/api/queries/exhibition';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {dateToString} from '~/utils/date';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';
import {DEFAULT_IMAGE} from '@env';
import ExhDetailInfoIntro from './detail/ExhDetailInfoIntro';
import ExhReviewList from './detail/ExhReviewList';
import ExhDetailHeart from './detail/ExhDetailHeart';
import {TRenderEngineProvider} from 'react-native-render-html';
import CustomTouchable from '~/components/common/CustomTouchable';
import {
  BackButtonIcon,
  CalendarShareIcon,
  HomepageIcon,
} from '~/components/common/icon';
import ExhShare from './ExhShare';
import {showToast} from '~/components/common/modal/toastConfig';

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
  const isFocused = useIsFocused();

  const {exhId} = route.params;
  const {data, isLoading, isError, isSuccess, refetch} =
    useFetchExhDetailInfo(exhId);
  const {
    data: diaryData,
    isSuccess: isDiaryListSuccess,
    isLoading: isDiaryListLoading,
    refetch: refetchDiaryList,
  } = useFetchDiaryListForExh(exhId);

  const [refreshing, setRefreshing] = useState(false);
  const [openLoading, setOpenLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      refetchDiaryList();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isDiaryListLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
  }, [isDiaryListLoading]);

  useEffect(() => {
    if (refreshing) {
      handleRefetch();
    }
  }, [refreshing]);

  const handleRefetch = async () => {
    await refetchDiaryList().then(() => {
      setRefreshing(false);
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
  };

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

  const checkExhState = (): string => {
    const currentDate = dateToString(new Date());

    if (currentDate > data.exhPeriodEnd) {
      // 진행상황 확인
      return '종료';
    } else if (
      currentDate >= data.exhPeriodStart &&
      currentDate <= data.exhPeriodEnd
    ) {
      return '진행중';
    } else if (currentDate < data.exhPeriodStart) {
      return '예정';
    }
    return '';
  };

  const exhToHomepage = async (url: string) => {
    // 주어진 URL을 열 수 있는지 확인합니다.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // 주어진 URL을 엽니다.
      await Linking.openURL(url);
    } else {
      showToast(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <TRenderEngineProvider>
      <ContainerScroll
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        scrollEventThrottle={200}>
        {data && diaryData !== undefined && diaryData !== null && (
          <>
            <TopLayer>
              <CustomTouchable onPress={handlePressBack}>
                <BackButtonIcon />
              </CustomTouchable>
              <IconView>
                <CustomTouchable
                  onPress={() =>
                    navigation.navigate('ExhToCal', {
                      exhId: exhId,
                    })
                  }>
                  <CalendarShareIcon />
                </CustomTouchable>
                <ExhShare
                  poster={data.poster}
                  exhId={exhId}
                  exhName={data.exhName}
                />
                {data.url && (
                  <CustomTouchable onPress={() => exhToHomepage(data.url)}>
                    <HomepageIcon />
                  </CustomTouchable>
                )}
              </IconView>
            </TopLayer>
            <TopView>
              <BackgroundImage
                source={{uri: `${data.poster ?? DEFAULT_IMAGE}`}}
                blurRadius={40}
                resizeMode="cover"
                alt={'이미지 읽기 실패'}>
                <ForegroundImage
                  source={{uri: `${data.poster ?? DEFAULT_IMAGE}`}}
                  resizeMode="contain"
                  alt={'이미지 읽기 실패'}
                />
              </BackgroundImage>
              <ExhDetailHeart exhId={exhId} hearState={data.favoriteExh} />
            </TopView>
            <InfoListView>
              <Title>{data.exhName}</Title>
              <StateView>
                <StateText state={checkExhState()}>{checkExhState()}</StateText>
              </StateView>
              <InfoView>
                <InfoTitle>{'장소'}</InfoTitle>
                <Info>{data.gallery}</Info>
              </InfoView>
              <InfoView>
                <InfoTitle>{'일정'}</InfoTitle>
                <Info>{data.exhPeriodStart + ' ~ ' + data.exhPeriodEnd}</Info>
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
            {/* 소개 */}
            <ExhDetailInfoIntro intro={data.intro} />
            <ExhReviewList exhId={exhId} diaryData={diaryData} />
          </>
        )}
        {openLoading && <LoadingModal message="로딩 중 :)" />}
      </ContainerScroll>
    </TRenderEngineProvider>
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
  line-height: ${wp(8)}px;
`;

const TopLayer = styled.View`
  flex-direction: row;
  justify-content: space-between; // 양 끝으로 버튼 배치
  align-items: center;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
  padding-top: ${wp(2.3)}px;
  padding-bottom: ${wp(2)}px;
  width: 100%;
`;

const IconView = styled.View`
  flex-direction: row;
  gap: ${wp(2)}px;
  justify-content: center;
  align-items: center;
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

// info section
const InfoListView = styled.View`
  flex-direction: column;
  padding: ${wp(5.2)}px;
  gap: ${wp(2)}px;
  border-style: dashed;
  border-bottom-width: ${wp(0.4)}px;
  border-bottom-color: ${LIGHT_GREY};
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
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  font-size: ${rf(14.2)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;
