import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '~/components/common/colors';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';
import LeaveCheckModal from '~/components/setting/modal/LeaveCheckModal';

// [WORD_LIMIT]
const LeaveScreen = () => {
  const maxInputLength = 100;
  const [reasonKeyword, setReasonKeyword] = useState<string>('');
  const [openCheckModal, setOpenCheckModal] = useState<boolean>(false);

  const onChangeReason = useCallback((text: string) => {
    setReasonKeyword(text);
  }, []);

  const onPressButton = () => {
    setOpenCheckModal(true);
  };

  const onCloseButton = () => {
    setOpenCheckModal(false);
  };

  return (
    <Container>
      <BackView title="회원 탈퇴" line={true} />

      {/* body */}
      <Contents>
        <ContentColumn>
          <SectionName>탈퇴 이유</SectionName>
          <ReasonView>
            <ReasonInput
              multiline={true}
              maxLength={maxInputLength} // 글자 수 제한
              placeholderTextColor="#979797"
              placeholder={'탈퇴 이유를 작성해주세요.'}
              onChangeText={onChangeReason}
              value={reasonKeyword}
              textAlignVertical={'top'}
            />
            <CountView>
              <CountText>
                {reasonKeyword.length} / {maxInputLength}
              </CountText>
            </CountView>
          </ReasonView>
        </ContentColumn>
        {/* 탈퇴 버튼 */}
        {reasonKeyword !== '' ? (
          <CustomTouchable onPress={onPressButton}>
            <LeaveButton leave={true}>탈퇴</LeaveButton>
          </CustomTouchable>
        ) : (
          <LeaveButton leave={false}>탈퇴</LeaveButton>
        )}
        {openCheckModal && (
          <LeaveCheckModal
            handleCloseModal={onCloseButton}
            reason={reasonKeyword}
          />
        )}
      </Contents>
    </Container>
  );
};

export default LeaveScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  width: 100%;
  min-height: 93.2%;
  background-color: ${BACK_COLOR};
  padding: ${wp(4)}px;
`;

const ContentColumn = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: ${wp(4)}px;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const ReasonView = styled.View`
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${BUTTON_RADIUS}px;
  height: ${hp(35)}px;
`;

const ReasonInput = styled.TextInput`
  height: 100%;
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
`;

const CountView = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: ${hp(0.5)}px;
  padding-right: ${wp(1)}px;
  justify-content: flex-end;
`;

const CountText = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: ${MIDDLE_GREY};
`;

interface LeaveButtonProps {
  leave: boolean;
}

const LeaveButton = styled.Text<LeaveButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: LeaveButtonProps) =>
    props.leave ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
