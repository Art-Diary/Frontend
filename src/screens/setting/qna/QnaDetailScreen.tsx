import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '~/components/common/colors';
import {FONT_NAME, BUTTON_RADIUS} from '~/components/common/style';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import CustomTouchable from '~/components/common/CustomTouchable';
import {ScrollView} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {EditRegExhIcon, TrashRegExhIcon} from '~/components/common/icon';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';
import {RootStackParamList} from '~/utils/stackTypes';
import QnaOptionsModal from '~/components/qna/QnaOptionsModal';
import {useDeleteQna, useFetchQnaDetail} from '~/api/queries/qna';
import {toastErrorMessage} from '~/utils/message';

type QnaDetailScreenProp = RouteProp<RootStackParamList, 'QnaDetail'>;

interface Props {
  route: QnaDetailScreenProp;
}

const QnaDetailScreen: React.FC<Props> = ({route}) => {
  // Hooks
  const {isAdmin, qnaId} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();

  // State Management
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openTrashModal, setOpenTrashModal] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // API Hooks
  const {
    data: qnaInfo,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    isSuccess: isSuccessDetail,
    refetch,
  } = useFetchQnaDetail(qnaId, isAdmin);
  const {
    mutate: deleteQna,
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    isSuccess: isSuccessDelete,
  } = useDeleteQna(qnaId);

  // Effects
  useEffect(() => {
    if (isErrorDetail) {
      setIsErrorOpen(true);
    }
  }, [isErrorDetail]);

  useEffect(() => {
    if (isErrorDelete) {
      toastErrorMessage();
    }
    if (isSuccessDelete) {
      setOpenTrashModal(false);
      navigation.goBack();
    }
  }, [isErrorDelete, isSuccessDelete]);

  // Handlers
  const handleAnswerQna = () => {
    // 관리자의 답변 작성
    navigation.navigate('AnswerQna', {qnaInfo});
  };

  const handleUpdateQna = () => {
    // 사용자의 질문 수정
    setOpenEditModal(false);
    navigation.navigate('UpdateQna', {qnaInfo});
  };

  const handleDeleteQna = () => {
    deleteQna();
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoadingDetail || isLoadingDelete} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      <BackView title={''} line={true}>
        {isAdmin && (
          // 코멘트 작성 아이콘
          <CustomTouchable onPress={handleAnswerQna}>
            <EditRegExhIcon />
          </CustomTouchable>
        )}
        {!isAdmin && qnaInfo && !qnaInfo.state && (
          <IconWrapper>
            <CustomTouchable onPress={() => setOpenEditModal(true)}>
              {openEditModal && (
                <QnaOptionsModal
                  option={'UPDATE'}
                  handleCloseModal={() => setOpenEditModal(false)}
                  onPressYes={handleUpdateQna}
                />
              )}
              <EditRegExhIcon />
            </CustomTouchable>
            <CustomTouchable onPress={() => setOpenTrashModal(true)}>
              {openTrashModal && (
                <QnaOptionsModal
                  option={'DELETE'}
                  handleCloseModal={() => setOpenTrashModal(false)}
                  onPressYes={handleDeleteQna}
                />
              )}
              <TrashRegExhIcon />
            </CustomTouchable>
          </IconWrapper>
        )}
      </BackView>
      <ScrollView>
        {qnaInfo && (
          <Qna>
            <Question>
              <Title>
                <Text size={23}>Q. </Text>
                <Text size={18}>{qnaInfo.title}</Text>
              </Title>
              <Body>
                <Text size={16}>{qnaInfo.body}</Text>
                <Date>
                  <Text size={12} color>
                    {qnaInfo.writeDate}
                  </Text>
                </Date>
              </Body>
            </Question>
            {qnaInfo.state && (
              <Answer>
                <Text size={23}>A. </Text>
                <Text size={16}>{qnaInfo.answer}</Text>
                <Date>
                  <Text size={12} color>
                    {qnaInfo.answerDate}
                  </Text>
                </Date>
              </Answer>
            )}
          </Qna>
        )}
      </ScrollView>
    </Container>
  );
};

export default QnaDetailScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
  width: 100%;
`;

const IconWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${wp(3)}px;
  padding-right: ${wp(1)}px;
`;

const Qna = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: ${wp(5)}px;
  padding-bottom: ${wp(0)}px;
  gap: ${hp(4.5)}px;
`;

const Question = styled.View`
  flex-direction: column;
  gap: ${hp(2)}px;
`;

const Title = styled.View`
  flex-direction: row;
  gap: ${wp(1)}px;
  align-items: center;
  /* border-width: 1px; */
`;

interface TitleProps {
  size: number;
  color: boolean;
}

const Text = styled.Text<TitleProps>`
  font-size: ${(props: TitleProps) => `${rf(props.size)}px`};
  color: ${(props: TitleProps) =>
    props.color ? `${MIDDLE_GREY}` : `${DEFAULT_TEXT}`};
  font-family: ${FONT_NAME};
  line-height: ${hp(2.8)}px;
  /* border-width: 1px; */
`;

const Body = styled.View`
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${BUTTON_RADIUS}px;
  padding: ${wp(2.9)}px;
`;

const Answer = styled.View`
  flex-direction: column;
  gap: ${hp(1.5)}px;
`;

const Date = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;
