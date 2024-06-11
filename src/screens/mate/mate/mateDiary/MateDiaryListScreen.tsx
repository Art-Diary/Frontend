import React from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import FetchMateDiaryList from './FetchMateDiaryList';

const MateDiaryListScreen = () => {
  return (
    <Container>
      {/* header */}
      <BackView line={false} />

      {/* body */}
      <FetchMateDiaryList />
    </Container>
  );
};

export default MateDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;
