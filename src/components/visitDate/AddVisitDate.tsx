import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import CustomCalendar from '~/components/common/CustomCalendar';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface AddVisitDateProps {
  markedDates: string[];
  selectedDate: string;
  onSelectedDate: (selectedDate: string) => void;
  onClickNextButton: () => void;
}

const AddVisitDate: React.FC<AddVisitDateProps> = ({
  markedDates,
  selectedDate,
  onSelectedDate,
  onClickNextButton,
}) => {
  const alreadyMarkedDate = () => {
    for (var marked = 0; marked < markedDates.length; marked++) {
      if (markedDates[marked] === selectedDate) {
        return true;
      }
    }
    return false;
  };

  return (
    <ContentsContainer>
      {/* 방문 날짜 선택 */}
      <GroupText>방문 날짜 선택</GroupText>
      {/* 커스텀 캘린더 */}
      <CustomCalendar
        onSelectedDate={onSelectedDate}
        markedDates={markedDates}
      />
      {/* 선택한 날짜 표시 */}
      <View style={{flex: 1}}>
        <BodyView>
          <BodyText>추가할 날짜</BodyText>
          <BodyText>{selectedDate}</BodyText>
        </BodyView>
        {/* <BodyView>
            <BodyText>방문 날짜가 기억 안 날 땐?</BodyText>

            <TouchableOpacity onPress={}>
              <ForgetText>기억 안 남</ForgetText>
            </TouchableOpacity>
          </BodyView> */}
      </View>
      {/* 하단 버튼 */}
      {alreadyMarkedDate() ? (
        <NextButton isAlready={true}>이미 저장된 방문 날짜입니다</NextButton>
      ) : (
        <TouchableOpacity onPress={onClickNextButton}>
          {/* onPress={onPressNextButton} */}
          <NextButton isAlready={false}>날짜 선택 완료</NextButton>
        </TouchableOpacity>
      )}
    </ContentsContainer>
  );
};

export default AddVisitDate;

/** style */
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

interface NextButtonProps {
  isAlready: boolean;
}
const NextButton = styled.Text<NextButtonProps>`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.isAlready ? '#D3D3D3' : '#ff6f61'};
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;
