import React from 'react';
import styled from 'styled-components/native';
import {PrivateToggle} from '~/assets/images/index';
import {PublicToggle} from '~/assets/images/index';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {JoinDateWithDot} from '~/utils/Date';

interface OtherProps {
  userExhId: number | null;
  gatherName: string | null;
  visitDate: number[];
  diaryPrivate: boolean;
}

const OtherInfo: React.FC<OtherProps> = ({
  userExhId,
  gatherName,
  visitDate,
  diaryPrivate,
}) => {
  return (
    <Container>
      {/* 누구와 */}
      <ContentView>
        <CategoryText>with</CategoryText>
        <WithText>{userExhId === undefined ? gatherName : '나'}</WithText>
      </ContentView>
      <LineView />
      {/* 관람 날짜 */}
      <ContentView>
        <CategoryText>관람 날짜</CategoryText>
        <VisitText>{JoinDateWithDot(visitDate)}</VisitText>
      </ContentView>
      <LineView />
      {/* 공개여부 */}
      <ContentView>
        <CategoryText>비공개/공개</CategoryText>
        {diaryPrivate === false ? <PrivateToggle /> : <PublicToggle />}
      </ContentView>
    </Container>
  );
};

export default OtherInfo;

/** style */
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  padding-bottom: ${hp(26.5)}px;
`;

const ContentView = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: ${wp(13)}px;
`;

const LineView = styled.View`
  width: ${wp(0.55)}px;
  height: 100%;
  background-color: #d3d3d3;
`;

const CategoryText = styled.Text`
  font-size: ${fp(15.8)}px;
  color: #979797;
  font-family: 'omyu pretty';
`;

const WithText = styled.Text`
  font-size: ${fp(19.5)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const VisitText = styled.Text`
  font-size: ${fp(19)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;
