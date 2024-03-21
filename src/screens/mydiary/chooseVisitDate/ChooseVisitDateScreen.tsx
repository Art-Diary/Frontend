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
import InfoMessage from '~/components/common/InfoMessage';
import Loading from '~/components/common/Loading';
import DropDownPicker from 'react-native-dropdown-picker';
import VisitDates from './VisitDates';
import {useMySoloInfo} from '~/zustand/mydiary/mySoloStoredDates';

interface IPicker {
  label: string;
  value: number;
}

const ChooseVisitDateScreen = () => {
  const mySoloExhId = useMySoloInfo().exhId;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const [items, setItems] = useState<IPicker[]>([]);

  const {
    data: myStoredDateListOfExh,
    isLoading,
    isError,
    isSuccess,
  } = useFetchMyStoredDateListOfExh(mySoloExhId); // 한 전시회에 대하여 캘린더에 저장된 날짜 조회

  useEffect(() => {
    if (isSuccess) {
      // {label: '', value: ''}
      var gatherNameList: IPicker[] = [];

      gatherNameList.push({label: '개인', value: -1});
      for (let index = 0; index < myStoredDateListOfExh.length; index++) {
        if (myStoredDateListOfExh[index].gatherName !== undefined) {
          gatherNameList.push({
            label: myStoredDateListOfExh[index].gatherName,
            value: myStoredDateListOfExh[index].index,
          });
        } else {
          gatherNameList[0].value = myStoredDateListOfExh[index].index;
        }
      }
      setItems(gatherNameList);
    }
  }, [isSuccess, myStoredDateListOfExh]);

  if (isError) {
    return <InfoMessage message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <Loading message={'로딩 중 :)'} />;
  }

  return (
    <Container>
      <BackView line={false} children={null} />
      <ContentsContainer>
        {/* 모임선택 */}
        <GroupText>모임 선택</GroupText>
        <DropDownPicker
          style={pickerStyle.box}
          textStyle={pickerStyle.gatherName}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="모임을 선택해 주세요."
        />
        {/* 날짜 목록 */}
        <VisitDates
          myStoredDateListOfExh={myStoredDateListOfExh}
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
    backgroundColor: '#f6f6f6',
  },
  gatherName: {
    fontSize: 19,
    color: '#3c4045',
    fontFamily: 'omyu pretty',
  },
});
