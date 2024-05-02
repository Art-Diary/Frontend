import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {
  heightPercentage as hp,
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';

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
  handleCreate: () => void;
  handleClickItem: ((item: GatherInfo) => void) | null;
}

const NameList: React.FC<NameListProps> = ({
  itemList,
  handleCreate,
  handleClickItem,
}) => {
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
      {/* 모임 리스트 */}
      <TouchableOpacity onPress={handleCreate}>
        <AddNewItem>
          <NameText isAdd={true}>+</NameText>
        </AddNewItem>
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={true}>
        {itemList.map((item: GatherInfo | ExhMateInfo, index: number) => {
          return (
            <TouchableOpacity
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
  padding-bottom: ${hp(5)}px;
  gap: 10px;
`;

const AddNewItem = styled.View`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-width: 1.1px;
  border-color: #979797;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
  height: ${wp(40)}px;
  align-items: center;
  justify-content: center;
`;

interface ItemProps {
  isLast: boolean;
}

const Item = styled.View<ItemProps>`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #ff6f61;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  height: ${wp(40)}px;
  align-items: center;
  justify-content: center;
  margin-right: ${(props: ItemProps) => (props.isLast ? '0px' : '10px')};
`;

interface NameProps {
  isAdd: boolean;
}

const NameText = styled.Text<NameProps>`
  font-size: ${fp(19)}px;
  color: ${(props: NameProps) => (props.isAdd ? '#979797' : 'white')};
  font-family: 'omyu pretty';
`;
