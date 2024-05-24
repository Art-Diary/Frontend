import React from 'react';
import styled from 'styled-components/native';
import {fontPercentage as fp} from '~/components/common/ResponsiveSize';
import UpdateDelete from './UpdateDelete';

interface TitleProps {
  diaryInfo: any;
  handleIsDeleted: () => void;
  isMyDiary: boolean;
}

const TitleInfo: React.FC<TitleProps> = ({
  diaryInfo,
  handleIsDeleted,
  isMyDiary,
}) => {
  return (
    <Container>
      {/* 기록 제목 */}
      <TitleText>{diaryInfo.title}</TitleText>
      {/* 수정 | 삭제 */}
      {isMyDiary && (
        <UpdateDelete diaryInfo={diaryInfo} handleIsDeleted={handleIsDeleted} />
      )}
    </Container>
  );
};

export default TitleInfo;

/** style */
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleText = styled.Text`
  font-size: ${fp(25.8)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;
