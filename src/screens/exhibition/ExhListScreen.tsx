import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {useFetchSearchExh} from '~/api/queries/exhibition';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useAddLike, useDeleteLike} from '~/api/queries/exhibition';
import {showToast} from '~/components/common/modal/toastConfig';
import ExhSearchModal from './ExhSearchModal';
import ExhSearchByDate from './ExhSearchByDate';
import {
  useSearchNameActions,
  useSearchNameInfo,
} from '~/zustand/exhibition/exhibition';
import {useIsFocused} from '@react-navigation/native';
import OptionsModal from '~/components/exhibition/OptionsModal';
import {
  useAddScheduleActions,
  useAddScheduleInfo,
} from '~/zustand/calendar/addSchedule';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {
  AnotherSearchIcon,
  ClassifyButtonIcon,
  EmptyHeartIcon,
  FullHeartIcon,
  SearchDateCalendarIcon,
} from '~/components/common/icon';
import {BACK_COLOR, BORDER_COLOR, MAIN_COLOR} from '~/components/common/colors';
import {DASH_WIDTH, FONT_NAME} from '~/components/common/style';
import {useDateFromExhActions} from '~/zustand/calendar/dateFromExh';
import CustomTouchable from '~/components/common/CustomTouchable';
import ExhAddButton from './ExhAddButton';

interface Exhibition {
  exhId: number;
  exhName: string;
  gallery: string;
  exhPeriodStart: Date;
  exhPeriodEnd: Date;
  poster: string;
  favoriteExh: boolean;
}

const ExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const [hearts, setHearts] = useState<Exhibition[]>([]);
  const [favExhId, setfavExhId] = useState<number>(0); //누른 전시회 exhId
  const [isModalVisible, setIsModalVisible] = useState(false); //옵션 선택 모달
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false); //달력 모달
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [isFieldVisible, setIsFieldVisible] = useState(false);
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [isStateVisible, setIsStateVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<string[] | null>(null); //선택된 분야
  const [selectedState, setSelectedState] = useState<string[] | null>(null); //선택된 전시 진행상황
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null); //선택된 가격
  const [selectedDate, setSelectedDate] = useState<string | null>(null); //검색 날짜
  const [selectedName, setSelectedName] = useState<string | null>(null); //검색 이름
  const [isOptionsModalPressed, setIsOptionsModalPressed] =
    useState<boolean>(false); //진행상황 선택된 상황에서 캘린더 누를시 뜨는 모달
  const searchExhName = useSearchNameInfo().name;
  const {addDate} = useAddScheduleInfo();
  const {updateAddDate} = useAddScheduleActions();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();
  const {updateDate} = useDateFromExhActions(); // 전시회 상세 페이지 내부 캘린더에서 날짜 선택 시 사용
  const {updateSearchName} = useSearchNameActions();
  const [refreshing, setRefreshing] = useState(false);

  const {data, isLoading, isError, isSuccess, refetch} = useFetchSearchExh(
    selectedName,
    selectedPrice,
    selectedField,
    selectedState,
    selectedDate,
  );

  //post
  const {
    mutate: addLike,
    isLoading: isLoadingLike,
    isError: isErrorLike,
    isSuccess: isSuccessLike,
  } = useAddLike();

  const {
    mutate: deleteLike,
    isLoading: isLoadingDislike,
    isError: isErrorDislike,
    isSuccess: isSuccessDislike,
  } = useDeleteLike();

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'exhibition') {
        updateTab('exhibition');
        updateDate(null);

        // 다른 화면을 갔다왔을때 갱신 그냥 null을 사용해 다시 받는게 더 빠를 수도,,,
        setSelectedName(null);
        setSelectedField(null);
        setSelectedPrice(null);
        setSelectedState(null);
        setSelectedDate(null);
        setIsNameVisible(false);
        setIsFieldVisible(false);
        setIsPriceVisible(false);
        setIsStateVisible(false);
        setIsDateVisible(false);
      }

      handleRefetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (refreshing) {
      handleRefetch();
    }
  }, [refreshing]);

  const handleRefetch = async () => {
    await refetch().then(result => {
      const resData = result.data;
      setHearts(resData);
      setRefreshing(false);
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  useEffect(() => {
    if (searchExhName) {
      setSelectedName(searchExhName);
      setIsNameVisible(true);
      updateSearchName(null);
    }
  }, [searchExhName]);

  useEffect(() => {
    if (addDate) {
      setSelectedDate(addDate);
      setIsDateVisible(true);
      updateAddDate(null);
    }
  }, [addDate]);

  useEffect(() => {
    if (selectedField) {
      setIsFieldVisible(true);
    } else {
      setIsFieldVisible(false);
    }
  }, [selectedField]);

  useEffect(() => {
    if (selectedPrice) {
      setIsPriceVisible(true);
    } else {
      setIsPriceVisible(false);
    }
  }, [selectedPrice]);

  useEffect(() => {
    if (selectedState) {
      setIsStateVisible(true);
    } else {
      setIsStateVisible(false);
    }
  }, [selectedState]);

  useEffect(() => {
    if (isSuccess) {
      setHearts(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isErrorLike) {
      //showToast('좋아요 실패했습니다.');
      console.log('좋아요 실패');
    }
    if (isLoadingLike) {
      // setIsLoadingOpen(true);
      console.log('좋아요 로딩중');
    }
    if (isSuccessLike) {
      console.log(favExhId);
      console.log('좋아요 성공');
    }

    if (isErrorDislike) {
      showToast('좋아요 삭제 실패했습니다.');
      //console.log('좋아요 실패');
    }
    if (isLoadingDislike) {
      // setIsLoadingOpen(true);
      console.log('좋아요 삭제 로딩중');
    }
    if (isSuccessDislike) {
      console.log(favExhId);
      console.log('좋아요 삭제');
    }
  }, [
    isErrorLike,
    isLoadingLike,
    isSuccessLike,
    isErrorDislike,
    isLoadingDislike,
    isSuccessDislike,
  ]);

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'로딩 중 :)'} />;
  }

  //search Modal

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleModalClose = (
    selectedOption2: string[] | null,
    selectedOption3: string | null,
    selectedOption4: string[] | null,
    selectedOption5: string | null,
  ) => {
    if (selectedOption2 && selectedOption2.length === 0) {
      selectedOption2 = null;
    }
    if (selectedOption4 && selectedOption4.length === 0) {
      selectedOption4 = null;
    }
    setSelectedField(selectedOption2);
    setSelectedPrice(selectedOption3);
    setSelectedState(selectedOption4);
    setSelectedDate(selectedOption5);
    if (!selectedOption5) {
      setIsDateVisible(false);
    }
    closeModal();
  };

  //calendarModal
  const openCalendarModal = () => {
    setIsCalendarModalVisible(true);
  };

  const closeCalendarModal = () => {
    setIsCalendarModalVisible(false);
  };

  const handleCalendarModalClose = () => {
    closeCalendarModal();
  };

  //하트 클릭
  const onPressHeart = (exhId: number, index: number) => {
    if (!hearts[index].favoriteExh) {
      addLike(exhId);
    } else {
      deleteLike([exhId]);
    }
    const updatedItems = hearts.map((item: any) =>
      item.exhId === exhId ? {...item, favoriteExh: !item.favoriteExh} : item,
    );

    setHearts(updatedItems);
  };

  //옵션 삭제
  const deleteDate = () => {
    setSelectedDate(null);
    setIsDateVisible(false);
  };

  const deleteName = () => {
    setSelectedName(null);
    setIsNameVisible(false);
  };

  const deleteField = (deleteName: string) => {
    if (selectedField != null) {
      if (selectedField?.length > 1) {
        setSelectedField(selectedField.filter(item => item !== deleteName));
      } else {
        setSelectedField(null);
        setIsFieldVisible(false);
      }
    }
  };

  const deletePrice = () => {
    setSelectedPrice(null);
    setIsPriceVisible(false);
  };

  const deleteState = (deleteName: string) => {
    //setSelectedState(null);
    //setIsStateVisible(false);
    if (selectedState != null) {
      if (selectedState?.length > 1) {
        setSelectedState(selectedState.filter(item => item !== deleteName));
      } else {
        setSelectedState(null);
        setIsStateVisible(false);
      }
    }
  };

  //날짜 누를 때, 전시상태옵션이 지정되어 있으면 모달 오픈
  // 모달을 열기 위한 함수
  const optionsModalOpen = () => {
    console.log(
      '[OptionsModalOpen] Opening OptionsModal for calendar, the state exits',
    );
    setIsOptionsModalPressed(true);
    //setSelectedOption5(selectedDate); // 선택한 값의 key 알려주는 용도
  };

  const optionsModalClose = () => {
    setIsOptionsModalPressed(false);
  };

  const onPressYes = () => {
    setSelectedState(null);
    setIsStateVisible(false);
    optionsModalClose();
    openCalendarModal();
  };

  const onPressNo = () => {
    optionsModalClose();
  };

  return (
    <Container>
      {/* header */}
      <Header title={'전시회'}>
        <IconsView>
          <CustomTouchable onPress={() => openModal()}>
            <ClassifyButtonIcon />
            {isModalVisible && (
              <ExhSearchModal
                title={'전시 분류 카테고리'}
                x={'X'}
                isVisible={isModalVisible}
                field={selectedField}
                price={selectedPrice}
                state={selectedState}
                date={selectedDate}
                onClose={handleModalClose}
              />
            )}
          </CustomTouchable>
          <CustomTouchable
            onPress={() => navigation.navigate('ExhibitionSearch')}>
            <AnotherSearchIcon />
          </CustomTouchable>
          <CustomTouchable
            onPress={selectedState ? optionsModalOpen : openCalendarModal}>
            <SearchDateCalendarIcon />
            {isCalendarModalVisible && (
              <ExhSearchByDate
                isVisible={isCalendarModalVisible}
                date={selectedDate}
                onClose={handleCalendarModalClose}
              />
            )}
            {isOptionsModalPressed && (
              <OptionsModal
                handleCloseModal={optionsModalClose}
                onPressYes={() => onPressYes()}
                message="날짜 선택을 하시겠습니까?"
                subMessage="기존에 선택한 전시 진행 상황은 제외됩니다."
              />
            )}
          </CustomTouchable>
        </IconsView>
      </Header>

      {/* body */}
      <ContentsWrapper>
        <OptionContainer
          haveOption={
            isDateVisible ||
            isNameVisible ||
            isFieldVisible ||
            isPriceVisible ||
            isStateVisible
          }>
          <ScrollView
            horizontal={true}
            pagingEnabled={false}
            showsHorizontalScrollIndicator={true}>
            {isDateVisible && (
              <OptionView activeOpacity={0.6} onPress={() => deleteDate()}>
                <OptionText>{selectedDate}</OptionText>
                <OptionText isDeleteText> x</OptionText>
              </OptionView>
            )}
            {isNameVisible && (
              <OptionView activeOpacity={0.6} onPress={() => deleteName()}>
                <OptionText>{selectedName}</OptionText>
                <OptionText isDeleteText> x</OptionText>
              </OptionView>
            )}
            {isFieldVisible &&
              selectedField?.map((item: string) => (
                <OptionView
                  activeOpacity={0.6}
                  onPress={() => deleteField(item)}>
                  <OptionText>{item}</OptionText>
                  <OptionText isDeleteText> x</OptionText>
                </OptionView>
              ))}
            {isPriceVisible && (
              <OptionView activeOpacity={0.6} onPress={() => deletePrice()}>
                <OptionText>{selectedPrice}</OptionText>
                <OptionText isDeleteText> x</OptionText>
              </OptionView>
            )}
            {isStateVisible &&
              selectedState?.map((item: string) => (
                <OptionView
                  activeOpacity={0.6}
                  onPress={() => deleteState(item)}>
                  <OptionText key={item}>{item}</OptionText>
                  <OptionText isDeleteText> x</OptionText>
                </OptionView>
              ))}
          </ScrollView>
        </OptionContainer>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          style={{flex: 1}}
          scrollEventThrottle={200}>
          {data &&
            data.map((item: any, index: number) => (
              <ExhItemView
                key={index}
                exhInfo={{...item}}
                noLine={index === data.length - 1 ? true : false}
                notTouchable={false}
                onTouch={() =>
                  navigation.navigate('ExhDetailInfo', {
                    exhId: item.exhId,
                  })
                }>
                <EmptyHeartContent>
                  <CustomTouchable
                    onPress={() => onPressHeart(item.exhId, index)}>
                    {hearts &&
                    hearts.length === data.length &&
                    hearts[index].favoriteExh ? (
                      <FullHeartIcon />
                    ) : (
                      <EmptyHeartIcon />
                    )}
                  </CustomTouchable>
                </EmptyHeartContent>
              </ExhItemView>
            ))}
        </ScrollView>

        <ExhAddButton />
      </ContentsWrapper>
    </Container>
  );
};

export default ExhListScreen;

/** style */
const Container = styled.View`
  flex: 1;
  background-color: ${BACK_COLOR};
`;

const ContentsWrapper = styled.View`
  flex: 1;
`;

interface OptionContainerProps {
  haveOption: boolean;
}

const OptionContainer = styled.View<OptionContainerProps>`
  flex-direction: row;
  width: 100%;
  padding: ${(props: OptionContainerProps) =>
    props.haveOption ? `${wp(2.9)}px` : `0px`};
  border-style: dashed;
  border-bottom-color: ${BORDER_COLOR};
  border-bottom-width: ${(props: OptionContainerProps) =>
    props.haveOption ? `${DASH_WIDTH}px` : `0px`};
`;

const OptionView = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: ${wp(0.5)}px;
  padding-bottom: ${wp(1.3)}px;
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
  border-color: ${MAIN_COLOR};
  border-width: ${wp(0.4)}px;
  border-radius: ${wp(20)}px;
  align-items: flex-end;
  margin-right: ${wp(1)}px;
`;

interface OptionTextProps {
  isDeleteText: boolean;
}

const OptionText = styled.Text<OptionTextProps>`
  font-size: ${(props: OptionTextProps) =>
    props.isDeleteText ? `${rf(17)}px` : `${rf(14.1)}px`};
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
`;

const IconsView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(4)}px;
`;

const EmptyHeartContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
