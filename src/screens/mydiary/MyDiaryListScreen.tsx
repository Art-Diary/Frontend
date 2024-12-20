import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {OptionBarIcon, WriteDiaryButtonIcon} from '~/components/common/icon';
import {BACK_COLOR} from '~/components/common/colors';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useFetchMyDiaryList} from '~/api/queries/mydiary';
import InfoMessageView from '~/components/common/InfoMessageView';
import DiaryList from '~/components/common/diary/DiaryList';
import CustomTouchable from '~/components/common/CustomTouchable';
import {MyDiaryStackParamList} from '~/utils/stackTypes';
import DiaryUpdateDeleteModal from '~/components/common/diary/modal/DiaryUpdateDeleteModal';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

type MyDiaryListScreenProps = RouteProp<MyDiaryStackParamList, 'MyDiaryList'>;

interface Props {
  route: MyDiaryListScreenProps;
}

const MyDiaryListScreen: React.FC<Props> = ({route}) => {
  const {pageNum} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const {updateIsUpdate, updateInGathering, resetWriteInfo} =
    useWriteMyDiaryActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState<boolean>(false);
  const [showOptionBar, setShowOptionBar] = useState(false);
  const {
    data: myDiaryList,
    isLoading,
    isError,
    refetch,
  } = useFetchMyDiaryList(visitedExhId);
  const [first, setFirst] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  const onPressButton = () => {
    resetWriteInfo();
    updateIsUpdate(false);
    updateInGathering(false, null);
    navigation.navigate('CreateExhVisitedDate', {exhId: visitedExhId});
  };

  const clickDeletePage = () => {
    setIsDeleteModalOpen(true);
  };

  const clickUpdatePage = () => {
    setIsUpdateClicked(true);
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
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
      {myDiaryList &&
        (myDiaryList.length === 0 ? (
          <InfoMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
        ) : (
          <DiaryList
            pageNum={pageNum}
            first={first}
            handleFirst={() => setFirst(true)}
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
        ))}
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
