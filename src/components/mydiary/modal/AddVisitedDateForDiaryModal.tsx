import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
  ITEM_BORDER_WIDTH,
} from '../../common/style';
import {DARK_GREY, LIGHT_GREY, MAIN_COLOR} from '../../common/colors';
import {showToast} from '../../common/modal/toastConfig';
import {MarkedType} from '~/types';
import InfoModal from '../../common/modal/InfoModal';
import {useAddMyExhVisitDate} from '~/api/queries/mydiary';
import {changeDotToHyphen, dateToString} from '~/utils/date';
import CustomTouchable from '../../common/CustomTouchable';
import CalendarSelectDateFrame from '~/components/common/CalendarSelectDateFrame';
import LoadingModal from '~/components/common/modal/LoadingModal';

interface AddVisitedDateForDiaryModalProps {
  exhId: number;
  handleCloseModal: () => void;
  message: string;
  visitedDates: MarkedType[];
}

const AddVisitedDateForDiaryModal: React.FC<
  AddVisitedDateForDiaryModalProps
> = ({exhId, handleCloseModal, message, visitedDates}) => {
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  const {
    mutate: addMyExhVisitDate,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useAddMyExhVisitDate(exhId);

  useEffect(() => {
    if (isError) {
      const statusCode = error?.response?.status;

      if (statusCode === 409) {
        showToast('이미 저장된 날짜입니다.');
      } else if (statusCode === 403) {
        showToast('방문 가능한 날짜가 아닙니다.');
      } else {
        showToast('다시 시도해주세요.');
      }
    }
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isError, isSuccess]);

  const onSelectedDate = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  };

  const onClickNextButton = () => {
    addMyExhVisitDate({
      exhId: exhId,
      visitDate: changeDotToHyphen(selectedDate),
    });
  };

  const onClickForgotButton = () => {
    addMyExhVisitDate({exhId: exhId, visitDate: null});
  };

  const checkForget = () => {
    for (var marked = 0; marked < visitedDates.length; marked++) {
      if (!visitedDates[marked].date) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const alreadyMarkedDate = () => {
    for (var marked = 0; marked < visitedDates.length; marked++) {
      if (visitedDates[marked].date === selectedDate) {
        return true;
      }
    }
    return false;
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isLoading} />
      <Message>{message}</Message>
      {/* 달력 */}
      <Wrapper>
        <CalendarSelectDateFrame
          initDate={dateToString(new Date())}
          onSelectedDate={onSelectedDate}
          selectedDate={selectedDate}
          markedDates={visitedDates}>
          <BodyView>
            <BodyText>방문 날짜가 기억 안 날 땐?</BodyText>
            {checkForget() ? (
              <ForgetText haveForgot={true}>기억 안 남</ForgetText>
            ) : (
              <CustomTouchable onPress={onClickForgotButton}>
                <ForgetText haveForgot={false}>기억 안 남</ForgetText>
              </CustomTouchable>
            )}
          </BodyView>
        </CalendarSelectDateFrame>
        {alreadyMarkedDate() ? (
          <NextButton isAlready={true}>이미 저장된 방문 날짜입니다</NextButton>
        ) : (
          <CustomTouchable onPress={onClickNextButton}>
            <NextButton isAlready={false}>완료</NextButton>
          </CustomTouchable>
        )}
      </Wrapper>
    </InfoModal>
  );
};

export default AddVisitedDateForDiaryModal;

/** style */
const Message = styled.Text`
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${hp(1)}px;
  padding-left: ${wp(4)}px;
  padding-right: ${wp(4)}px;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-left: ${wp(4)}px;
  padding-right: ${wp(4)}px;
`;

const BodyView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const BodyText = styled.Text`
  font-size: ${rf(16)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

interface ForgotProps {
  haveForgot: boolean;
}

const ForgetText = styled.Text<ForgotProps>`
  font-size: ${rf(16)}px;
  color: ${(props: ForgotProps) =>
    props.haveForgot ? `${LIGHT_GREY}` : `${MAIN_COLOR}`};
  font-family: ${FONT_NAME};
  border-bottom-color: ${(props: ForgotProps) =>
    props.haveForgot ? `${LIGHT_GREY}` : `${MAIN_COLOR}`};
  border-bottom-width: ${ITEM_BORDER_WIDTH}px;
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
