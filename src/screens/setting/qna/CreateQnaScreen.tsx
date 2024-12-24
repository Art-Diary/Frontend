import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {BACK_COLOR} from '~/components/common/colors';
import styled from 'styled-components/native';
import LoadingModal from '~/components/common/modal/LoadingModal';
import BackView from '~/components/common/BackView';
import {useCreateQna} from '~/api/queries/qna';
import QnaEditByUserFrame from '~/components/qna/QnaEditByUserFrame';
import {toastErrorMessage} from '~/utils/message';

const CreateQnaScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  // create api
  const {mutate: createQna, isLoading, isError, isSuccess} = useCreateQna();

  useEffect(() => {
    if (isError) {
      toastErrorMessage();
    }
    if (isSuccess) {
      // 설정 페이지의 등록한 전시회 페이지로 이동
      navigation.goBack();
    }
  }, [isError, isSuccess]);

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <BackView title="질문 작성" line={true} children={null} />
      <QnaEditByUserFrame createQnaApi={createQna} />
    </Container>
  );
};

export default CreateQnaScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;
