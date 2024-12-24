import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import CustomTouchable from '~/components/common/CustomTouchable';
import {BACK_COLOR, MAIN_COLOR} from '~/components/common/colors';
import {checkBlankInKeyword} from '~/utils/keyword';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {showToast} from '~/components/common/modal/toastConfig';
import {changeDotToHyphen, dateToString} from '~/utils/date';
import {QnaRequestType} from '~/api/qna';
import TextInputForm from '../common/TextInputForm';
import {QnaInfo} from '~/types';

interface ExhFormFrameProps {
  createQnaApi?: (data: QnaRequestType) => void;
  updateQnaApi?: (data: QnaRequestType) => void;
  qnaInfo?: QnaInfo;
}

const QnaEditByUserFrame: React.FC<ExhFormFrameProps> = ({
  createQnaApi,
  updateQnaApi,
  qnaInfo,
}) => {
  const titleMaxInputLength = 20;
  const bodyMaxInputLength = 200;
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  useEffect(() => {
    if (qnaInfo) {
      setTitle(qnaInfo.title);
      setBody(qnaInfo.body);
    }
  }, [qnaInfo]);

  const checkForm = () => {
    // 제목
    if (checkBlankInKeyword(title)) {
      showToast('제목을 입력해주세요.');
      return;
    }
    // 내용
    if (checkBlankInKeyword(body)) {
      showToast('내용을 입력해주세요.');
      return;
    }
    if (createQnaApi) {
      // create question
      createQnaApi({
        title,
        body,
        writeDate: changeDotToHyphen(dateToString(new Date())),
      });
    } else if (updateQnaApi) {
      // udpate question
      updateQnaApi({
        qnaId: qnaInfo?.qnaId,
        title,
        body,
        writeDate: changeDotToHyphen(dateToString(new Date())),
      });
    }
  };

  return (
    <Container>
      {/* 제목 */}
      <TextInputForm
        title={'제목'}
        maxLen={titleMaxInputLength}
        keyword={title}
        handleKeyword={setTitle}
      />
      {/* 내용 */}
      <TextWrapper>
        <TextInputForm
          title={'내용'}
          multiLine
          maxLen={bodyMaxInputLength}
          keyword={body}
          handleKeyword={setBody}
          full
        />
      </TextWrapper>
      {/* 확인 버튼 */}
      <CustomTouchable onPress={checkForm}>
        <ConfirmButton>완료</ConfirmButton>
      </CustomTouchable>
    </Container>
  );
};

export default QnaEditByUserFrame;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-top: ${hp(1.6)}px;
  padding-bottom: ${hp(1.6)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
  gap: ${hp(1.6)}px;
  background-color: ${BACK_COLOR};
`;

const TextWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const ConfirmButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
