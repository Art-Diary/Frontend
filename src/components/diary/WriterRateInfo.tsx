import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME} from '../common/style';
import {DEFAULT_TEXT, MIDDLE_GREY} from '../common/colors';
import {EmptyStarIcon, FullStarIcon, WriterIcon} from '../common/icon';

interface WriterRateProps {
  nickname: string;
  rate: string;
}

const WriterRateInfo: React.FC<WriterRateProps> = ({nickname, rate}) => {
  const renderingRate = (rate: string) => {
    const result = [];
    const rateInt = parseInt(rate);
    let num = 0;
    for (let i = 0; i < rateInt; i++) {
      result.push(<FullStarIcon key={`${num++}`} />);
    }
    for (let i = 0; i < 5 - rateInt; i++) {
      result.push(<EmptyStarIcon key={`${num++}`} />);
    }
    return result;
  };

  return (
    <Container>
      {/* 닉네임 */}
      <NicknameView>
        <WriterIcon />
        <NicknameText>{nickname}</NicknameText>
      </NicknameView>
      {/* 별점 */}
      <RateView>
        <RateText>별점</RateText>
        <StarView>{renderingRate(rate)}</StarView>
      </RateView>
    </Container>
  );
};

export default WriterRateInfo;

/** style */
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: ${hp(4.5)}px;
  padding-bottom: ${hp(4.5)}px;
`;

const NicknameView = styled.View`
  flex-direction: row;
  align-items: flex-end;
  gap: ${wp(1.5)}px;
`;

const NicknameText = styled.Text`
  font-size: ${rf(15.5)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const RateView = styled.View`
  flex-direction: row;
  gap: ${wp(2.5)}px;
  align-items: center;
`;

const RateText = styled.Text`
  font-size: ${rf(14.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const StarView = styled.View`
  flex-direction: row;
  align-items: center;
`;
