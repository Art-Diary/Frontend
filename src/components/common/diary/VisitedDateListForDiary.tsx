import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {BACK_COLOR, DEFAULT_TEXT, MAIN_COLOR, MIDDLE_GREY} from '../colors';
import {FONT_NAME} from '../style';
import {useFetchMyStoredDateListOfExh} from '~/api/queries/mydiary';
import {FlatList} from 'react-native';
import CustomTouchable from '../CustomTouchable';
import {getDateDay} from '~/utils/date';
import {calendarColor} from '~/components/calendar/calendarColor';
import {MarkedType} from '~/types';
import AddVisitedDateForDiaryModal from '../../mydiary/modal/AddVisitedDateForDiaryModal';
import {useFetchStoredDateOfExhInGroup} from '~/api/queries/exhibition';

interface VisitedDateListForDiaryProps {
  exhId: number;
  exhVisitId?: number;
  handleExhVisitId: (exhVisitId: number) => void;
  gatherId?: number;
}

const VisitedDateListForDiary: React.FC<VisitedDateListForDiaryProps> = ({
  exhId,
  exhVisitId,
  handleExhVisitId,
  gatherId,
}) => {
  const limitSize = 3;
  const [openModal, setOpenModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState({
    section: null,
    dateItem: null,
  }); // 아이템 선택
  const [dateList, setDateList] = useState<any>();
  // 모임과 개인 전시회 날짜
  const {
    data: storedDateListOfExh,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = gatherId
    ? useFetchStoredDateOfExhInGroup(exhId, gatherId)
    : useFetchMyStoredDateListOfExh(exhId); // 한 전시회에 대하여 캘린더에 저장된 날짜 조회

  useEffect(() => {
    if (exhId) {
      refetch();
    }
  }, [exhId, gatherId]);

  useEffect(() => {
    if (storedDateListOfExh) {
      if (gatherId) {
        setDateList([storedDateListOfExh]);
      } else {
        setDateList(storedDateListOfExh);
      }
    }
  }, [storedDateListOfExh]);

  const onPressAddDateButton = () => {
    setOpenModal(true);
  };

  const getMyVisitedDateList = () => {
    var list: MarkedType[] = [];

    if (dateList && dateList.length > 0) {
      const dates = dateList[0].dateInfoList;

      for (let i = 0; i < dates.length; i++) {
        var firstColor: string[] = [];
        const date = dates[i].visitDate;

        firstColor.push(calendarColor[0]);
        list.push({
          date: date,
          color: firstColor,
        });
      }
    }
    return list;
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const onPressVisitDate = (item: any, index: any) => {
    if (
      selectedItemIndex.section === index.section &&
      selectedItemIndex.dateItem === index.dateItem
    ) {
      setSelectedItemIndex({section: null, dateItem: null});
      handleExhVisitId(0);
    } else {
      setSelectedItemIndex({
        section: index.section,
        dateItem: index.dateItem,
      });
      handleExhVisitId(item.exhVisitId);
    }
  };

  return (
    <Container>
      <SectionName>방문 날짜</SectionName>
      {/* 방문 날짜 정보 */}
      {exhId === 0 ? (
        <SelectMsgView>
          <SelectMsgText>전시회를 선택해주세요.</SelectMsgText>
        </SelectMsgView>
      ) : (
        <FlatList
          data={dateList}
          renderItem={({item: section, index: sectionIndex}) => (
            <GatherWrapper>
              <SectionWrapper>
                <SectionName>{section.gatherName ?? '개인'}</SectionName>
                {!section.gatherName && (
                  <CustomTouchable onPress={onPressAddDateButton}>
                    <AddDateText>추가</AddDateText>
                  </CustomTouchable>
                )}
              </SectionWrapper>
              <ContentWrapper>
                <FlatList
                  data={section.dateInfoList}
                  renderItem={({item: dateItem, index: dateIndex}) => (
                    <CustomTouchable
                      onPress={() =>
                        onPressVisitDate(dateItem, {
                          section: sectionIndex,
                          dateItem: dateIndex,
                        })
                      }>
                      <DateView
                        isSelected={
                          dateItem.exhVisitId === exhVisitId ||
                          (sectionIndex === selectedItemIndex.section &&
                            dateIndex === selectedItemIndex.dateItem)
                        }>
                        <DateText>
                          {dateItem.visitDate
                            ? `${dateItem.visitDate} (${getDateDay(
                                dateItem.visitDate,
                              )})`
                            : '기억 안 남'}
                        </DateText>
                      </DateView>
                    </CustomTouchable>
                  )}
                  columnWrapperStyle={{
                    gap: wp(1),
                    marginBottom: 10,
                  }} // 열 간격 및 아래 마진
                  ListEmptyComponent={
                    <SelectMsgView>
                      <SelectMsgText>방문 날짜를 추가해주세요.</SelectMsgText>
                    </SelectMsgView>
                  }
                  numColumns={limitSize} // 열 개수 설정
                />
              </ContentWrapper>
            </GatherWrapper>
          )}
          ListEmptyComponent={
            <GatherWrapper>
              <SectionWrapper>
                <SectionName>개인</SectionName>
                <CustomTouchable onPress={onPressAddDateButton}>
                  <AddDateText>추가</AddDateText>
                </CustomTouchable>
              </SectionWrapper>
              <SelectMsgView>
                <SelectMsgText>방문 날짜를 추가해주세요.</SelectMsgText>
              </SelectMsgView>
            </GatherWrapper>
          }
        />
      )}
      {openModal && (
        <AddVisitedDateForDiaryModal
          exhId={exhId}
          handleCloseModal={closeModal}
          message={'개인 방문 날짜 추가'}
          visitedDates={getMyVisitedDateList()}
        />
      )}
    </Container>
  );
};

export default VisitedDateListForDiary;

/** style */
const Container = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${wp(3)}px;
`;

const SectionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SectionName = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const GatherWrapper = styled.View`
  flex-direction: column;
  gap: ${wp(3)}px;
`;

interface DateViewProps {
  isSelected: boolean;
}

const DateView = styled.View<DateViewProps>`
  justify-content: center;
  align-items: center;
  padding-top: ${hp(1.5)}px;
  padding-bottom: ${hp(1.5)}px;
  border-width: 1px;
  border-color: ${MIDDLE_GREY};
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
  background-color: ${(props: DateViewProps) =>
    props.isSelected ? '#fde2e0' : `${BACK_COLOR}`};
  border-radius: ${wp(4)}px;
  width: 100%;
`;

const DateText = styled.Text`
  font-size: ${rf(15.5)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const SelectMsgView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${hp(2)}px;
`;

const SelectMsgText = styled.Text`
  font-size: ${rf(16)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${hp(0.9)}px;
`;

const ContentWrapper = styled.View`
  margin-bottom: ${hp(2)}px;
`;

const AddDateText = styled.Text`
  font-size: ${rf(15)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  border-bottom-width: ${wp(0.3)}px;
  border-bottom-color: ${MAIN_COLOR};
`;
