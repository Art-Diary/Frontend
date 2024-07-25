import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import DiaryList from '~/components/diary/DiaryList';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import BackView from '~/components/common/BackView';
import {OptionBarIcon} from '~/components/common/icon';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {
  BORDER_COLOR,
  DEFAULT_TEXT,
  MAIN_COLOR,
} from '~/components/common/colors';
import {
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import CustomTouchable from '~/components/common/CustomTouchable';

type RootStackParamList = {
  ExhToDiary: {diary: any};
};

type ExhDetailInfoScreenRouteProp = RouteProp<RootStackParamList, 'ExhToDiary'>;

interface Props {
  route: ExhDetailInfoScreenRouteProp;
}

const ExhToDiary: React.FC<Props> = ({route}) => {
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
        <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
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
export default ExhToDiary;

/** style */

const Container = styled.View`
  // height: 30%;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
  /* justify-content: center;
  align-items: center; */
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
