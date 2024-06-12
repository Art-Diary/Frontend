import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {AddMyExhButton} from '~/assets/images';
import {calendarColor} from './calendarColor';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useExhFromCalendarActions} from '~/zustand/calendar/exhFromCalendar';
import {JoinDateWithHyphen} from '~/utils/Date';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {useAddScheduleActions} from '~/zustand/calendar/addSchedule';
import { IPicker } from './CalendarScreen';

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
  const {
    updateForget,
    updateVisitDate,
    updateGatherId,
    updateUserExhId,
    updateGatherExhId,
  } = useExhFromCalendarActions();
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
    updateForget(exhItem.visitDate ? false : true);
    updateVisitDate(
      exhItem.visitDate ? JoinDateWithHyphen(exhItem.visitDate) : null,
    );
    updateGatherId(exhItem.gatherId ?? null);
    updateUserExhId(exhItem.userExhId ?? null);
    updateGatherExhId(exhItem.gatherExhId ?? null);
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
          <AddExhButtonWrapper onPress={onPressAddMyExh}>
            <AddMyExhButton />
          </AddExhButtonWrapper>
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
          <TouchableOpacity onPress={() => onPressExhItem(item)}>
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
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default ExhListOfDayInCalendar;

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
  padding-bottom: ${hp(5)}px;
  justify-content: space-between;
  align-items: center;
`;

const SelectedDateText = styled.Text`
  font-size: ${fp(17.5)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const GatherWrapper = styled.View`
  padding-top: ${hp(5)}px;
  align-items: center;
`;

interface GatherNameProps {
  color: string;
}

const GatherName = styled.Text<GatherNameProps>`
  font-size: ${fp(13)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  border-width: 1px;
  border-color: ${(props: GatherNameProps) => props.color}; //#ff6f61;
  border-radius: 20px;
  background-color: white;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
`;

const AddExhButtonWrapper = styled.TouchableOpacity`
  margin: ${wp(2)}px;
`;
