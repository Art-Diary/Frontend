import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {showToast} from '~/components/common/modal/toastConfig';
import {
  BACK_COLOR,
  DARK_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '~/components/common/colors';
import styled from 'styled-components/native';
import LoadingModal from '~/components/common/modal/LoadingModal';
import BackView from '~/components/common/BackView';
import {RootStackParamList} from '~/utils/stackTypes';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import TextInputForm from '~/components/common/TextInputForm';
import CustomTouchable from '~/components/common/CustomTouchable';
import {checkBlankInKeyword} from '~/utils/keyword';
import {useUpdateAnswerByAdmin} from '~/api/queries/qna';
import {changeDotToHyphen, dateToString} from '~/utils/date';
import {toastErrorMessage} from '~/utils/message';
import {ScrollView} from 'react-native';

type QnaDetailScreenProp = RouteProp<RootStackParamList, 'AnswerQna'>;

interface Props {
  route: QnaDetailScreenProp;
}
const AnswerQnaScreen: React.FC<Props> = ({route}) => {
  const {qnaInfo} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const [answer, setAnswer] = useState<string>('');

  // write api
  const {
    mutate: answerQna,
    isLoading,
    isError,
    isSuccess,
  } = useUpdateAnswerByAdmin(qnaInfo.qnaId);

  useEffect(() => {
    if (isError) {
      toastErrorMessage();
    }
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isError, isSuccess]);

  const checkForm = () => {
    // 답변
    if (checkBlankInKeyword(answer)) {
      showToast('답변을 입력해주세요.');
      return;
    }
    // update answer
    answerQna({
      qnaId: qnaInfo.qnaId,
      answer: answer,
      answerDate: changeDotToHyphen(dateToString(new Date())),
    });
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <BackView title="답변 작성" line={true} children={null} />
      <ScrollView>
        <Qna>
          <Question>
            <Title>
              <TitleText size={23}>Q. </TitleText>
              <TitleText size={18} titleStr>
                {qnaInfo.title}
              </TitleText>
            </Title>
            <Body>
              <BodyText size={16}>{qnaInfo.body}</BodyText>
              <DateView>
                <BodyText size={12} color>
                  {qnaInfo.writeDate}
                </BodyText>
              </DateView>
            </Body>
          </Question>
          <Answer>
            <TextInputForm
              title={'답변'}
              multiLine
              keyword={answer}
              handleKeyword={setAnswer}
            />
          </Answer>
          {/* 확인 버튼 */}
          <CustomTouchable onPress={checkForm}>
            <ConfirmButton>완료</ConfirmButton>
          </CustomTouchable>
        </Qna>
      </ScrollView>
    </Container>
  );
};

export default AnswerQnaScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

const Qna = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: ${wp(5)}px;
  padding-bottom: ${wp(0)}px;
  gap: ${hp(3)}px;
`;

const Question = styled.View`
  flex-direction: column;
  gap: ${hp(2)}px;
`;

const Title = styled.View`
  flex-direction: row;
  gap: ${wp(1)}px;
`;

interface TextProps {
  size: number;
  color: boolean;
  titleStr: boolean;
}

const TitleText = styled.Text<TextProps>`
  flex: ${(props: TextProps) => (props.titleStr ? `1` : `none`)};
  font-size: ${(props: TextProps) => `${rf(props.size)}px`};
  color: ${(props: TextProps) =>
    props.color ? `${MIDDLE_GREY}` : `${DARK_GREY}`};
  font-family: ${FONT_NAME};
`;

const BodyText = styled.Text<TextProps>`
  font-size: ${(props: TextProps) => `${rf(props.size)}px`};
  color: ${(props: TextProps) =>
    props.color ? `${MIDDLE_GREY}` : `${DARK_GREY}`};
  font-family: ${FONT_NAME};
  line-height: ${hp(2.8)}px;
`;

const Body = styled.View`
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${BUTTON_RADIUS}px;
  padding: ${wp(2.9)}px;
`;

const DateView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const Answer = styled.View`
  flex: 1;
  flex-direction: column;
  gap: ${hp(1.5)}px;
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
