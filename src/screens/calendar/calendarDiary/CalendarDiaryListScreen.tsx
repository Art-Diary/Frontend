import React, {useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';
import CalendarDiaryList from './CalendarDiaryList';
import {OptionBarIcon, WriteDiaryButtonIcon} from '~/components/common/icon';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import CustomTouchable from '~/components/common/CustomTouchable';
import {CalendarDiaryStackParamList} from '~/utils/stackTypes';
import DiaryUpdateDeleteModal from '~/components/common/diary/modal/DiaryUpdateDeleteModal';

type CalendarDiaryProps = RouteProp<
  CalendarDiaryStackParamList,
  'CalendarDiaryList'
>;

interface Props {
  route: CalendarDiaryProps;
}

const CalendarDiaryListScreen: React.FC<Props> = ({route}) => {
  const {pageNum} = route.params;
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
          <CustomTouchable
            onPress={onPressButton}
            style={{paddingRight: 10, paddingVertical: 3}}>
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
        pageNum={pageNum}
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
        <DiaryUpdateDeleteModal
          handleCloseModal={() => setIsModalOpen(false)}
          handleUpdate={clickUpdatePage}
          handleDelete={clickDeletePage}
        />
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
