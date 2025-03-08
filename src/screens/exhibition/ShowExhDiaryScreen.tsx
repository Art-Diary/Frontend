import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import DiaryList from '~/components/common/diary/DiaryList';
import InfoMessageView from '~/components/common/InfoMessageView';
import BackView from '~/components/common/BackView';
import {OptionBarIcon} from '~/components/common/icon';
import CustomTouchable from '~/components/common/CustomTouchable';
import DiaryUpdateDeleteModal from '~/components/common/diary/modal/DiaryUpdateDeleteModal';
import {BACK_COLOR} from '~/components/common/colors';

type RootStackParamList = {
  ExhToDiary: {diary: any};
};

type ExhDetailInfoScreenRouteProp = RouteProp<RootStackParamList, 'ExhToDiary'>;

interface Props {
  route: ExhDetailInfoScreenRouteProp;
}

const ShowExhDiaryScreen: React.FC<Props> = ({route}) => {
  //  const navigation = useNavigation<RootStackNavigationProp>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState<boolean>(false);
  const [showOptionBar, setShowOptionBar] = useState(false);

  const {diary} = route.params;
  const [diaryArr, setDiaryArr] = useState<any[]>([diary]);

  useEffect(() => {
    setDiaryArr([diary]);
  }, [diary]);

  const clickDeletePage = () => {
    setIsDeleteModalOpen(true);
  };

  const clickUpdatePage = () => {
    setIsUpdateClicked(true);
  };

  return (
    <Container>
      <BackView line={false}>
        {showOptionBar && (
          <CustomTouchable onPress={() => setIsModalOpen(true)}>
            <OptionBarIcon />
          </CustomTouchable>
        )}
      </BackView>

      {diaryArr.length === 0 ? (
        <InfoMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
      ) : (
        <DiaryList
          diaryList={diaryArr}
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
        <DiaryUpdateDeleteModal
          handleCloseModal={() => setIsModalOpen(false)}
          handleUpdate={clickUpdatePage}
          handleDelete={clickDeletePage}
        />
      )}
    </Container>
  );
};
export default ShowExhDiaryScreen;

/** style */

const Container = styled.View`
  // height: 30%;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
  /* justify-content: center;
  align-items: center; */
`;
