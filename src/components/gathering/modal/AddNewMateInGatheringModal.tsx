import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {Keyboard} from 'react-native';
import {showToast} from '~/components/common/modal/toastConfig';
import LoadingModal from '~/components/common/modal/LoadingModal';
import SearchExhFrame from '~/components/exhSearch/SearchExhFrame';
import {useAddNewMateInGathering} from '~/api/queries/gathering';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';
import {DEFAULT_TEXT, LIGHT_GREY, MAIN_COLOR} from '~/components/common/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import SearchNewMateListInGathering from '../SearchNewMateListInGathering';
import InfoModal from '../../common/modal/InfoModal';

interface Props {
  handleCloseModal: () => void;
}

const AddNewMateInGatheringModal: React.FC<Props> = ({handleCloseModal}) => {
  const {enterGatheringInfo} = useEnterGatheringInfo();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [nicknameKeyword, setNicknameKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedMate, setSelectedMate] = useState(-1);
  const {
    mutate: addNewMate,
    isLoading,
    isError,
    isSuccess,
  } = useAddNewMateInGathering(enterGatheringInfo.gatherId, selectedMate);

  useEffect(() => {
    if (isError) {
      showToast('전시 메이트 추가를 실패했습니다.');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      showToast('전시 메이트 추가 성공 :)');
      handleCloseModal();
    }
  }, [isError, isLoading, isSuccess]);

  const onPressCreate = () => {
    Keyboard.dismiss();
    if (selectedMate !== -1) {
      addNewMate();
    } else {
      showToast('추가할 전시 메이트를 선택해주세요.');
    }
  };

  useEffect(() => {
    if (nicknameKeyword === '') {
      setKeyword('');
    }
  }, [nicknameKeyword]);

  const onPressSearch = () => {
    setSelectedMate(-1);
    setKeyword(nicknameKeyword);
    Keyboard.dismiss();
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <AreaView>
        <Message>모임 메이트 선택</Message>
        <Message greyColor={true}>(내 전시 메이트만 가능)</Message>
      </AreaView>
      <Contents>
        <SearchExhFrame
          searchKeyword={nicknameKeyword}
          onPressSearch={onPressSearch}
          handleSearchKeyword={setNicknameKeyword}
          searchMessage={'닉네임을 검색하세요'}>
          {/* 모임 메이트 목록 */}
          <SearchNewMateListInGathering
            searchKeyword={keyword}
            changeIsPressed={onPressSearch}
            selectedMate={selectedMate}
            handleSelectedMate={setSelectedMate}
          />
        </SearchExhFrame>
        {/* 모임 메이트 추가 버튼 */}
        <ButtonTouch
          activeOpacity={0.6}
          onPress={onPressCreate}
          disabled={selectedMate === -1 ? true : false}>
          <CreateButton isSelected={selectedMate === -1 ? false : true}>
            추가
          </CreateButton>
        </ButtonTouch>
      </Contents>
      {isLoadingOpen && <LoadingModal message={'모임 메이트 추가 중'} />}
    </InfoModal>
  );
};

export default AddNewMateInGatheringModal;

/** style */
const AreaView = styled.View`
  flex-direction: row;
  padding-top: ${hp(1)}px;
  padding-left: ${wp(5)}px;
  gap: ${wp(1.5)}px;
  align-items: center;
`;

interface AreaTextProps {
  greyColor: boolean;
}

const Message = styled.Text`
  font-size: ${(props: AreaTextProps) =>
    props.greyColor ? `${rf(14)}px` : `${BUTTON_FONT_SIZE}px`};
  color: ${(props: AreaTextProps) =>
    props.greyColor ? `${LIGHT_GREY}` : `${DEFAULT_TEXT}`};
  font-family: ${FONT_NAME};
`;

const Contents = styled.View`
  flex: 1;
`;

const ButtonTouch = styled.TouchableOpacity`
  padding-left: ${wp(4)}px;
  padding-right: ${wp(4)}px;
`;

interface CreateButtonProps {
  isSelected: boolean;
}

const CreateButton = styled.Text<CreateButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: CreateButtonProps) =>
    props.isSelected ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
