import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {JoinDateWithDot} from '~/utils/Date';
import {PrivateToggleIcon, PublicToggleIcon} from '../common/icon';
import {FONT_NAME, ITEM_BORDER_WIDTH} from '../common/style';
import {DEFAULT_TEXT, LIGHT_GREY, MIDDLE_GREY} from '../common/colors';

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
        <VisitText>
          {visitDate === undefined ? '기억 안 남' : JoinDateWithDot(visitDate)}
        </VisitText>
      </ContentView>
      <LineView />
      {/* 공개여부 */}
      <ContentView>
        <CategoryText>비공개/공개</CategoryText>
        {diaryPrivate === false ? <PrivateToggleIcon /> : <PublicToggleIcon />}
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
  height: ${hp(14)}px;
  padding-bottom: ${hp(4.6)}px;
`;

const ContentView = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: ${wp(3)}px;
`;

const LineView = styled.View`
  width: ${ITEM_BORDER_WIDTH}px;
  height: ${hp(10)}px;
  background-color: ${LIGHT_GREY};
`;

const CategoryText = styled.Text`
  font-size: ${rf(15)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const WithText = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const VisitText = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;
