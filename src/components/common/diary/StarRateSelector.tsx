import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  AREA_FONT_SIZE,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {BACK_COLOR, DEFAULT_TEXT, MAIN_COLOR} from '~/components/common/colors';
import CustomTouchable from '../CustomTouchable';
import {EmptyStarIcon, FullStarIcon} from '../icon';

interface StarRateSelectorProps {
  starNum: number;
  handleStarNum: (num: number) => void;
}

const StarRateSelector: React.FC<StarRateSelectorProps> = ({
  starNum,
  handleStarNum,
}) => {
  const changeStarNum = (num: number) => {
    handleStarNum(num);
    //   updateRate(num);
  };
  return (
    <Container>
      {/* section 제목 */}
      <SectionWapper>
        <SectionStar>*</SectionStar>
        <SectionName>별점</SectionName>
      </SectionWapper>
      {/* section 내용 */}
      <StarList>
        <CustomTouchable onPress={() => changeStarNum(1)}>
          {starNum >= 1 ? <FullStarIcon /> : <EmptyStarIcon />}
        </CustomTouchable>
        <CustomTouchable onPress={() => changeStarNum(2)}>
          {starNum >= 2 ? <FullStarIcon /> : <EmptyStarIcon />}
        </CustomTouchable>
        <CustomTouchable onPress={() => changeStarNum(3)}>
          {starNum >= 3 ? <FullStarIcon /> : <EmptyStarIcon />}
        </CustomTouchable>
        <CustomTouchable onPress={() => changeStarNum(4)}>
          {starNum >= 4 ? <FullStarIcon /> : <EmptyStarIcon />}
        </CustomTouchable>
        <CustomTouchable onPress={() => changeStarNum(5)}>
          {starNum >= 5 ? <FullStarIcon /> : <EmptyStarIcon />}
        </CustomTouchable>
      </StarList>
    </Container>
  );
};

export default StarRateSelector;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  background-color: ${BACK_COLOR};
  justify-content: space-between;
  /* gap: ${wp(1.3)}px; */
`;

const SectionWapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${wp(1)}px;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const SectionStar = styled.Text`
  font-size: ${rf(16)}px;
  font-family: ${FONT_NAME};
  color: ${MAIN_COLOR};
  text-align: center;
`;

const StarList = styled.View`
  flex-direction: row;
  background-color: #f6f0f0;
  border-radius: ${BUTTON_RADIUS}px;
  align-items: center;
  padding: ${wp(2.9)}px;
  gap: ${wp(0.8)}px;
`;
