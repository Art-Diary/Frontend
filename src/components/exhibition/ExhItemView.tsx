import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {JoinDateWithDot, getDateDay} from '~/utils/Date';

interface SearchExhListProps {
  poster: string;
  exhName: string;
  gallery: string;
  exhPeriodStart: number[];
  exhPeriodEnd: number[];
  children?: ReactNode;
}

const ExhItemView: React.FC<SearchExhListProps> = ({
  poster,
  exhName,
  gallery,
  exhPeriodStart,
  exhPeriodEnd,
  children,
}) => {
  const changeExhDateFormat = (
    exhPeriodStart: number[],
    exhPeriodEnd: number[],
  ): string => {
    const start = JoinDateWithDot(exhPeriodStart);
    const end = JoinDateWithDot(exhPeriodEnd);
    const startDay = getDateDay(exhPeriodStart);
    const endDay = getDateDay(exhPeriodEnd);
    return start + ' (' + startDay + ')' + ' ~ ' + end + ' (' + endDay + ')';
  };

  return (
    <ExhView>
      <Poster
        source={{uri: `data:image/png;base64,${poster}`}}
        resizeMode="contain"
        alt={'이미지 읽기 실패'}
      />
      <ExhInfo>
        <ExhName>{exhName}</ExhName>
        <ExhGallery>{gallery}</ExhGallery>
        <ExhDate>{changeExhDateFormat(exhPeriodStart, exhPeriodEnd)}</ExhDate>
      </ExhInfo>
      {children}
    </ExhView>
  );
};
export default ExhItemView;

/** style */
const ExhView = styled.View`
  flex-direction: row;
  padding: ${wp(10)}px;
  gap: ${wp(10)}px;
  border-bottom-width: ${hp(0.5)}px;
  border-bottom-color: #d3d3d3;
`;

const ExhInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  gap: ${hp(7)}px;
`;

const ExhName = styled.Text`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const ExhGallery = styled.Text`
  font-size: ${fp(15)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const ExhDate = styled.Text`
  font-size: ${fp(13)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const Poster = styled.Image`
  width: ${wp(70)}px;
  height: ${hp(70)}px;
  align-items: center;
`;
