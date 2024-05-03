import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {LightStarIcon} from '~/assets/images';
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
  rate?: number;
}

interface SearchExhListProps {
  exhInfo: ExhInfo;
  children?: ReactNode;
  noLine?: boolean;
  notTouchable: boolean;
  onTouch?: (something: any) => void;
  haveRate?: boolean;
}

const ExhItemView: React.FC<SearchExhListProps> = ({
  exhInfo,
  children,
  noLine,
  notTouchable,
  onTouch,
  haveRate,
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
      <TouchView disabled={notTouchable} onPress={onTouch}>
        <Poster
          source={{uri: `data:image/png;base64,${exhInfo.poster}`}}
          resizeMode="contain"
          alt={'이미지 읽기 실패'}
        />
        <ExhInfo haveRate={haveRate}>
          <ExhName numberOfLines={1} ellipsizeMode="tail">
            {exhInfo.exhName}
          </ExhName>
          {!haveRate ? (
            <>
              <ExhGallery>{exhInfo.gallery}</ExhGallery>
              <ExhDate>
                {changeExhDateFormat(
                  exhInfo.exhPeriodStart,
                  exhInfo.exhPeriodEnd,
                )}
              </ExhDate>
            </>
          ) : (
            <ExhRateWrapper>
              <LightStarIcon />
              <ExhRate>{exhInfo.rate?.toFixed(1)}</ExhRate>
            </ExhRateWrapper>
          )}
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
  gap: ${wp(8)}px;
`;

interface ExhInfoProps {
  haveRate: boolean;
}

const ExhInfo = styled.View<ExhInfoProps>`
  width: 63%;
  padding-top: ${hp(8)}px;
  padding-bottom: ${hp(8)}px;
  flex-direction: column;
  justify-content: ${(props: ExhInfoProps) =>
    props.haveRate ? `center` : `space-between`};
  gap: ${(props: ExhInfoProps) =>
    props.haveRate ? `${hp(10)}px` : `${hp(7)}px`};
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

const ExhRateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ExhRate = styled.Text`
  font-size: ${fp(15.8)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
`;
