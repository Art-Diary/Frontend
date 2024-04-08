import React, {useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import styled from 'styled-components/native';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {AddMyExhButton} from '~/assets/images';
import {useFetchCalendar} from '~/api/queries/calendar';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorMessageView from '~/components/common/ErrorMessageView';

interface CalendarProps {
  changeMonth: string;
  selectedDate: string;
  setDatas: (datas: any[]) => void;
  gatherId: number;
}

const ExhListOfDate: React.FC<CalendarProps> = ({
  changeMonth,
  selectedDate,
  setDatas,
  gatherId,
}) => {
  const {
    data: calendarData,
    isLoading,
    isError,
    isSuccess,
  } = useFetchCalendar(
    gatherId === -1 ? 'alone' : gatherId === -2 ? 'all' : 'gather',
    gatherId > -1 ? gatherId : null,
    Number(changeMonth.split('.')[0]),
    Number(changeMonth.split('.')[1]),
  );

  useEffect(() => {
    if (isSuccess) {
      setDatas(calendarData);
    }
  }, [isSuccess, calendarData, setDatas]);

  if (isError) {
    return <ErrorMessageView message="일정 조회 실패:(" />;
  }

  if (isLoading) {
    return <LoadingModal message="일정 조회 중:)" />;
  }

  return (
    <>
      {/* 선택 날짜 */}
      <SelectedDateWrapper>
        <SelectedDateView>
          <SelectedDateText>
            {selectedDate.split('.')[1]}월 {selectedDate.split('.')[2]}일
          </SelectedDateText>
          <AddMyExhButton />
        </SelectedDateView>
      </SelectedDateWrapper>
      {/* 전시회 리스트 */}
      <FlatList
        data={
          calendarData !== undefined &&
          calendarData[Number(selectedDate.split('.')[2]) - 1]
            .scheduleInfoList !== undefined
            ? calendarData[Number(selectedDate.split('.')[2]) - 1]
                .scheduleInfoList
            : []
        }
        renderItem={({item, index}) => (
          <ExhWrapper>
            <ExhItemView
              poster={item.poster}
              exhName={item.exhName}
              gallery={item.gallery}
              exhPeriodStart={item.exhPeriodStart}
              exhPeriodEnd={item.exhPeriodEnd}
              noLine={
                index ===
                calendarData[Number(selectedDate.split('.')[2]) - 1]
                  .scheduleInfoList.length -
                  1
                  ? true
                  : false
              }>
              <Text>aa</Text>
            </ExhItemView>
          </ExhWrapper>
        )}
      />
    </>
  );
};

export default ExhListOfDate;

/** style */
const SelectedDateWrapper = styled.View`
  width: 100%;
  padding-top: ${hp(10)}px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
`;

const SelectedDateView = styled.View`
  width: 100%;
  flex-direction: row;
  border-bottom-color: #d3d3d3;
  border-bottom-width: ${hp(0.5)}px;
  padding-bottom: ${hp(2)}px;
  justify-content: space-between;
  align-items: center;
`;

const SelectedDateText = styled.Text`
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const ExhWrapper = styled.View`
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
`;
