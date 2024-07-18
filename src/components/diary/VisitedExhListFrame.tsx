import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {BORDER_COLOR, DEFAULT_TEXT, LIGHT_GREY} from '../common/colors';
import {FONT_NAME} from '../common/style';
import {AvgRateStarIcon} from '../common/icon';
import {DEFAULT_IMAGE} from '@env';

interface ExhProps {
  exhList: any[];
  handlePressExh: (exhId: number) => void;
}

const VisitedExhListFrame: React.FC<ExhProps> = ({exhList, handlePressExh}) => {
  return (
    <FlatList
      data={exhList}
      renderItem={({item, index}) => (
        <RowView
          onPress={() => handlePressExh(item.exhId)}
          noLine={
            exhList.length - 1 === index ||
            (exhList.length / 2 === 0 && exhList.length - 2 === index)
              ? true
              : false
          }>
          <Poster
            source={{uri: `${item.poster ?? DEFAULT_IMAGE}`}}
            alt={'이미지 읽기 실패'}
            resizeMode="contain"
          />
          <Contents>
            <ExhTitle numberOfLines={2} ellipsizeMode="tail">
              {item.exhName}
            </ExhTitle>
            <AvgRate>
              <AvgRateText>{item.rate.toFixed(1)}</AvgRateText>
              <AvgRateStarIcon />
            </AvgRate>
          </Contents>
        </RowView>
      )}
      numColumns={2}
    />
  );
};

export default VisitedExhListFrame;

/** style */
interface RowViewProps {
  noLine: boolean;
}

const RowView = styled.TouchableOpacity<RowViewProps>`
  gap: ${hp(1.5)}px;
  flex-direction: column;
  align-items: center;
  width: ${wp(50)}px;
  padding-top: ${wp(5)}px;
  padding-bottom: ${wp(4)}px;
  border-color: ${BORDER_COLOR};
  border-right-width: ${wp(0.1)}px; // 테두리 너비
  border-bottom-width: ${(props: RowViewProps) =>
    props.noLine ? `0px` : `${wp(0.1)}px`};
`;

const Poster = styled.Image`
  width: ${wp(30)}px;
  height: ${wp(35)}px;
`;

const Contents = styled.View`
  flex-direction: column;
  align-items: center;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
`;

const ExhTitle = styled.Text`
  font-size: ${rf(16.3)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  text-align: center;
`;

const AvgRate = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(0.6)}px;
`;

const AvgRateText = styled.Text`
  font-size: ${rf(15)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;
