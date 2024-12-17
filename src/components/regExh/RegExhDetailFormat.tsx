import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {TRenderEngineProvider} from 'react-native-render-html';
import CustomTouchable from '~/components/common/CustomTouchable';
import {
  BackButtonIcon,
  EditRegExhIcon,
  TrashRegExhIcon,
} from '~/components/common/icon';
import ExhDetailFormat from '~/components/exhibition/ExhDetailFormat';
import {DEFAULT_IMAGE} from '@env';
import {
  DEFAULT_TEXT,
  COMMENTFORM_COLOR,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import RegExhOptionsModal from '~/components/regExh/RegExhOptionsModal';
import {useDeleteRegExh} from '~/api/queries/regexh';
import {showToast} from '../common/modal/toastConfig';
import {RegExhDetailInfo} from '~/types';

interface Props {
  role: 'ADMIN' | 'USER_WAIT' | 'USER_COMPLETE';
  regExhInfo: RegExhDetailInfo;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const RegExhDetailFormat: React.FC<Props> = ({role, regExhInfo, refetch}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openTrashModal, setOpenTrashModal] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState(false);
  //삭제
  const {
    mutate: deleteRegExh,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteRegExh(regExhInfo.regExhId);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

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

  useEffect(() => {
    if (isError) {
      showToast('삭제 실패. 다시 시도하세요');
    }
    if (isSuccess) {
      // 설정 페이지의 등록한 전시회 페이지로 이동
      setOpenTrashModal(false);
      showToast('성공적으로 삭제됐습니다.');
      navigation.goBack();
    }
  }, [isError, isSuccess]);

  const handlePressBack = () => {
    navigation.goBack();
  };

  const onPressOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const onPressCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const onPressEditYes = () => {
    setOpenEditModal(false);

    //수정페이지이동
    navigation.navigate('EditRegExh', {
      regExhInfo,
      role: role === 'ADMIN' ? 'ADMIN' : 'USER_WAIT',
    });
  };

  const onPressOpenTrashModal = () => {
    setOpenTrashModal(true);
  };

  const onPressCloseTrashModal = () => {
    setOpenTrashModal(false);
  };

  const onPressTrashYes = () => {
    //삭제
    deleteRegExh();
  };

  return (
    <TRenderEngineProvider>
      <ContainerScroll
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        scrollEventThrottle={200}>
        <>
          {/*전시회 세부정보 */}
          <TopLayer>
            <CustomTouchable onPress={handlePressBack}>
              <BackButtonIcon />
            </CustomTouchable>
            <TopCenterView>
              <Title> {'전시회 등록 확인'}</Title>
            </TopCenterView>
            <OptionVeiw>
              {role !== 'USER_COMPLETE' && (
                <CustomTouchable onPress={onPressOpenEditModal}>
                  {openEditModal && (
                    <RegExhOptionsModal
                      option={'UPDATE'}
                      handleCloseModal={onPressCloseEditModal}
                      onPressYes={onPressEditYes}
                    />
                  )}
                  <EditRegExhIcon />
                </CustomTouchable>
              )}
              {role === 'USER_WAIT' && (
                <CustomTouchable onPress={onPressOpenTrashModal}>
                  <TrashRegExhIcon />
                  {openTrashModal && (
                    <RegExhOptionsModal
                      option={'DELETE'}
                      handleCloseModal={onPressCloseTrashModal}
                      onPressYes={() => onPressTrashYes()}
                    />
                  )}
                </CustomTouchable>
              )}
            </OptionVeiw>
          </TopLayer>
          {/**전시 상세정보 */}
          <ExhDetailFormat
            data={{
              exhName: regExhInfo.regExhName,
              gallery: regExhInfo.regGallery,
              exhPeriodStart: regExhInfo.regExhPeriodStart,
              exhPeriodEnd: regExhInfo.regExhPeriodEnd,
              poster: regExhInfo.regPoster ?? DEFAULT_IMAGE,
              painter: regExhInfo.regPainter,
              fee: Number(regExhInfo.regFee),
              url: regExhInfo.regUrl ?? '홈페이지 정보 없음.',
              intro: regExhInfo.regIntro ?? '전시회 소개 없음.',
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
              <RExhStateText state={regExhInfo.regState}>
                등록 {regExhInfo.regState}
              </RExhStateText>
            </StateView>
            <StateView>
              <StateText>{'등록 요청 날짜'}</StateText>
              <RegDateText>{regExhInfo.regDate}</RegDateText>
            </StateView>
            {role !== 'USER_WAIT' && regExhInfo.regState !== '대기' && (
              <StateCommentView>
                <StateView>
                  <StateText>{'코멘트'}</StateText>
                </StateView>
                <CommentView>
                  <RegDateText>
                    {regExhInfo.regState === '완료' &&
                      (regExhInfo.regComment ?? '전시 등록 완료')}
                    {regExhInfo.regState === '실패' &&
                      (regExhInfo.regComment ?? '전시 등록 실패')}
                  </RegDateText>
                </CommentView>
              </StateCommentView>
            )}
          </RegExhStateView>
        </>
      </ContainerScroll>
    </TRenderEngineProvider>
  );
};

export default RegExhDetailFormat;

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

interface RExhStateProps {
  state: string;
}

const RExhStateText = styled.Text<RExhStateProps>`
  font-size: ${rf(17)}px;
  color: ${MIDDLE_GREY};
  color: ${(props: RExhStateProps) =>
    props.state === '완료'
      ? `${MAIN_COLOR}`
      : props.state === '대기'
      ? `${MIDDLE_GREY}`
      : `black`};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

const RegDateText = styled.Text`
  font-size: ${rf(14)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  /* line-height: ${wp(8)}px; */
  line-height: ${wp(5)}px;
`;

const StateCommentView = styled.View`
  flex-direction: column;
  width: 100%;
`;

const CommentView = styled.View`
  width: 100%;
  /* padding: ${wp(2)}px; */
  padding: ${wp(4)}px;
  background-color: ${COMMENTFORM_COLOR};
  border-radius: ${wp(3)}px;
`;

// const CommentBorderView = styled.View`
//   align-items: center;
//   width: 100%;
//   border-color: ${LIGHT_GREY};
//   border-width: ${wp(0.3)}px;
//   border-radius: ${wp(5)}px;
// `;

const OptionVeiw = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${wp(3)}px;
  padding-right: ${wp(1.5)}px;
`;
