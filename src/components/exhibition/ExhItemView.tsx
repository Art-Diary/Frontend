import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {getDateDay} from '~/utils/date';
import {DARK_GREY, LIGHT_GREY, MIDDLE_GREY} from '../common/colors';
import {FONT_NAME, ITEM_BORDER_WIDTH} from '../common/style';
import {AvgRateStarIcon} from '../common/icon';
import {DEFAULT_IMAGE} from '@env';
import {ExhInfoForList} from '~/types';

interface SearchExhListProps {
  exhInfo: ExhInfoForList;
  children?: ReactNode;
  noLine?: boolean;
  notTouchable: boolean;
  onTouch?: (something: any) => void;
  inGathering?: boolean;
  gatherName?: string;
  gatherColor?: string;
}

const ExhItemView: React.FC<SearchExhListProps> = ({
  exhInfo,
  children,
  noLine,
  notTouchable,
  onTouch,
  inGathering,
  gatherName,
  gatherColor,
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
        <TouchView
          disabled={notTouchable}
          activeOpacity={0.6}
          onPress={onTouch}>
          <PosterWapper>
            <Poster
              source={{uri: `${exhInfo.poster ?? DEFAULT_IMAGE}`}}
              alt={'이미지 읽기 실패'}
            />
          </PosterWapper>
          <ExhInfo inGathering={inGathering} haveChildren={children}>
            <ExhName numberOfLines={1} ellipsizeMode="tail">
              {exhInfo.exhName}
            </ExhName>
            {!inGathering ? (
              <>
                <ExhGallery>{exhInfo.gallery}</ExhGallery>
                <ExhDate>
                  {changeExhDateFormat(
                    exhInfo.exhPeriodStart,
                    exhInfo.exhPeriodEnd,
                  )}
                </ExhDate>
                {gatherName && (
                  <GatherName color={gatherColor}>with {gatherName}</GatherName>
                )}
              </>
            ) : (
              <>
                <VisitDate>최근 방문 날짜: {exhInfo.visitDate}</VisitDate>
                <ExhRateWrapper>
                  <AvgRateStarIcon />
                  <ExhRate>{exhInfo.rate?.toFixed(2)}</ExhRate>
                </ExhRateWrapper>
              </>
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
  margin-bottom: ${(props: ExhViewProps) =>
    props.noLine ? `${hp(3)}px` : `0px`};
`;

const TouchView = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  gap: ${wp(2.5)}px;
`;

interface ExhInfoProps {
  inGathering: boolean;
  haveChildren: boolean;
}

const ExhInfo = styled.View<ExhInfoProps>`
  flex: 1;
  width: 100%;
  padding-top: ${wp(2.5)}px;
  padding-bottom: ${wp(3)}px;
  flex-direction: column;
  justify-content: ${(props: ExhInfoProps) =>
    props.inGathering ? `center` : `space-between`};
  gap: ${(props: ExhInfoProps) =>
    props.inGathering ? `${hp(1)}px;` : `${wp(1.5)}px;`};
`;

const ExhName = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

const VisitDate = styled.Text`
  font-size: ${rf(14.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

interface GatherNameProps {
  color: string;
}

const GatherName = styled.Text<GatherNameProps>`
  font-size: ${rf(12.2)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  color: ${(props: GatherNameProps) =>
    props.color ? `${props.color}` : `${DARK_GREY}`};
`;

const ExhGallery = styled.Text`
  font-size: ${rf(14.2)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const ExhDate = styled.Text`
  font-size: ${rf(12.2)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const PosterWapper = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const Poster = styled.Image`
  width: ${wp(19)}px;
  height: ${wp(24)}px;
`;

const ExhRateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(0.5)}px;
`;

const ExhRate = styled.Text`
  font-size: ${rf(14.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
