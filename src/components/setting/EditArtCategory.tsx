import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME} from '../common/style';
import {BACK_COLOR, DEFAULT_TEXT, MAIN_COLOR} from '../common/colors';

interface IPicker {
  label: string;
  value: string;
}

interface EditArtProps {
  getValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const EditArtCategory: React.FC<EditArtProps> = ({getValue, setValue}) => {
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
      <SectionName>좋아하는 전시 분야</SectionName>
      <DropDownPicker
        style={pickerStyle.box}
        maxHeight={400} // 최대 높이 설정
        textStyle={pickerStyle.artName}
        open={open}
        value={getValue}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="전시 분야를 선택해 주세요."
      />
    </ContentColumn>
  );
};

export default EditArtCategory;

const ContentColumn = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${hp(1.7)}px;
`;

const SectionName = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const pickerStyle = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: MAIN_COLOR,
    backgroundColor: BACK_COLOR,
  },
  artName: {
    paddingLeft: wp(2),
    fontSize: rf(15),
    color: DEFAULT_TEXT,
    fontFamily: FONT_NAME,
  },
});
