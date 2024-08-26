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
import ExhReviewList from './detail/ExhReviewList';
import {TRenderEngineProvider} from 'react-native-render-html';
import CustomTouchable from '~/components/common/CustomTouchable';
import {
  BackButtonIcon,
  CalendarShareIcon,
  HomepageIcon,
} from '~/components/common/icon';
import ExhShare from './ExhShare';
import {showToast} from '~/components/common/modal/toastConfig';
import ExhDetailFormat from '~/components/regexh/ExhDetailFormat';

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
      refetch();
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
            {/*전시회 세부정보 */}
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
            {/**전시 상세정보 */}
            <ExhDetailFormat data={data} state={'전시정보'} exhId={exhId} />

            {/*전시 리뷰 */}
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
