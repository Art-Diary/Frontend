import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useDeleteMyDiary} from '~/api/queries/mydiary';
import {
  useDeleteMyDiaryActions,
  useDeleteMyDiaryInfo,
} from '~/zustand/mydiary/mydiary';
import {
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {
  widthPercentage as wp,
  // heightPercentage as hp,
  // fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface OptionsModalProps {
  handleCloseModal: () => void;
  message: string;
  // tkey: string | null;
  onPressYes: () => void;
  onPressNo: () => void;
}

const DeleteDiaryModal: React.FC<OptionsModalProps> = ({
  handleCloseModal,
  message,
  //  tkey,
  onPressYes,
  onPressNo,
  //handleIsDeleted,
}) => {
  // const onPressYes=()=>{
  //   setD(null);
  // }
  //   const deletemyDiaryInfo = useDeleteMyDiaryInfo();
  //   const {updateforDeleteMyDiary} = useDeleteMyDiaryActions();
  //   const {
  //     mutate: deleteMyDiary,
  //     isLoading,
  //     isError,
  //     isSuccess,
  //   } = useDeleteMyDiary(
  //     deletemyDiaryInfo.exhId,
  //     deletemyDiaryInfo.diaryId,
  //     deletemyDiaryInfo.userExhId ? true : false, // 모임 or 혼자
  //   );

  // useEffect(() => {
  //   console.log('넘겨받은 키:', tkey);
  // }, [tkey]);

  return (
    <ConfirmationModal handleCloseModal={handleCloseModal}>
      <Message>{message}</Message>
      <ButtonSection>
        <ButtonDetailSection>
          <TouchableOpacity onPress={onPressYes}>
            <DeleteButton> 예 </DeleteButton>
          </TouchableOpacity>
        </ButtonDetailSection>
        <ButtonDetailSection>
          <TouchableOpacity onPress={onPressNo}>
            <DeleteButton>아니요</DeleteButton>
          </TouchableOpacity>
        </ButtonDetailSection>
      </ButtonSection>
    </ConfirmationModal>
  );
};

export default DeleteDiaryModal;

/** style */
const Message = styled.Text`
  text-align: center;
  font-size: ${fp(17.9)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding-top: ${hp(25)}px;
  padding-bottom: ${hp(25)}px;
`;

const ButtonSection = styled.View`
  /* text-align: center;
  font-size: ${fp(17.9)}px; */
  //flex: 1;
  display: flex;
  // flex-wrap: wrap;
  color: #3c4045;
  flex-direction: row;
  width: 100%;
  //gap: 5px;
  //align-items: last baseline;
  padding-right: ${wp(10)}px;
  padding-left: ${wp(10)}px;
`;

const ButtonDetailSection = styled.View`
  //text-align: center;
  //display: flex;
  flex: 1;
  color: #3c4045;
  flex-direction: column;
  // gap: 10px;
  //align-items: last baseline;
  padding: ${wp(10)}px;
  width: 100%;
`;

const DeleteButton = styled.Text`
  text-align: center;
  /* margin-top: ${hp(14)}px;
  margin-right: ${hp(14)}px; */
  font-size: ${fp(17.9)}px;
  font-family: 'omyu pretty';
  color: white;
  background-color: #ff6f61;
  padding-top: ${hp(9.5)}px;
  padding-bottom: ${hp(9.5)}px;
  padding-left: ${hp(30)}px;
  padding-right: ${hp(30)}px;
  border-radius: 5px;
`;
