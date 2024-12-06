import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useExhFromCalendarActions} from '~/zustand/calendar/exhFromCalendar';
import {changeDotToHyphen} from '~/utils/date';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {useAddScheduleActions} from '~/zustand/calendar/addSchedule';
import {AddMyExhButtonIcon} from '~/components/common/icon';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {AREA_FONT_SIZE, DASH_WIDTH, FONT_NAME} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';
import {GatheringColorInfo} from '~/types';
import {findGatherColor} from './calendarColor';

interface CalendarProps {
  selectedDate: string;
  gatherColorList: GatheringColorInfo[];
  exhListOfDay: any[];
}

const ExhListOfDayInCalendar: React.FC<CalendarProps> = ({
  selectedDate,
  gatherColorList,
  exhListOfDay,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const {updateExhFromCalendar} = useExhFromCalendarActions();
  const {updateAddDate} = useAddScheduleActions();

  const onPressExhItem = (exhItem: any) => {
    /* 선택한 날짜의 기록들 */
    updateVisitedExhId(exhItem.exhId);
    updateExhFromCalendar(
      exhItem.visitDate ? false : true,
      exhItem.visitDate ? changeDotToHyphen(exhItem.visitDate) : null,
      exhItem.gatherId ?? null,
      exhItem.exhVisitId ?? null,
    );
    navigation.navigate('CalendarDiaryRoutes', {
      screen: 'CalendarDiaryList',
      params: {pageNum: 0},
    });
  };

  const onPressAddMyExh = () => {
    updateAddDate(selectedDate);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
          state: {
            routes: [
              {
                name: 'Exhibition',
                params: undefined,
              },
            ],
          },
        },
      ],
    });
  };

  return (
    <>
      {/* 선택 날짜 */}
      <SelectedDateView>
        <SelectedDateText>
          {selectedDate.split('.')[1]}월 {selectedDate.split('.')[2]}일
        </SelectedDateText>
        <CustomTouchable
          onPress={onPressAddMyExh}
          style={{
            paddingHorizontal: wp(3),
            paddingVertical: wp(0.1),
          }}>
          <AddMyExhButtonIcon />
        </CustomTouchable>
      </SelectedDateView>
      {/* 전시회 리스트 */}
      <FlatList
        data={
          exhListOfDay !== undefined &&
          exhListOfDay[Number(selectedDate.split('.')[2]) - 1]
            .scheduleInfoList !== undefined
            ? exhListOfDay[Number(selectedDate.split('.')[2]) - 1]
                .scheduleInfoList
            : []
        }
        renderItem={({item, index}) => (
          <CustomTouchable onPress={() => onPressExhItem(item)}>
            <ExhItemView
              exhInfo={{...item}}
              noLine={
                index ===
                exhListOfDay[Number(selectedDate.split('.')[2]) - 1]
                  .scheduleInfoList.length -
                  1
                  ? true
                  : false
              }
              notTouchable={true}
              gatherName={item.gatherName ?? '혼자'}
              gatherColor={findGatherColor(gatherColorList, item.gatherId)}
            />
          </CustomTouchable>
        )}
        ListEmptyComponent={
          <SelectMsgView>
            <SelectMsgText>일정이 없습니다.</SelectMsgText>
          </SelectMsgView>
        }
      />
    </>
  );
};

export default ExhListOfDayInCalendar;

/** style */

const SelectedDateView = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: ${wp(2.9)}px;
  padding: ${wp(2.9)}px;
  padding-right: 0px;
  padding-bottom: ${wp(1.6)}px;
  border-style: dashed;
  border-top-width: ${DASH_WIDTH}px;
  border-top-color: ${LIGHT_GREY};
  justify-content: space-between;
  align-items: center;
`;

const SelectedDateText = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const SelectMsgView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${hp(2.5)}px;
`;

const SelectMsgText = styled.Text`
  font-size: ${rf(16)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
