import React from 'react';
import styled from 'styled-components/native';
import {WriterIcon} from '~/assets/images/index';
import {FillStarIcon} from '~/assets/images/index';
import {EmptyStarIcon} from '~/assets/images/index';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

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
      result.push(<FillStarIcon key={`${num++}`} />);
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
        <WriterIcon width={fp(16)} />
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
  padding-top: ${hp(26.5)}px;
  padding-bottom: ${hp(26.5)}px;
`;

const NicknameView = styled.View`
  flex-direction: row;
  gap: ${wp(5.5)}px;
`;

const NicknameText = styled.Text`
  font-size: ${fp(16.3)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const RateView = styled.View`
  flex-direction: row;
  gap: ${wp(9)}px;
  align-items: center;
`;

const RateText = styled.Text`
  font-size: ${fp(15.3)}px;
  color: #979797;
  font-family: 'omyu pretty';
`;

const StarView = styled.View`
  flex-direction: row;
`;
