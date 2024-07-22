import React, {useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';
import CalendarDiaryList from './CalendarDiaryList';
import {OptionBarIcon, WriteDiaryButtonIcon} from '~/components/common/icon';
import {
  BORDER_COLOR,
  DEFAULT_TEXT,
  MAIN_COLOR,
} from '~/components/common/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import CustomTouchable from '~/components/common/CustomTouchable';

const CalendarDiaryListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const exhFromCalendarInfo = useExhFromCalendarInfo();
  const {updateIsUpdate, updateforIds, resetWriteInfo} =
    useWriteMyDiaryActions();
  const [showOptionBar, setShowOptionBar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState<boolean>(false);

  const onPressButton = () => {
    resetWriteInfo();
    updateIsUpdate(false);
    updateforIds(null, exhFromCalendarInfo.exhVisitId);
    navigation.navigate('WriteMyDiaryRoutes');
  };

  const clickDeletePage = () => {
    setIsDeleteModalOpen(true);
  };

  const clickUpdatePage = () => {
    setIsUpdateClicked(true);
  };

  return (
    <Container>
      {/* header */}
      <BackView line={false}>
        <ButtonView>
          <CustomTouchable onPress={onPressButton}>
            <WriteDiaryButtonIcon />
          </CustomTouchable>
          {showOptionBar && (
            <CustomTouchable onPress={() => setIsModalOpen(true)}>
              <OptionBarIcon />
            </CustomTouchable>
          )}
        </ButtonView>
      </BackView>

      {/* body */}
      <CalendarDiaryList
        deleteActions={{
          handleShowOptionBar: setShowOptionBar,
          isDeleteModalOpen: isDeleteModalOpen,
          handleCloseDeleteModal: () => setIsDeleteModalOpen(false),
          handleCloseOptionModal: () => setIsModalOpen(false),
        }}
        updateActions={{
          isUpdateClicked: isUpdateClicked,
          handleUpdateClicked: () => setIsUpdateClicked(false),
          handleCloseOptionModal: () => setIsModalOpen(false),
        }}
      />
      {isModalOpen && (
        <ConfirmationModal handleCloseModal={() => setIsModalOpen(false)}>
          <CustomTouchable onPress={clickUpdatePage}>
            <Message>수정</Message>
          </CustomTouchable>
          <SeperateLine />
          <CustomTouchable onPress={clickDeletePage}>
            <Message>삭제</Message>
          </CustomTouchable>
          <CustomTouchable>
            <DeleteButton>취소</DeleteButton>
          </CustomTouchable>
        </ConfirmationModal>
      )}
    </Container>
  );
};

export default CalendarDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  align-items: center;
  width: 100%;
`;

const ButtonView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(1.5)}px;
`;

const SeperateLine = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: ${wp(0.05)}px;
  border-color: ${BORDER_COLOR};
  margin-left: ${wp(2)}px;
  margin-right: ${wp(2)}px;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding: ${hp(3.3)}px;
`;

const DeleteButton = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${MAIN_COLOR};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;
