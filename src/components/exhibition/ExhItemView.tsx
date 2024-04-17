import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {JoinDateWithDot, getDateDay} from '~/utils/Date';

interface ExhInfo {
  poster: string;
  exhName: string;
  gallery: string;
  exhPeriodStart: number[];
  exhPeriodEnd: number[];
}

interface SearchExhListProps {
  exhInfo: ExhInfo;
  children?: ReactNode;
  noLine?: boolean;
  notTouchable: boolean;
  onTouch?: (something: any) => void;
}

const ExhItemView: React.FC<SearchExhListProps> = ({
  exhInfo,
  children,
  noLine,
  notTouchable,
  onTouch,
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
    <ExhView noLine={noLine}>
      <TouchView disabled={notTouchable} activeOpacity={1.0} onPress={onTouch}>
        <Poster
          source={{uri: `data:image/png;base64,${exhInfo.poster}`}}
          resizeMode="contain"
          alt={'이미지 읽기 실패'}
        />
        <ExhInfo>
          <ExhName numberOfLines={1} ellipsizeMode="tail">
            {exhInfo.exhName}
          </ExhName>
          <ExhGallery>{exhInfo.gallery}</ExhGallery>
          <ExhDate>
            {changeExhDateFormat(exhInfo.exhPeriodStart, exhInfo.exhPeriodEnd)}
          </ExhDate>
        </ExhInfo>
      </TouchView>
      {children}
    </ExhView>
  );
};
export default ExhItemView;

/** style */

interface ExhViewProps {
  noLine: boolean;
}

const ExhView = styled.View<ExhViewProps>`
  flex-direction: row;
  border-bottom-width: ${(props: ExhViewProps) =>
    props.noLine ? `0px` : `${hp(0.5)}px`};
  border-bottom-color: #d3d3d3;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
  padding-top: ${hp(10)}px;
  padding-bottom: ${hp(10)}px;
  width: 100%;
`;

const TouchView = styled.TouchableOpacity`
  flex-direction: row;
  gap: ${wp(5)}px;
`;

const ExhInfo = styled.View`
  width: 63%;
  padding-top: ${hp(8)}px;
  padding-bottom: ${hp(8)}px;
  flex-direction: column;
  justify-content: space-between;
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
