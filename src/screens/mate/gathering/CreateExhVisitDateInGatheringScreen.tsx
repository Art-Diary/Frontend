import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {BACK_COLOR, LIGHT_GREY, MAIN_COLOR} from '~/components/common/colors';
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
import SearchExhForDiary from '~/components/common/diary/SearchExhForDiary';
import SelectNewVisitDateForGathering from '~/components/gathering/SelectNewVisitDateForGathering';
import {changeDotToHyphen, dateToString} from '~/utils/date';
import {useAddNewDateOfExhGathering} from '~/api/queries/gathering';
import {GatheringStackParamList} from '~/utils/stackTypes';
import LoadingModal from '~/components/common/modal/LoadingModal';

type CreateExhVisitDateProps = RouteProp<
  GatheringStackParamList,
  'CreateExhVisitDateInGathering'
>;

interface Props {
  route: CreateExhVisitDateProps;
}
const CreateExhVisitDateInGatheringScreen: React.FC<Props> = ({route}) => {
  const {gatherId} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const [exhId, setExhId] = useState<number>();
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  const [openLoading, setOpenLoading] = useState(false);
  const [alreadyVisit, setAlreadyVisit] = useState(false);
  // 모임의 전시회 방문 날짜 추가 API
  const {
    mutate: addNewDateOfExhGathering,
    isLoading,
    isError,
    isSuccess,
  } = useAddNewDateOfExhGathering();

  useEffect(() => {
    if (isError) {
      showToast('방문 가능한 날짜가 아닙니다');
    }
    if (isLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
    if (isSuccess) {
      showToast('방문 날짜를 추가했습니다');
      navigation.goBack();
    }
  }, [isError, isLoading, isSuccess]);

  const onSelectedDate = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  };

  const onPressButton = () => {
    if (!exhId || exhId === 0) {
      showToast('전시회를 선택해주세요.');
    } else if (!selectedDate) {
      showToast('날짜를 선택해주세요.');
    } else {
      addNewDateOfExhGathering({
        gatherId,
        exhId,
        visitDate: changeDotToHyphen(selectedDate),
      });
    }
  };

  return (
    <Container>
      <BackView title={'방문 날짜 추가'} line />
      {/* 전시회 선택 */}
      <Contents>
        <SearchExhForDiary handleExhId={setExhId} />
      </Contents>
      {/* 추가할 방문 날짜 선택 */}
      <Contents full>
        <SelectNewVisitDateForGathering
          exhId={exhId ?? 0}
          gatherId={gatherId}
          handleSelectDate={onSelectedDate}
          selectedDate={selectedDate}
          initDate={dateToString(new Date())}
          handleAlreadyVisit={setAlreadyVisit}
        />
      </Contents>
      {/* 완료 버튼 */}
      <Contents>
        {alreadyVisit ? (
          <NextButton isAlready={true}>이미 저장된 방문 날짜입니다</NextButton>
        ) : (
          <CustomTouchable onPress={onPressButton}>
            <NextButton isAlready={false}>날짜 선택 완료</NextButton>
          </CustomTouchable>
        )}
      </Contents>
      {openLoading && <LoadingModal message={'처리 중'} />}
    </Container>
  );
};

export default CreateExhVisitDateInGatheringScreen;

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

interface NextButtonProps {
  isAlready: boolean;
}
const NextButton = styled.Text<NextButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.isAlready ? `${LIGHT_GREY}` : `${MAIN_COLOR}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
