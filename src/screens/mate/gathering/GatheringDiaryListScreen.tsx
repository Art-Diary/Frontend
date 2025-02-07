import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import BackView from '~/components/common/BackView';
import {useGatheringListParamsInfo} from '~/zustand/gathering/gathering';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import FetchGatheringDiaryList from '~/components/gathering/FetchGatheringDiaryList';
import {OptionBarIcon, WriteDiaryButtonIcon} from '~/components/common/icon';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import CustomTouchable from '~/components/common/CustomTouchable';
import {GatheringStackParamList} from '~/utils/stackTypes';
import DiaryUpdateDeleteModal from '~/components/common/diary/modal/DiaryUpdateDeleteModal';

type GatheringDiaryListProps = RouteProp<
  GatheringStackParamList,
  'GatheringDiaryList'
>;

interface Props {
  route: GatheringDiaryListProps;
}

const GatheringDiaryListScreen: React.FC<Props> = ({route}) => {
  const {pageNum} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const {params} = useGatheringListParamsInfo();
  const {updateIsUpdate, updateInGathering, resetWriteInfo} =
    useWriteMyDiaryActions();
  const [showOptionBar, setShowOptionBar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState<boolean>(false);

  const onPressButton = () => {
    resetWriteInfo();
    updateIsUpdate(false);
    updateInGathering(true, params.gatherId);
    navigation.navigate('CreateExhVisitedDate', {
      exhId: params.exhId,
      isInGathering: true,
    });
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
      <FetchGatheringDiaryList
        pageNum={pageNum}
        fetchInfo={{gatherId: params.gatherId, exhId: params.exhId}}
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

export default GatheringDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const ButtonView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(1.5)}px;
`;
