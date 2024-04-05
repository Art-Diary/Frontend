import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';

interface IPicker {
  label: string;
  value: string;
}

interface EditArtProps {
  getValue: string;
  setValue: (value: string) => void;
}

const EditArtCategory: React.FC<EditArtProps> = ({getValue, setValue}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<IPicker[]>([
    {label: '사진', value: '사진'},
    {label: '회화', value: '회화'},
    {label: '조각', value: '조각'},
    {label: '공예', value: '공예'},
    {label: '미디어아트', value: '미디어아트'},
    {label: '그외', value: '그외'}, // 안 보임.
  ]);

  return (
    <ContentColumn>
      <SectionName>좋아하는 전시 분야</SectionName>
      <DropDownPicker
        style={pickerStyle.box}
        textStyle={pickerStyle.gatherName}
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
  gap: ${hp(10)}px;
`;

const SectionName = styled.Text`
  font-size: ${fp(19)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const pickerStyle = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff6f61',
    backgroundColor: '#f6f6f6',
  },
  gatherName: {
    fontSize: 19,
    color: '#3c4045',
    fontFamily: 'omyu pretty',
  },
});
