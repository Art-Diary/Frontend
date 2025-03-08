import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {Keyboard} from 'react-native';
import {showToast} from '~/components/common/modal/toastConfig';
import {useCreateGathering} from '~/api/queries/gathering';
import {checkBlankInKeyword, removeControlCharacter} from '~/utils/keyword';
import {
  BACK_COLOR,
  DARK_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';
import InfoModal from '../../common/modal/InfoModal';
import LoadingModal from '~/components/common/modal/LoadingModal';

interface Props {
  handleCloseModal: () => void;
}

const CreateGatheringModal: React.FC<Props> = ({handleCloseModal}) => {
  const maxInputLength = 12;
  const [gahteringKeyword, setGahteringKeyword] = useState<string>('');
  const {
    mutate: createGathering,
    isLoading,
    isError,
    isSuccess,
  } = useCreateGathering(gahteringKeyword);

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해주세요.');
    }
    if (isSuccess) {
      handleCloseModal();
      // TODO 모임 안으로 들어가기
    }
  }, [isError, isSuccess]);

  const onChangeGathering = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    setGahteringKeyword(cleaned);
  }, []);

  const onPressCreate = () => {
    if (checkBlankInKeyword(gahteringKeyword)) {
      showToast('모임 이름을 다시 작성해주세요.');
    } else {
      createGathering();
    }
    Keyboard.dismiss();
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isLoading} />
      <Message>모임 만들기</Message>
      {/* body */}
      <Contents>
        <ContentWrapper>
          {/* <ContentText>모임 이름</ContentText> */}
          <WriteView>
            <GatheringInput
              maxLength={maxInputLength}
              multiline={false}
              placeholderTextColor={LIGHT_GREY}
              placeholder={'새로운 모임 이름을 작성해주세요.'}
              onChangeText={onChangeGathering}
              value={gahteringKeyword}
            />
            <CountText>
              {gahteringKeyword.length} / {maxInputLength}
            </CountText>
          </WriteView>
        </ContentWrapper>
        {/* 모임 만들기 버튼 */}
        <CustomTouchable onPress={onPressCreate}>
          <CreateButton>모임 만들기</CreateButton>
        </CustomTouchable>
      </Contents>
    </InfoModal>
  );
};

export default CreateGatheringModal;

/** style */
const Message = styled.Text`
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${hp(1)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(4)}px;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
  padding-top: ${hp(3)}px;
  padding-left: ${wp(4)}px;
  padding-right: ${wp(4)}px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  gap: ${wp(3.8)}px;
`;

const CreateButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const WriteView = styled.View`
  flex-direction: row;
  border-width: ${wp(0.33)}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  align-items: center;
  justify-content: space-between;
  padding-left: ${wp(2.8)}px;
  padding-right: ${wp(2.8)}px;
`;

const GatheringInput = styled.TextInput`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  width: 80%;
`;

const CountText = styled.Text`
  font-size: ${rf(16)}px;
  font-family: ${FONT_NAME};
  color: ${MIDDLE_GREY};
  text-align: center;
`;
