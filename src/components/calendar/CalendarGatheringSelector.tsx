import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {showToast} from '~/components/common/modal/toastConfig';
import {ScrollView} from 'react-native';
import {GatheringColorInfo, GatheringInfo, MarkedType} from '~/types';
import CalendarFrame from '~/components/common/CalendarFrame';
import {
  calendarColor,
  findGatherColor,
} from '~/components/calendar/calendarColor';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME} from '../common/style';
import {useFetchGatheringList} from '~/api/queries/gathering';
import {BACK_COLOR, LIGHT_GREY, MAIN_COLOR} from '../common/colors';

interface SelectorProps {
  handleRefetch: () => void;
  refreshing: boolean;
  //
  handleGatherId: (id: number) => void;
  markedDates: MarkedType[];
  handleSelectedDate: (date: string) => void;
  initDate: string;
  handleChangeMonth: (date: string) => void;
  handleGatherColorList: (list: GatheringColorInfo[]) => void;
  gatherColorList: GatheringColorInfo[];
}

const CalendarGatheringSelector: React.FC<SelectorProps> = ({
  handleRefetch,
  refreshing,
  handleGatherId,
  markedDates,
  handleSelectedDate,
  initDate,
  handleChangeMonth,
  handleGatherColorList,
  gatherColorList,
}) => {
  const [selectedId, setSelectedId] = useState(-1); // 아이템 선택
  const {
    data: gatheringList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchGatheringList();

  const handleRefetchGatheringList = async () => {
    await refetch().then(() => {
      handleRefetch();
    });
  };

  useEffect(() => {
    if (gatheringList) {
      settingGatherColor();
    }
  }, [gatheringList]);

  useEffect(() => {
    if (refreshing) {
      handleRefetchGatheringList();
    }
  }, [refreshing]);

  useEffect(() => {
    if (isError) {
      showToast('모임 목록 조회 실패 :(');
    }
  }, [isSuccess, isError, isLoading]);

  const settingGatherColor = () => {
    var list: GatheringColorInfo[] = [];

    for (let i = 0; i < gatheringList.length; i++) {
      list.push({
        gatherId: gatheringList[i].gatherId,
        color: calendarColor[i + 1],
      });
    }
    handleGatherColorList(list);
  };

  const onPressGathering = (gatherId: number) => {
    handleGatherId(gatherId);
    setSelectedId(gatherId);
  };

  return (
    <CalendarFrame
      initDate={initDate}
      onSelectedDate={handleSelectedDate}
      markedDates={markedDates}
      setChangeMonth={handleChangeMonth}
      mainColor={
        selectedId === -2
          ? LIGHT_GREY
          : selectedId === -1
            ? MAIN_COLOR
            : findGatherColor(gatherColorList, selectedId)
      }>
      <GatheringWrapper>
        <ScrollView
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}>
          <GatheringTouch
            activeOpacity={0.6}
            onPress={() => onPressGathering(-2)}
            isPressed={selectedId === -2}
            color={LIGHT_GREY}>
            <GatherNameText color={selectedId === -2 ? 'white' : LIGHT_GREY}>
              모두
            </GatherNameText>
          </GatheringTouch>
          <GatheringTouch
            activeOpacity={0.6}
            onPress={() => onPressGathering(-1)}
            isPressed={selectedId === -1}
            color={MAIN_COLOR}>
            <GatherNameText color={selectedId === -1 ? 'white' : MAIN_COLOR}>
              혼자
            </GatherNameText>
          </GatheringTouch>
          {gatheringList &&
            gatherColorList &&
            gatheringList.map((item: GatheringInfo, index: number) => {
              return (
                <GatheringTouch
                  key={index}
                  activeOpacity={0.6}
                  onPress={() => onPressGathering(item.gatherId)}
                  isPressed={selectedId === item.gatherId}
                  color={
                    gatherColorList[index]
                      ? gatherColorList[index].color
                      : undefined
                  }>
                  <GatherNameText
                    color={
                      selectedId === item.gatherId
                        ? 'white'
                        : gatherColorList[index]
                          ? gatherColorList[index].color
                          : undefined
                    }>
                    {item.gatherName}
                  </GatherNameText>
                </GatheringTouch>
              );
            })}
        </ScrollView>
      </GatheringWrapper>
    </CalendarFrame>
  );
};

export default CalendarGatheringSelector;

/** style */
const GatheringWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  padding-bottom: ${wp(2.9)}px;
`;

interface GatheringUIProps {
  color: string | undefined;
  isPressed: boolean;
}

const GatheringTouch = styled.TouchableOpacity<GatheringUIProps>`
  flex-direction: row;
  padding-top: ${wp(1.3)}px;
  padding-bottom: ${wp(1.3)}px;
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
  border-color: ${(props: GatheringUIProps) =>
    props.color ? `${props.color}` : `${MAIN_COLOR}`};
  border-width: ${wp(0.4)}px;
  border-radius: ${wp(20)}px;
  align-items: flex-end;
  margin-right: ${wp(1)}px;
  background-color: ${(props: GatheringUIProps) =>
    props.color && props.isPressed ? `${props.color}` : `${BACK_COLOR}`};
`;

const GatherNameText = styled.Text<GatheringUIProps>`
  font-size: ${rf(14.1)}px;
  color: ${(props: GatheringUIProps) =>
    props.color ? `${props.color}` : `${MAIN_COLOR}`};
  font-family: ${FONT_NAME};
`;
