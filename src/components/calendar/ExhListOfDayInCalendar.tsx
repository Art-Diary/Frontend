import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useExhFromCalendarActions} from '~/zustand/calendar/exhFromCalendar';
import {changeDotToHyphen} from '~/utils/date';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
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
import AddVisitExhToCalModal from './modal/AddVisitExhToCalModal';

type SelectedDateInfo = {
  selectedDate: string;
  year: number;
  month: number;
};

interface CalendarProps {
  selectedDateInfo: SelectedDateInfo;
  gatherColorList: GatheringColorInfo[];
  exhListOfDay: any[];
}

const ExhListOfDayInCalendar: React.FC<CalendarProps> = ({
  selectedDateInfo,
  gatherColorList,
  exhListOfDay,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const {updateExhFromCalendar} = useExhFromCalendarActions();
  const [openModal, setOpenModal] = useState(false);
  const params: any = useRoute().params;

  useEffect(() => {
    // route.params의 modalOpen 값으로 모달 상태 복원
    if (params.modalOpen) {
      setOpenModal(true);
      navigation.setParams({modalOpen: false}); // 상태 초기화
    }
  }, [params]);

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
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const getVisitedExhIdList = () => {
    var list: number[] = [];
    const scheduleList =
      exhListOfDay[Number(selectedDateInfo.selectedDate.split('.')[2]) - 1]
        .scheduleInfoList;

    if (scheduleList) {
      for (let i = 0; i < scheduleList.length; i++) {
        if (!scheduleList[i].gatherId) {
          list.push(scheduleList[i].exhId);
        }
      }
    }
    return list;
  };

  return (
    <>
      {/* 선택 날짜 */}
      <SelectedDateView>
        <SelectedDateText>
          {selectedDateInfo.selectedDate.split('.')[1]}월{' '}
          {selectedDateInfo.selectedDate.split('.')[2]}일
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
      {openModal && (
        <AddVisitExhToCalModal
          visitedExhIdList={getVisitedExhIdList()}
          selectedDateInfo={selectedDateInfo}
          handleCloseModal={closeModal}
          message={'개인 방문 전시회 추가'}
        />
      )}
      {/* 전시회 리스트 */}
      <FlatList
        data={
          exhListOfDay !== undefined &&
          exhListOfDay[Number(selectedDateInfo.selectedDate.split('.')[2]) - 1]
            .scheduleInfoList !== undefined
            ? exhListOfDay[
                Number(selectedDateInfo.selectedDate.split('.')[2]) - 1
              ].scheduleInfoList
            : []
        }
        renderItem={({item, index}) => (
          <CustomTouchable onPress={() => onPressExhItem(item)}>
            <ExhItemView
              exhInfo={{...item}}
              noLine={
                index ===
                exhListOfDay[
                  Number(selectedDateInfo.selectedDate.split('.')[2]) - 1
                ].scheduleInfoList.length -
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
