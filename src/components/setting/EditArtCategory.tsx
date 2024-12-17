import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {AREA_FONT_SIZE, FONT_NAME} from '../common/style';
import {
  DEFAULT_TEXT,
  MAIN_COLOR,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '../common/colors';
import {Dropdown} from 'react-native-element-dropdown';

interface IPicker {
  label: string;
  value: string;
}

interface EditArtProps {
  title: string;
  getValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const EditArtCategory: React.FC<EditArtProps> = ({
  title,
  getValue,
  setValue,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<IPicker[]>([
    {label: '사진', value: '사진'},
    {label: '회화', value: '회화'},
    {label: '조각', value: '조각'},
    {label: '공예', value: '공예'},
    {label: '미디어아트', value: '미디어아트'},
    {label: '그외', value: '그외'},
  ]);

  return (
    <ContentColumn>
      <SectionWapper>
        <SectionStar>*</SectionStar>
        <SectionName>{title}</SectionName>
      </SectionWapper>
      <Dropdown
        style={pickerStyle.dropdown}
        placeholderStyle={pickerStyle.placeholderStyle}
        selectedTextStyle={pickerStyle.selectedTextStyle}
        itemTextStyle={pickerStyle.selectedTextStyle}
        containerStyle={pickerStyle.containerStyle}
        maxHeight={400}
        data={items}
        labelField="label"
        valueField="value"
        placeholder="전시 분야를 선택해 주세요."
        value={getValue}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={item => {
          setValue(item.value);
          setOpen(false);
        }}
      />
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
  color: ${DEFAULT_TEXT};
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

const pickerStyle = StyleSheet.create({
  dropdown: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    padding: wp(4),
    borderColor: TEXTINPUTFORM_COLOR,
    backgroundColor: TEXTINPUTFORM_COLOR,
  },
  containerStyle: {
    borderRadius: wp(2),
  },
  placeholderStyle: {
    fontSize: rf(15),
    color: MIDDLE_GREY,
    fontFamily: FONT_NAME,
  },
  selectedTextStyle: {
    fontSize: rf(15),
    color: DEFAULT_TEXT,
    fontFamily: FONT_NAME,
  },
});
