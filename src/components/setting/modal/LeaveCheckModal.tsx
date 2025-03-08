import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {
  heightSizePercentage as hp,
  widthSizePercentage as wp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {showToast} from '~/components/common/modal/toastConfig';
import {DARK_GREY, MAIN_COLOR, MIDDLE_GREY} from '~/components/common/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import CustomTouchable from '~/components/common/CustomTouchable';
import DecisionModal from '~/components/common/modal/DecisionModal';
import {useDeleteUser} from '~/api/queries/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '~/components/common/modal/LoadingModal';

interface DeleteDiaryModalProps {
  handleCloseModal: () => void;
  reason: string;
}

const LeaveCheckModal: React.FC<DeleteDiaryModalProps> = ({
  handleCloseModal,
  reason,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {
    mutate: deleteUser,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteUser(reason);

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해주세요.');
    }
    if (isSuccess) {
      handleCloseModal();
      // TODO 나중에 로그아웃 구체적으로 하기
      AsyncStorage.removeItem('userId');
      // 로그인 페이지로 이동
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, [isError, isSuccess]);

  const onPressLeave = () => {
    deleteUser();
  };

  return (
    <DecisionModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isLoading} />
      <Contents>
        <MsgWrapper>
          <Message>정말 탈퇴하겠습니까?</Message>
          <MessageSub>탈퇴하면 복구할 수 없습니다.</MessageSub>
        </MsgWrapper>
        <CustomTouchable onPress={onPressLeave}>
          <DeleteButton>탈퇴</DeleteButton>
        </CustomTouchable>
      </Contents>
    </DecisionModal>
  );
};

export default LeaveCheckModal;

/** style */
const Contents = styled.View`
  flex: 1px;
  justify-content: space-between;
  padding-top: ${hp(2)}px;
  padding-bottom: ${hp(2.5)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
`;

const MsgWrapper = styled.View`
  flex: 1px;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${hp(1.3)}px;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${rf(18.5)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const MessageSub = styled.Text`
  font-size: ${rf(14.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
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
