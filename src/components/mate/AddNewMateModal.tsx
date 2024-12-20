import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import {showToast} from '~/components/common/modal/toastConfig';
import SearchExhFrame from '~/components/exhSearch/SearchExhFrame';
import SearchNewMateList from './SearchNewMateList';
import {useAddNewMate} from '~/api/queries/mate';
import {checkBlankInKeyword} from '~/utils/keyword';
import {DEFAULT_TEXT, LIGHT_GREY, MAIN_COLOR} from '~/components/common/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import InfoModal from '../common/modal/InfoModal';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import LoadingModal from '../common/modal/LoadingModal';

interface Props {
  handleCloseModal: () => void;
}

const AddNewMateModal: React.FC<Props> = ({handleCloseModal}) => {
  const [nicknameKeyword, setNicknameKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedMate, setSelectedMate] = useState(-1);
  const {
    mutate: addNewMate,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useAddNewMate(selectedMate);

  useEffect(() => {
    if (isError) {
      const statusCode = error?.response?.status;

      if (statusCode === 409) {
        // 상태 코드를 체크 (예: 409 Conflict)
        showToast('이미 추가한 전시 메이트입니다.');
      } else {
        showToast('다시 시도해주세요.');
      }
    }
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isError, isSuccess]);

  const onPressCreate = () => {
    Keyboard.dismiss();
    console.log(selectedMate);
    if (selectedMate !== -1) {
      addNewMate();
    } else {
      showToast('추가할 전시 메이트를 선택해주세요.');
    }
  };

  const onPressSearch = () => {
    if (checkBlankInKeyword(nicknameKeyword)) {
      showToast('다시 검색해 주세요.');
    } else {
      setSelectedMate(-1);
      setKeyword(nicknameKeyword);
    }
    Keyboard.dismiss();
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isLoading} />
      <Message>전시 메이트 추가</Message>
      {/* 달력 */}
      <Wrapper>
        <SearchExhFrame
          searchKeyword={nicknameKeyword}
          onPressSearch={onPressSearch}
          handleSearchKeyword={setNicknameKeyword}
          searchMessage={'닉네임을 검색하세요.'}>
          {/* 전시회 메이트 목록 */}
          {keyword !== '' && (
            <SearchNewMateList
              searchKeyword={keyword}
              selectedMate={selectedMate}
              handleSelectedMate={setSelectedMate}
            />
          )}
        </SearchExhFrame>
        <ButtonTouch
          activeOpacity={0.6}
          onPress={onPressCreate}
          disabled={selectedMate === -1 ? true : false}>
          <NextButton isSelected={selectedMate === -1 ? false : true}>
            추가
          </NextButton>
        </ButtonTouch>
      </Wrapper>
    </InfoModal>
  );
};

export default AddNewMateModal;

/** style */
const Message = styled.Text`
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-top: ${hp(1)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(4)}px;
`;

const Wrapper = styled.View`
  flex: 1;
`;

interface ButtonProps {
  isSelected: boolean;
}

const NextButton = styled.Text<ButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: ButtonProps) =>
    props.isSelected ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const ButtonTouch = styled.TouchableOpacity`
  padding-left: ${wp(4)}px;
  padding-right: ${wp(4)}px;
`;
