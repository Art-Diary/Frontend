import React from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {useMyDiaryExhId} from '~/zustand/mydiary/mydiary';
import MyDiaryList from './MyDiaryList';

const MyDiaryUpdateScreen = () => {
  const exhId = useMyDiaryExhId();

  return (
    <Container>
      {/* header */}
      <BackView children={null}></BackView>

      {/* body */}
      <MyDiaryList />
    </Container>
  );
};

export default MyDiaryUpdateScreen;

/** style */
const Container = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;
