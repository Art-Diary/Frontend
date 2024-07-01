import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {LightStarIcon} from '~/assets/images';
import {
  sizePercentage as sp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {JoinDateWithDot, getDateDay} from '~/utils/Date';
import {DEFAULT_TEXT, LIGHT_GREY} from '../common/colors';
import {FONT_NAME, ITEM_BORDER_WIDTH} from '../common/style';

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
    <Wrapper>
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
  padding-left: ${sp(14)}px;
  padding-right: ${sp(14)}px;
`;

const ExhView = styled.View<ExhViewProps>`
  justify-content: space-between;
  flex-direction: row;
  border-bottom-width: ${(props: ExhViewProps) =>
    props.noLine ? `0px` : `${ITEM_BORDER_WIDTH}px`};
  border-bottom-color: ${LIGHT_GREY};
  padding-top: ${sp(14)}px;
  padding-bottom: ${sp(14)}px;
  padding-right: ${sp(14)}px;
  width: 100%;
`;

const TouchView = styled.TouchableOpacity`
  flex-direction: row;
  gap: ${sp(13)}px;
`;

interface ExhInfoProps {
  haveRate: boolean;
}

const ExhInfo = styled.View<ExhInfoProps>`
  /* width: 85%; */
  padding-top: ${sp(14)}px;
  padding-bottom: ${sp(14)}px;
  flex-direction: column;
  justify-content: ${(props: ExhInfoProps) =>
    props.haveRate ? `center` : `space-between`};
  gap: ${(props: ExhInfoProps) =>
    props.haveRate ? `${sp(14)}px;` : `${sp(12.5)}px;`};
`;

const ExhName = styled.Text`
  font-size: ${rf(20)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const ExhGallery = styled.Text`
  font-size: ${rf(19.2)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const ExhDate = styled.Text`
  font-size: ${rf(18.6)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const Poster = styled.Image`
  width: ${sp(30)}px;
  height: ${sp(35)}px;
  align-items: center;
`;

const ExhRateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ExhRate = styled.Text`
  font-size: ${rf(19.35)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;
