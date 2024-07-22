import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {calendarColor} from './calendarColor';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useExhFromCalendarActions} from '~/zustand/calendar/exhFromCalendar';
import {changeDotToHyphen} from '~/utils/date';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {useAddScheduleActions} from '~/zustand/calendar/addSchedule';
import {IPicker} from './CalendarScreen';
import {AddMyExhButtonIcon} from '~/components/common/icon';
import {DEFAULT_TEXT, LIGHT_GREY} from '~/components/common/colors';
import {
  AREA_FONT_SIZE,
  FONT_NAME,
  ITEM_BORDER_WIDTH,
} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';

interface CalendarProps {
  selectedDate: string;
  gatherId: number;
  selectorItems: IPicker[];
  exhListOfDay: any[];
}

const ExhListOfDayInCalendar: React.FC<CalendarProps> = ({
  selectedDate,
  gatherId,
  selectorItems,
  exhListOfDay,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const {updateExhFromCalendar} = useExhFromCalendarActions();
  const {updateAddDate} = useAddScheduleActions();

  const findGatherColor = (gatherId: number): string => {
    for (let i = 0; i < selectorItems.length - 1; i++) {
      if (Number(selectorItems[i].value) === gatherId) {
        return calendarColor[i];
      }
    }
    return 'black';
  };

  const onPressExhItem = (exhItem: any) => {
    /* 선택한 날짜의 기록들 */
    updateVisitedExhId(exhItem.exhId);
    updateExhFromCalendar(
      exhItem.visitDate ? false : true,
      exhItem.visitDate ? changeDotToHyphen(exhItem.visitDate) : null,
      exhItem.gatherId ?? null,
      exhItem.exhVisitId ?? null,
    );
    navigation.navigate('CalendarDiaryRoutes');
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
      <SelectedDateWrapper>
        <SelectedDateView>
          <SelectedDateText>
            {selectedDate.split('.')[1]}월 {selectedDate.split('.')[2]}일
          </SelectedDateText>
          <CustomTouchable onPress={onPressAddMyExh}>
            <AddMyExhButtonIcon />
          </CustomTouchable>
        </SelectedDateView>
      </SelectedDateWrapper>
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
              notTouchable={true}>
              {gatherId === -2 && item.gatherName && (
                <GatherWrapper>
                  <GatherName color={findGatherColor(item.gatherId)}>
                    {item.gatherName}
                  </GatherName>
                </GatherWrapper>
              )}
            </ExhItemView>
          </CustomTouchable>
        )}
      />
    </>
  );
};

export default ExhListOfDayInCalendar;

/** style */
const SelectedDateWrapper = styled.View`
  width: 100%;
  padding-top: ${wp(2.9)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
`;

const SelectedDateView = styled.View`
  width: 100%;
  flex-direction: row;
  border-bottom-color: ${LIGHT_GREY};
  border-bottom-width: ${ITEM_BORDER_WIDTH}px;
  padding-bottom: ${wp(1.6)}px;
  justify-content: space-between;
  align-items: center;
`;

const SelectedDateText = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const GatherWrapper = styled.View`
  padding-top: ${wp(1.6)}px;
  align-items: center;
`;

interface GatherNameProps {
  color: string;
}

const GatherName = styled.Text<GatherNameProps>`
  font-size: ${rf(12.3)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  border-width: ${wp(0.3)}px;
  border-color: ${(props: GatherNameProps) => props.color}; //#ff6f61;
  border-radius: ${wp(10)}px;
  background-color: white;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
  padding-top: ${hp(0.9)}px;
  padding-bottom: ${hp(0.9)}px;
`;
