import React, {useEffect, useState} from 'react';
import {BackHandler, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {TRenderEngineProvider} from 'react-native-render-html';
import CustomTouchable from '~/components/common/CustomTouchable';
import {BackButtonIcon, OptionBarIcon} from '~/components/common/icon';
import ExhDetailFormat from '~/components/regexh/ExhDetailFormat';
import {usefetchRegExhDetail} from '~/api/queries/regexh';
import {DEFAULT_IMAGE} from '@env';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';

type RootStackParamList = {
  CheckRegExh: {regExhId: number};
};

type CheckRegExhRouteProp = RouteProp<RootStackParamList, 'CheckRegExh'>;

interface Props {
  route: CheckRegExhRouteProp;
}

const CheckRegExh: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();

  const {regExhId} = route.params;
  const {data, isLoading, isError, isSuccess, refetch} =
    usefetchRegExhDetail(regExhId);

  const [refreshing, setRefreshing] = useState(false);
  const [openLoading, setOpenLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
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
    if (refreshing) {
      handleRefetch();
    }
  }, [refreshing]);

  const handleRefetch = async () => {
    await refetch().then(() => {
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
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlePressBack);
    };
  }, [handlePressBack]);

  return (
    <TRenderEngineProvider>
      <ContainerScroll
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        scrollEventThrottle={200}>
        {data && (
          <>
            {/*전시회 세부정보 */}
            <TopLayer>
              <CustomTouchable onPress={handlePressBack}>
                <BackButtonIcon />
              </CustomTouchable>
              <TopCenterView>
                <Title> {'전시회 등록 확인'}</Title>
              </TopCenterView>
              <CustomTouchable>
                <OptionBarIcon />
              </CustomTouchable>
            </TopLayer>
            {/**전시 상세정보 */}
            <ExhDetailFormat
              data={{
                exhName: data.regExhName,
                gallery: data.regGallery,
                exhPeriodStart: data.regExhPeriodStart,
                exhPeriodEnd: data.regExhPeriodEnd,
                poster: data.regPosterUri ?? DEFAULT_IMAGE,
                painter: data.regPainter,
                fee: Number(data.regFee),
                url: data.regUrl ?? '홈페이지 정보 없음.',
                intro: data.regIntro ?? '전시회 소개 없음.',
                favoriteExh: null,
              }}
              state={'미리보기'}
              exhId={null}
            />
            {/*전시 등록 현황 */}
            <RegExhStateView>
              <Title>{'등록현황'}</Title>
              <StateView>
                <StateText>{'등록현황'}</StateText>
                {data.regState ? (
                  <CompletedText>{'등록 완료'}</CompletedText>
                ) : (
                  <StandbyText>{'등록 대기'}</StandbyText>
                )}
              </StateView>
              <StateView>
                <StateText>{'등록 요청 날짜'}</StateText>
                <RegDateText>{data.regDate}</RegDateText>
              </StateView>
              {data.regComment && (
                <StateCommentView>
                  <StateView>
                    <StateText>{'코멘트'}</StateText>
                  </StateView>
                  <CommentView>
                    <CommentBorderView>
                      <RegDateText>{data.regComment}</RegDateText>
                    </CommentBorderView>
                  </CommentView>
                </StateCommentView>
              )}
            </RegExhStateView>
          </>
        )}
        {openLoading && <LoadingModal message="로딩 중 :)" />}
      </ContainerScroll>
    </TRenderEngineProvider>
  );
};

export default CheckRegExh;

/** style */
const ContainerScroll = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  background-color: white;
`;

const TopLayer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
  padding-top: ${wp(2.3)}px;
  padding-bottom: ${wp(2)}px;
  width: 100%;
`;

const TopCenterView = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: ${rf(19)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

const RegExhStateView = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: ${wp(5.2)}px;
  padding-bottom: ${wp(5.2)}px;
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
`;

const StateView = styled.View`
  flex-direction: row;
  width: 100%;
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
  justify-content: space-between; // 양 끝으로 버튼 배치
`;

const StateText = styled.Text`
  font-size: ${rf(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

const StandbyText = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

const CompletedText = styled.Text`
  font-size: ${rf(17)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

const RegDateText = styled.Text`
  font-size: ${rf(14)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

const StateCommentView = styled.View`
  flex-direction: column;
  width: 100%;
`;

const CommentView = styled.View`
  width: 100%;
  padding: ${wp(2)}px;
`;

const CommentBorderView = styled.View`
  align-items: center;
  width: 100%;
  border-color: ${LIGHT_GREY};
  border-width: ${wp(0.3)}px;
  border-radius: ${wp(5)}px;
`;
