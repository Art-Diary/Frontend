import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {LightStarIcon} from '~/assets/images/index';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

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
            source={{uri: `data:image/png;base64,${item.poster}`}}
            alt={'이미지 읽기 실패'}
            resizeMode="contain"
          />
          <Contents>
            <ExhTitle numberOfLines={2} ellipsizeMode="tail">
              {item.exhName}
            </ExhTitle>
            <AvgRate>
              <AvgRateText>{item.rate.toFixed(1)}</AvgRateText>
              <LightStarIcon />
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
  gap: ${hp(6.5)}px;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding-top: ${hp(15)}px;
  padding-bottom: ${hp(10)}px;
  border-color: #d3d3d3;
  border-right-width: ${hp(0.3)}px; // 테두리 너비
  border-bottom-width: ${(props: RowViewProps) =>
    props.noLine ? `0px` : `${hp(0.3)}px`};
`;

const Poster = styled.Image`
  width: ${wp(115)}px;
  height: ${hp(129.23)}px;
`;

const Contents = styled.View`
  flex-direction: column;
  align-items: center;
  padding-left: ${wp(22)}px;
  padding-right: ${wp(22)}px;
`;

const ExhTitle = styled.Text`
  font-size: ${fp(17.2)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  text-align: center;
`;

const AvgRate = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvgRateText = styled.Text`
  font-size: ${fp(15.8)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
`;
