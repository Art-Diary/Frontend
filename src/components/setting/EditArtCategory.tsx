import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {AREA_FONT_SIZE, FONT_NAME} from '../common/style';
import {BACK_COLOR, DARK_GREY, MAIN_COLOR} from '../common/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface Category {
  id: number;
  name: string;
  isClicked: boolean;
}

interface EditArtProps {
  title: string;
  getValue: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const EditArtCategory: React.FC<EditArtProps> = ({
  title,
  getValue,
  setValue,
}) => {
  const [items, setItems] = useState<Category[]>([
    {id: 1, name: '회화', isClicked: false},
    {id: 2, name: '조각', isClicked: false},
    {id: 3, name: '사진', isClicked: false},
    {id: 4, name: '판화', isClicked: false},
    {id: 5, name: '일러스트레이션', isClicked: false},
    {id: 6, name: '미디어아트', isClicked: false},
    {id: 7, name: '공예', isClicked: false},
    {id: 8, name: '설치미술', isClicked: false},
    {id: 9, name: '그외', isClicked: false},
  ]);

  useEffect(() => {
    if (getValue) {
      const selectedCategories = getValue.split(',');
      setItems(prevItems =>
        prevItems.map(item => ({
          ...item,
          isClicked: selectedCategories.includes(item.name),
        })),
      );
    }
  }, [getValue]);

  useEffect(() => {
    const categories = items
      .filter(item => item.isClicked)
      .map(item => item.name)
      .join(',');
    console.log(categories);
    setValue(categories);
  }, [items]);

  return (
    <ContentColumn>
      <SectionWapper>
        <SectionStar>*</SectionStar>
        <SectionName>{title}</SectionName>
      </SectionWapper>
      {items.map((item: Category, index: number) => {
        return (
          <BouncyCheckbox
            key={index}
            size={17}
            isChecked={item.isClicked}
            fillColor={MAIN_COLOR}
            unFillColor={BACK_COLOR}
            text={item.name}
            style={{paddingLeft: wp(2)}}
            iconStyle={{borderColor: 'red'}}
            innerIconStyle={{borderWidth: 2}}
            textStyle={{
              fontFamily: FONT_NAME,
              fontSize: rf(15),
              textDecorationLine: 'none',
            }}
            onPress={(isChecked: boolean) => {
              setItems(prevItems =>
                prevItems.map(i =>
                  i.id === item.id ? {...i, isClicked: isChecked} : i,
                ),
              );
            }}
          />
        );
      })}
    </ContentColumn>
  );
};

export default EditArtCategory;

const ContentColumn = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${hp(1.3)}px;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const SectionWapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(1)}px;
`;

const SectionStar = styled.Text`
  font-size: ${rf(16)}px;
  font-family: ${FONT_NAME};
  color: ${MAIN_COLOR};
  text-align: center;
`;
