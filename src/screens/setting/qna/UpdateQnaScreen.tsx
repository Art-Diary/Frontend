import React, {useEffect} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {BACK_COLOR} from '~/components/common/colors';
import styled from 'styled-components/native';
import LoadingModal from '~/components/common/modal/LoadingModal';
import BackView from '~/components/common/BackView';
import QnaEditByUserFrame from '~/components/qna/QnaEditByUserFrame';
import {RootStackParamList} from '~/utils/stackTypes';
import {useUpdateQuestionByUser} from '~/api/queries/qna';
import {toastErrorMessage} from '~/utils/message';

type QnaDetailScreenProp = RouteProp<RootStackParamList, 'UpdateQna'>;

interface Props {
  route: QnaDetailScreenProp;
}
const UpdateQnaScreen: React.FC<Props> = ({route}) => {
  const {qnaInfo} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();

  // update api
  const {
    mutate: updateQuestionByUser,
    isLoading,
    isError,
    isSuccess,
  } = useUpdateQuestionByUser(qnaInfo.qnaId);

  useEffect(() => {
    if (isError) {
      toastErrorMessage();
    }
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isError, isSuccess]);

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <BackView title="질문 수정" line={true} children={null} />
      <QnaEditByUserFrame
        qnaInfo={qnaInfo}
        updateQnaApi={updateQuestionByUser}
      />
    </Container>
  );
};

export default UpdateQnaScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;
