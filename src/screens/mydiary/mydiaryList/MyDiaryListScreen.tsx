import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {OptionBarIcon, WriteDiaryButtonIcon} from '~/components/common/icon';
import {
  BACK_COLOR,
  BORDER_COLOR,
  DEFAULT_TEXT,
  MAIN_COLOR,
} from '~/components/common/colors';
import {
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useFetchMyDiaryList} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import DiaryList from '~/components/diary/DiaryList';

const MyDiaryListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const {updateIsUpdate, updateInGathering} = useWriteMyDiaryActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState<boolean>(false);
  const [showOptionBar, setShowOptionBar] = useState(false);
  const {
    data: myDiaryList,
    isLoading,
    isError,
  } = useFetchMyDiaryList(visitedExhId);
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [haveError, setHaveError] = useState(false);

  useEffect(() => {
    if (isError) {
      setHaveError(true);
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    } else {
      setIsLoadingOpen(false);
    }
  }, [isError, isLoading]);

  const onPressButton = () => {
    updateIsUpdate(false);
    updateInGathering(false, null);
    navigation.navigate('AddMyVisitDateRoutes');
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
          <TouchableOpacity onPress={onPressButton}>
            <WriteDiaryButtonIcon />
          </TouchableOpacity>
          {showOptionBar && (
            <TouchableOpacity onPress={() => setIsModalOpen(true)}>
              <OptionBarIcon />
            </TouchableOpacity>
          )}
        </ButtonView>
      </BackView>

      {/* body */}
      {haveError ? (
        <ErrorMessageView message={'내 다이어리 목록 조회 실패 ;('} />
      ) : !myDiaryList ? (
        <></>
      ) : myDiaryList.length === 0 ? (
        <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
      ) : (
        <DiaryList
          diaryList={myDiaryList}
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
      )}
      {isModalOpen && (
        <ConfirmationModal handleCloseModal={() => setIsModalOpen(false)}>
          <TouchableOpacity onPress={clickUpdatePage}>
            <Message>수정</Message>
          </TouchableOpacity>
          <SeperateLine />
          <TouchableOpacity onPress={clickDeletePage}>
            <Message>삭제</Message>
          </TouchableOpacity>
          <TouchableOpacity>
            <DeleteButton>취소</DeleteButton>
          </TouchableOpacity>
        </ConfirmationModal>
      )}
      {isLoadingOpen && (
        <LoadingModal message={'내 다이어리 목록 조회 중 :)'} />
      )}
    </Container>
  );
};

export default MyDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
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
