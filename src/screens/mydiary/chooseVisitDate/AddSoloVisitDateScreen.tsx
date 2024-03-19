import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import CustomCalendar from '~/components/common/CustomCalendar';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

const AddSoloVisitDateScreen = () => {
  // 날짜 필요
  //   const posts = [
  //     {
  //       id: 1,
  //       title: '제목입니다.',
  //       contents: '내용입니다.',
  //       date: '2024-03-19',
  //     },
  //     {
  //       id: 2,
  //       title: '제목입니다.',
  //       contents: '내용입니다.',
  //       date: '2024-03-05',
  //     },
  //   ];
  //   const markedDates = posts.reduce((acc: any, current) => {
  //     const date = new Date(current.date);
  //     const year = date.getFullYear();
  //     const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //     const day = ('0' + date.getDate()).slice(-2);
  //     const dateStr = `${year}-${month}-${day}`;

  //     const formattedDate = dateStr;
  //     acc[formattedDate] = {marked: true};
  //     return acc;
  //   }, {});

  //   const [selectedDate, setSelectedDate] = useState(
  //     `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(
  //       -2,
  //     )}-${('0' + new Date().getDate()).slice(-2)}`,
  //   );
  //   const markedSelectedDates = {
  //     ...markedDates,
  //     [selectedDate]: {
  //       selected: true,
  //       marked: markedDates[selectedDate]?.marked,
  //     },
  //   };
  // 내 기록의 전시회 방문 날짜 추가

  return (
    <Container>
      <BackView children={null} />
      <ContentsContainer>
        {/* 방문 날짜 선택 */}
        <GroupText>방문 날짜 선택</GroupText>
        <CustomCalendar />
        <BodyView>
          <BodyText>추가할 날짜</BodyText>
          {/* <BodyText>{checkDate.replace(/-/g, '.')}</BodyText> */}
        </BodyView>
        <BodyView>
          <BodyText>방문 날짜가 기억 안 날 땐?</BodyText>
          <ForgetText>기억 안 남</ForgetText>
        </BodyView>
        <TouchableOpacity>
          {/* onPress={onPressNextButton} */}
          <NextButton>전시회 선택 완료</NextButton>
        </TouchableOpacity>
      </ContentsContainer>
    </Container>
  );
};

export default AddSoloVisitDateScreen;

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

const BodyView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
`;

const BodyText = styled.Text`
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
`;

const ForgetText = styled.Text`
  font-size: ${fp(17)}px;
  color: #ff6f61;
  font-family: 'omyu pretty';
  border-bottom-width: 1px;
  border-bottom-color: #ff6f61;
`;

const NextButton = styled.Text`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: #ff6f61;
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;
