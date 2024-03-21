import React from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import DiaryList from '../../../components/diary/DiaryList';

const MyDiaryUpdateScreen = () => {
  return (
    <Container>
      {/* header */}
      <BackView line={false} children={null}></BackView>

      {/* body */}
      <DiaryList />
    </Container>
  );
};

export default MyDiaryUpdateScreen;

/** style */
const Container = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;
