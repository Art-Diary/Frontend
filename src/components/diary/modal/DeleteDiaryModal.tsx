import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {mydiaryQueryKeys, useDeleteMyDiary} from '~/api/queries/mydiary';
import {
  useDeleteMyDiaryActions,
  useDeleteMyDiaryInfo,
} from '~/zustand/mydiary/mydiary';
import {heightSizePercentage as hp} from '~/components/common/ResponsiveSize';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {useQueryClient} from 'react-query';
import {useTabIdentifierInfo} from '~/zustand/tabIdentifier';
import {gatheringQueryKeys} from '~/api/queries/gathering';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';
import {DEFAULT_TEXT, MAIN_COLOR} from '~/components/common/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';

type DeleteInfo = {
  exhId: number;
  diaryId: number;
  userExhId: number;
};

interface DeleteDiaryModalProps {
  deleteInfo: DeleteInfo;
  handleCloseModal: () => void;
  message: string;
  handleSuccessDelete: () => void;
}

const DeleteDiaryModal: React.FC<DeleteDiaryModalProps> = ({
  deleteInfo,
  handleCloseModal,
  message,
  handleSuccessDelete,
}) => {
  // const queryClient = useQueryClient();
  // const {enterGatheringInfo} = useEnterGatheringInfo();
  // const tabIdentifierInfo = useTabIdentifierInfo();
  // const exhFromCalendarInfo = useExhFromCalendarInfo();
  // const deletemyDiaryInfo = useDeleteMyDiaryInfo();
  const {updateforDeleteMyDiary} = useDeleteMyDiaryActions();
  const {
    mutate: deleteMyDiary,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteMyDiary(
    deleteInfo.exhId,
    deleteInfo.diaryId,
    deleteInfo.userExhId ? true : false, // 모임 or 혼자
  );

  useEffect(() => {
    if (isError) {
      handleCloseModal();
      showToast('에러 발생 ;(');
    }
    if (isSuccess) {
      updateforDeleteMyDiary(-1, -1, -1);
      handleCloseModal();
      showToast('기록을 삭제했습니다.');
      handleSuccessDelete();

      // if (tabIdentifierInfo.tab === 'mydiary') {
      //   // queryClient.invalidateQueries(
      //   //   mydiaryQueryKeys.fetchMyDiaryList(deletemyDiaryInfo.exhId),
      //   // );
      //   // queryClient.invalidateQueries(mydiaryQueryKeys.fetchMyExhList());
      // } else if (tabIdentifierInfo.tab === 'gathering') {
      //   console.log('??');
      //   // TODO 업데이트 안됨.
      //   queryClient.removeQueries(
      //     gatheringQueryKeys.fetchGatheringDiaryList(
      //       enterGatheringInfo.gatherId,
      //       deletemyDiaryInfo.exhId,
      //     ),
      //   );
      // } else if (tabIdentifierInfo.tab === 'calendar') {
      //   queryClient.invalidateQueries(
      //     mydiaryQueryKeys.fetchMyDiaryListInCalendar(
      //       deletemyDiaryInfo.exhId,
      //       exhFromCalendarInfo.forget,
      //       exhFromCalendarInfo.visitDate,
      //       exhFromCalendarInfo.gatherId,
      //     ),
      //   );
      // }
    }
  }, [isError, isSuccess, handleCloseModal]);

  return (
    <ConfirmationModal handleCloseModal={handleCloseModal}>
      <Message>{message}</Message>
      <TouchableOpacity onPress={() => deleteMyDiary()}>
        <DeleteButton>삭제</DeleteButton>
      </TouchableOpacity>
    </ConfirmationModal>
  );
};

export default DeleteDiaryModal;

/** style */
const Message = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding: ${hp(8)}px;
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
