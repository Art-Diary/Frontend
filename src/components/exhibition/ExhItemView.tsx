import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {getDateDay} from '~/utils/Date';
import {DEFAULT_TEXT, LIGHT_GREY} from '../common/colors';
import {FONT_NAME, ITEM_BORDER_WIDTH} from '../common/style';
import {AvgRateStarIcon} from '../common/icon';

interface ExhInfo {
  poster: string;
  exhName: string;
  gallery: string;
  exhPeriodStart: string;
  exhPeriodEnd: string;
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
    exhPeriodStart: string,
    exhPeriodEnd: string,
  ): string => {
    const start = exhPeriodStart;
    const end = exhPeriodEnd;
    const startDay = getDateDay(exhPeriodStart);
    const endDay = getDateDay(exhPeriodEnd);
    return start + ' (' + startDay + ')' + ' ~ ' + end + ' (' + endDay + ')';
  };

  return (
    <Wrapper>
      <ExhView noLine={noLine}>
        <TouchView disabled={notTouchable} onPress={onTouch}>
          <Poster
            source={{uri: `data:image/png;base64,${exhInfo.poster}`}}
            resizeMode="contain"
            alt={'이미지 읽기 실패'}
          />
          <ExhInfo haveRate={haveRate} haveChildren={children}>
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
                <AvgRateStarIcon />
                <ExhRate>{exhInfo.rate?.toFixed(1)}</ExhRate>
              </ExhRateWrapper>
            )}
          </ExhInfo>
        </TouchView>
        {children}
      </ExhView>
    </Wrapper>
  );
};
export default ExhItemView;

/** style */

interface ExhViewProps {
  noLine: boolean;
}

const Wrapper = styled.View`
  flex-direction: row;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
`;

const ExhView = styled.View<ExhViewProps>`
  justify-content: space-between;
  flex-direction: row;
  border-bottom-width: ${(props: ExhViewProps) =>
    props.noLine ? `0px` : `${ITEM_BORDER_WIDTH}px`};
  border-bottom-color: ${LIGHT_GREY};
  padding-top: ${wp(3)}px;
  padding-bottom: ${wp(3)}px;
  padding-right: ${wp(3)}px;
  width: 100%;
`;

const TouchView = styled.TouchableOpacity`
  flex-direction: row;
  gap: ${wp(2)}px;
`;

interface ExhInfoProps {
  haveRate: boolean;
  haveChildren: boolean;
}

const ExhInfo = styled.View<ExhInfoProps>`
  width: ${(props: ExhInfoProps) => (props.haveChildren ? `66%` : `100%`)};
  padding-top: ${wp(3)}px;
  padding-bottom: ${wp(3)}px;
  flex-direction: column;
  justify-content: ${(props: ExhInfoProps) =>
    props.haveRate ? `center` : `space-between`};
  gap: ${(props: ExhInfoProps) =>
    props.haveRate ? `${wp(3)}px;` : `${wp(1.5)}px;`};
`;

const ExhName = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const ExhGallery = styled.Text`
  font-size: ${rf(14.2)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const ExhDate = styled.Text`
  font-size: ${rf(12.2)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const Poster = styled.Image`
  width: ${wp(19)}px;
  height: ${wp(24)}px;
  align-items: center;
`;

const ExhRateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(0.5)}px;
`;

const ExhRate = styled.Text`
  font-size: ${rf(15)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;
