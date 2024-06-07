import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {useFetchMyStoredDateListOfExh} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import DropDownPicker from 'react-native-dropdown-picker';
import ChooseVisitDateList from './ChooseVisitDateList';
import {useWriteMyDiaryInfo} from '~/zustand/mydiary/writeMyDiary';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useIsFocused} from '@react-navigation/native';

interface IPicker {
  label: string;
  value: number;
}

const ChooseVisitDateScreen = () => {
  const isFocused = useIsFocused();
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const [items, setItems] = useState<IPicker[]>([]);
  const writeMyDiaryInfo = useWriteMyDiaryInfo();
  const canNotOpen =
    writeMyDiaryInfo.isUpdate || writeMyDiaryInfo.isInGathering;

  // 모임과 개인 전시회 날짜
  const {
    data: storedDateListOfExh,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchMyStoredDateListOfExh(visitedExhId); // 한 전시회에 대하여 캘린더에 저장된 날짜 조회

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  // 내 기록 탭에서 추가할 경우 (모임 선택 가능)
  const handleSetItemsMyDiary = (gatherNameList: IPicker[]): IPicker[] => {
    gatherNameList.push({label: '개인', value: -1});
    for (let index = 0; index < storedDateListOfExh.length; index++) {
      if (storedDateListOfExh[index].gatherName !== undefined) {
        gatherNameList.push({
          label: storedDateListOfExh[index].gatherName,
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
    for (let index = 0; index < storedDateListOfExh.length; index++) {
      var dateInfoList = storedDateListOfExh[index].dateInfoList;

      for (let dIndex = 0; dIndex < dateInfoList.length; dIndex++) {
        if (
          writeMyDiaryInfo.gatherExhId === dateInfoList[dIndex].gatherExhId ||
          writeMyDiaryInfo.userExhId === dateInfoList[dIndex].userExhId
        ) {
          setValue(index);
          gatherNameList.push({
            label: storedDateListOfExh[index].gatherName ?? '개인',
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
    for (let index = 0; index < storedDateListOfExh.length; index++) {
      var gatherId = storedDateListOfExh[index].gatherId;

      if (gatherId === writeMyDiaryInfo.gatherId) {
        setValue(index);
        gatherNameList.push({
          label: storedDateListOfExh[index].gatherName,
          value: storedDateListOfExh[index].index,
        });
      }
    }
    return gatherNameList;
  };

  useEffect(() => {
    if (isSuccess) {
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
  }, [isSuccess, storedDateListOfExh]);

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'방문 날짜 조회 중 :)'} />;
  }

  return (
    <Container>
      <BackView line={false} children={null} />
      <ContentsContainer>
        {/* 모임선택 */}
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
  background-color: #f6f6f6;
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
`;

const GroupText = styled.Text`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
`;

const pickerStyle = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff6f61',
  },
  gatherName: {
    fontSize: 19,
    color: '#3c4045',
    fontFamily: 'omyu pretty',
  },
});
