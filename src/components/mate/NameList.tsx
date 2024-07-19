import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {MAIN_COLOR, MIDDLE_GREY} from '../common/colors';
import {BUTTON_RADIUS, FONT_NAME} from '../common/style';

interface GatherInfo {
  gatherId: number;
  gatherName: string;
}

interface ExhMateInfo {
  userId: number;
  nickname: string;
}

interface NameListProps {
  itemList: GatherInfo[] | ExhMateInfo[];
  handleClickItem: ((item: GatherInfo) => void) | null;
}

const NameList: React.FC<NameListProps> = ({itemList, handleClickItem}) => {
  function isGatherInfo(item: GatherInfo | ExhMateInfo): item is GatherInfo {
    return (item as GatherInfo).gatherName !== undefined;
  }

  const onPressItem = (item: GatherInfo | null) => {
    if (handleClickItem !== null && item != null) {
      handleClickItem(item);
    }
  };

  return (
    <Container>
      <ScrollView
        horizontal={true}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={true}>
        {itemList &&
          itemList.map((item: GatherInfo | ExhMateInfo, index: number) => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                key={index}
                disabled={!isGatherInfo(item)}
                onPress={() => onPressItem(isGatherInfo(item) ? item : null)}>
                <Item isLast={itemList.length - 1 === index}>
                  <NameText>
                    {isGatherInfo(item) ? item.gatherName : item.nickname}
                  </NameText>
                </Item>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </Container>
  );
};

export default NameList;

/** style */
const Container = styled.View`
  flex-direction: row;
  padding-bottom: ${hp(0.8)}px;
`;

interface ItemProps {
  isLast: boolean;
}

const Item = styled.View<ItemProps>`
  border-top-left-radius: ${BUTTON_RADIUS}px;
  border-top-right-radius: ${BUTTON_RADIUS}px;
  background-color: ${MAIN_COLOR};
  padding-left: ${wp(1.4)}px;
  padding-right: ${wp(1.4)}px;
  height: ${wp(11.1)}px;
  align-items: center;
  justify-content: center;
  margin-right: ${(props: ItemProps) =>
    props.isLast ? '0px' : `${wp(1.1)}px`};
`;

interface NameProps {
  isAdd: boolean;
}

const NameText = styled.Text<NameProps>`
  font-size: ${rf(18)}px;
  color: ${(props: NameProps) => (props.isAdd ? `${MIDDLE_GREY}` : 'white')};
  font-family: ${FONT_NAME};
`;
