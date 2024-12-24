import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {BACK_COLOR, MAIN_COLOR} from '~/components/common/colors';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import CustomTouchable from '~/components/common/CustomTouchable';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {showToast} from '~/components/common/modal/toastConfig';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {
  useWriteMyDiaryActions,
  useWriteMyDiaryInfo,
} from '~/zustand/mydiary/writeMyDiary';
import {RootStackParamList} from '~/utils/stackTypes';
import {useFetchExhDetailInfo} from '~/api/queries/exhibition';
import SearchExhForDiary from '~/components/common/diary/SearchExhForDiary';
import VisitedDateListForDiary from '~/components/common/diary/VisitedDateListForDiary';
import {useGatheringListParamsInfo} from '~/zustand/gathering/gathering';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

type CreateExhVisitedDateScreenProps = RouteProp<
  RootStackParamList,
  'CreateExhVisitedDate'
>;

interface Props {
  route: CreateExhVisitedDateScreenProps;
}

const CreateExhVisitedDateScreen: React.FC<Props> = ({route}) => {
  // Hooks
  const {exhId: routeExhId} = route.params;
  const {exhVisitId: routeExhVisitId} = route.params;
  const {isInGathering} = route.params;
  const {params: gatherInfo} = useGatheringListParamsInfo();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateforIds} = useWriteMyDiaryActions();

  // State Management
  const [exhId, setExhId] = useState<number>();
  const [exhVisitId, setExhVisitId] = useState<number>();
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // API Hooks
  const {
    data: exhInfo,
    isLoading,
    isError,
    refetch,
  } = useFetchExhDetailInfo(routeExhId ?? 0);
  const writeMyDiaryInfo = useWriteMyDiaryInfo();

  // Effects
  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    if (routeExhId) {
      setExhId(routeExhId);
    }
  }, [routeExhId]);

  useEffect(() => {
    if (routeExhVisitId) {
      setExhVisitId(routeExhVisitId);
    }
  }, [routeExhVisitId]);

  // Handlers
  const onPressNextButton = () => {
    // 기록 작성 페이지로 이동
    if (!exhId || exhId === 0) {
      showToast('전시회를 선택해주세요.');
    } else if (!exhVisitId) {
      showToast('날짜를 선택해주세요.');
    } else {
      updateforIds(writeMyDiaryInfo.diaryId, exhVisitId);
      navigation.navigate('WriteMyDiaryRoutes');
    }
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      <BackView title={exhVisitId ? '기록 수정' : '기록 추가'} line />
      {/* 전시회 선택 */}
      <Contents>
        <SearchExhForDiary exhInfo={exhInfo} handleExhId={setExhId} />
      </Contents>
      {/* 방문 날짜 선택 */}
      <Contents full>
        <VisitedDateListForDiary
          exhId={exhId ?? 0}
          exhVisitId={exhVisitId}
          handleExhVisitId={setExhVisitId}
          gatherId={isInGathering ? gatherInfo.gatherId : undefined}
        />
      </Contents>
      {/* 다음 버튼 */}
      <Contents>
        <CustomTouchable onPress={onPressNextButton}>
          <NextButton>다음</NextButton>
        </CustomTouchable>
      </Contents>
    </Container>
  );
};

export default CreateExhVisitedDateScreen;

/** style */
const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

interface ContentsProps {
  full: boolean;
}

const Contents = styled.View<ContentsProps>`
  flex: ${(props: ContentsProps) => (props.full ? `1` : `none`)};
  padding-top: ${hp(2.2)}px;
  padding-bottom: ${hp(0.8)}px;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
`;

const NextButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
