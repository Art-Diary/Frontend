import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import DropDownPicker from 'react-native-dropdown-picker';
import ChooseVisitDateList from './ChooseVisitDateList';
import {useWriteMyDiaryInfo} from '~/zustand/mydiary/writeMyDiary';
import FetchMyStoredDateListOfExh from './FetchMyStoredDateListOfExh';
import {BACK_COLOR, DEFAULT_TEXT, MAIN_COLOR} from '~/components/common/colors';
import {AREA_FONT_SIZE, FONT_NAME} from '~/components/common/style';
import {MyVisitedDateType} from '~/utils/dataTypes';

interface IPicker {
  label: string;
  value: number;
}

const ChooseVisitDateScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const [items, setItems] = useState<IPicker[]>([]);
  const writeMyDiaryInfo = useWriteMyDiaryInfo();
  const canNotOpen =
    writeMyDiaryInfo.isUpdate || writeMyDiaryInfo.isInGathering;
  const [storedDateListOfExh, setStoredDateListOfExh] = useState<
    MyVisitedDateType[]
  >([]);

  // 내 기록 탭에서 추가할 경우 (모임 선택 가능)
  const handleSetItemsMyDiary = (gatherNameList: IPicker[]): IPicker[] => {
    if (!storedDateListOfExh) {
      return [];
    }
    gatherNameList.push({label: '개인', value: 0});
    for (let index = 0; index < storedDateListOfExh.length; index++) {
      if (storedDateListOfExh[index].gatherName) {
        gatherNameList.push({
          label: storedDateListOfExh[index].gatherName ?? '--',
          value: storedDateListOfExh[index].index,
        });
      } else {
        gatherNameList[0].value = storedDateListOfExh[index].index;
      }
    }
    return gatherNameList;
  };

  // 기록 수정할 경우 (고정)
  const handleSetItemsWithUpdate = (gatherNameList: IPicker[]): IPicker[] => {
    if (!storedDateListOfExh) {
      return [];
    }
    gatherNameList.push({label: '개인', value: -1});
    for (let index = 0; index < storedDateListOfExh.length; index++) {
      var dateInfoList = storedDateListOfExh[index].dateInfoList;

      for (let dIndex = 0; dIndex < dateInfoList.length; dIndex++) {
        if (writeMyDiaryInfo.exhVisitId === dateInfoList[dIndex].exhVisitId) {
          const labelName = storedDateListOfExh[index].gatherName
            ? storedDateListOfExh[index].gatherName
            : '개인';
          setValue(index);
          gatherNameList.push({
            label: labelName ?? '--',
            value: storedDateListOfExh[index].index,
          });
        }
      }
    }
    return gatherNameList;
  };

  // 모임 내에서 기록 추가할 경우 (고정)
  const handleSetItemsWithInGathering = (
    gatherNameList: IPicker[],
  ): IPicker[] => {
    if (!storedDateListOfExh) {
      return [];
    }
    for (let index = 0; index < storedDateListOfExh.length; index++) {
      var gatherId = storedDateListOfExh[index].gatherId;

      if (gatherId === writeMyDiaryInfo.gatherId) {
        setValue(index);
        gatherNameList.push({
          label: storedDateListOfExh[index].gatherName ?? '--',
          value: storedDateListOfExh[index].index,
        });
      }
    }
    return gatherNameList;
  };

  useEffect(() => {
    if (storedDateListOfExh) {
      // {label: '', value: ''}
      var gatherNameList: IPicker[] = [];

      if (writeMyDiaryInfo.isUpdate) {
        // 기록 수정할 경우
        gatherNameList = handleSetItemsWithUpdate(gatherNameList);
      } else if (writeMyDiaryInfo.isInGathering) {
        // 모임 내에서 기록 추가할 경우
        gatherNameList = handleSetItemsWithInGathering(gatherNameList);
      } else {
        // 내 기록 탭에서 추가할 경우 (모임 선택 가능)
        gatherNameList = handleSetItemsMyDiary(gatherNameList);
      }
      setItems(gatherNameList);
    }
  }, [storedDateListOfExh]);

  return (
    <Container>
      <BackView line={false} children={null} />
      <FetchMyStoredDateListOfExh
        handleStoredDateList={setStoredDateListOfExh}
      />
      <ContentsContainer>
        {/* 모임선택 */}
        <SelectGroup>
          <GroupText>모임 선택</GroupText>
          <DropDownPicker
            style={{
              ...pickerStyle.box,
              backgroundColor: canNotOpen ? '#D3D3D3' : '#f6f6f6',
            }}
            textStyle={pickerStyle.gatherName}
            open={canNotOpen ? false : open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="모임을 선택해 주세요."
          />
        </SelectGroup>
        {/* 날짜 목록 */}
        <ChooseVisitDateList
          myStoredDateListOfExh={storedDateListOfExh}
          value={value}
        />
      </ContentsContainer>
    </Container>
  );
};

export default ChooseVisitDateScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-bottom: ${hp(1)}px;
  padding-left: ${wp(4)}px;
  padding-right: ${wp(4)}px;
  gap: ${hp(3)}px;
`;

const SelectGroup = styled.View`
  gap: ${hp(1.5)}px;
`;

const GroupText = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const pickerStyle = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: wp(8),
    borderRadius: wp(1),
    borderWidth: wp(0.25),
    borderColor: MAIN_COLOR,
  },
  gatherName: {
    fontSize: rf(14.5),
    color: DEFAULT_TEXT,
    fontFamily: FONT_NAME,
  },
});
