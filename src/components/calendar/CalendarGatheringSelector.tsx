import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import LoadingModal from '../common/modal/LoadingModal';
import ErrorModal from '../common/modal/ErrorModal';

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
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  const params: any = useRoute().params;

  // State Management
  const [initialDate, setInitialDate] = useState(initDate);
  const [selectedId, setSelectedId] = useState(-1); // 아이템 선택
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // API Hooks
  const {
    data: gatheringList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchGatheringList();

  // Effects
  useEffect(() => {
    setInitialDate(initDate);
  }, [initDate]);

  useEffect(() => {
    if (params.fromPushAlarm) {
      setInitialDate(params.visitDate);
      handleGatherId(-2);
      setSelectedId(-2);
      navigation.setParams({fromPushAlarm: false, visitDate: undefined}); // 상태 초기화
    }
  }, [params.fromPushAlarm]);

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
      setIsErrorOpen(true);
    }
  }, [isError]);

  // Handlers
  const handleRefetchGatheringList = async () => {
    await refetch().then(() => {
      handleRefetch();
    });
  };

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

  const handleRetry = () => {
    setIsErrorOpen(true);
    refetch();
  };

  return (
    <CalendarFrame
      initDate={initialDate}
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
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetry} />
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
