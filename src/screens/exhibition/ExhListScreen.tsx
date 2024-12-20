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
import {useAddLike, useDeleteLike} from '~/api/queries/exhibition';
import {showToast} from '~/components/common/modal/toastConfig';
import ExhSearchModal from '../../components/exhibition/modal/ExhSearchModal';
import ExhSearchByDate from '../../components/exhibition/ExhSearchByDate';
import {
  useSearchNameActions,
  useSearchNameInfo,
} from '~/zustand/exhibition/exhibition';
import {useIsFocused} from '@react-navigation/native';
import OptionsModal from '~/components/exhibition/modal/OptionsModal';
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
import ExhAddButton from '../../components/exhibition/ExhAddButton';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

interface Exhibition {
  exhId: number;
  exhName: string;
  gallery: string;
  exhPeriodStart: Date;
  exhPeriodEnd: Date;
  poster: string;
  favoriteExh: boolean;
}

export type OptionsType = {
  field: string[] | null;
  state: string[] | null;
  price: string | null;
  date: string | null;
  searchName: string | null;
};

const ExhListScreen = () => {
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();
  const {updateDate} = useDateFromExhActions(); // 전시회 상세 페이지 내부 캘린더에서 날짜 선택 시 사용
  // const searchExhName = useSearchNameInfo().name;
  // const {updateSearchName} = useSearchNameActions();

  // State Management
  const [hearts, setHearts] = useState<Exhibition[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false); //옵션 선택 모달
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false); //달력 모달
  const [selectedOptions, setSelectedOptions] = useState<OptionsType>({
    field: null,
    state: null,
    price: null,
    date: null,
    searchName: null,
  });
  const [isOptionsModalPressed, setIsOptionsModalPressed] =
    useState<boolean>(false); //진행상황 선택된 상황에서 캘린더 누를시 뜨는 모달
  const [refreshing, setRefreshing] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // API Hooks
  const {data, isLoading, isError, isSuccess, refetch} = useFetchSearchExh(
    selectedOptions.searchName,
    selectedOptions.price,
    selectedOptions.field,
    selectedOptions.state,
    selectedOptions.date,
  );
  const {
    mutate: addLike,
    isLoading: isLoadingLike,
    isError: isErrorLike,
    isSuccess: isSuccessLike,
    error: errorLike,
  } = useAddLike();
  const {
    mutate: deleteLike,
    isLoading: isLoadingDislike,
    isError: isErrorDislike,
    isSuccess: isSuccessDislike,
    error: errorDislike,
  } = useDeleteLike();

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'exhibition') {
        updateTab('exhibition');
        updateDate(null);

        // 다른 화면을 갔다왔을때 갱신 그냥 null을 사용해 다시 받는게 더 빠를 수도,,,
        // setSelectedOptions({
        //   field: null,
        //   state: null,
        //   price: null,
        //   date: null,
        //   searchName: null,
        // });
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

  // useEffect(() => {
  //   if (searchExhName) {
  //     setSelectedName(searchExhName);
  //     setIsNameVisible(true);
  //     updateSearchName(null);
  //   }
  // }, [searchExhName]);

  useEffect(() => {
    if (isSuccess) {
      setHearts(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isErrorLike) {
      const statusCode = errorLike?.response?.status;

      if (statusCode === 409) {
        showToast('이미 좋아요했습니다.');
      } else {
        showToast('다시 시도해주세요.');
      }
    }
    if (isSuccessLike) {
      console.log('좋아요 성공');
    }

    if (isErrorDislike) {
      const statusCode = errorDislike?.response?.status;

      if (statusCode === 409) {
        showToast('이미 좋아요 취소했습니다.');
      } else {
        showToast('다시 시도해주세요.');
      }
    }
    if (isSuccessDislike) {
      console.log('좋아요 삭제');
    }
  }, [isErrorLike, isSuccessLike, isErrorDislike, isSuccessDislike]);

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  //search Modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  //calendarModal
  const openCalendarModal = () => {
    setIsCalendarModalVisible(true);
  };

  const handleCalendarModalClose = () => {
    setIsCalendarModalVisible(false);
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
    setSelectedOptions({...selectedOptions, date: null});
  };

  // const deleteName = () => {
  //   setSelectedOptions({...selectedOptions, searchName: null});
  // };

  const deleteField = (deleteName: string) => {
    var field: string[] | null = null;

    if (selectedOptions.field) {
      field = selectedOptions.field.filter(item => item !== deleteName);
      field = field.length === 0 ? null : field;
    }
    setSelectedOptions({...selectedOptions, field: field});
  };

  const deletePrice = () => {
    setSelectedOptions({...selectedOptions, price: null});
  };

  const deleteState = (deleteName: string) => {
    var state: string[] | null = null;

    if (selectedOptions.state) {
      state = selectedOptions.state.filter(item => item !== deleteName);
      state = state.length === 0 ? null : state;
    }
    setSelectedOptions({...selectedOptions, state: state});
  };

  // 날짜 누를 때, 전시상태옵션이 지정되어 있으면 모달 오픈
  const optionsModalOpen = () => {
    setIsOptionsModalPressed(true);
  };

  const optionsModalClose = () => {
    setIsOptionsModalPressed(false);
  };

  const onPressYes = () => {
    setSelectedOptions({...selectedOptions, state: null});
    optionsModalClose();
    openCalendarModal();
  };

  return (
    <Container>
      <LoadingModal
        isLoading={isLoading || isLoadingLike || isLoadingDislike}
      />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      {/* header */}
      <Header title={'전시회'}>
        <IconsView>
          <CustomTouchable onPress={openModal}>
            <ClassifyButtonIcon />
            {isModalVisible && (
              <ExhSearchModal
                selectedOptions={selectedOptions}
                handleUpdateOptions={setSelectedOptions}
                handleCloseModal={closeModal}
              />
            )}
          </CustomTouchable>
          <CustomTouchable
            onPress={() => navigation.navigate('ExhibitionSearch')}>
            <AnotherSearchIcon />
          </CustomTouchable>
          <CustomTouchable
            onPress={
              selectedOptions.state ? optionsModalOpen : openCalendarModal
            }>
            <SearchDateCalendarIcon />
            {isCalendarModalVisible && (
              <ExhSearchByDate
                selectedOptions={selectedOptions}
                handleUpdateDate={setSelectedOptions}
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
            selectedOptions.date ||
            selectedOptions.searchName ||
            selectedOptions.field ||
            selectedOptions.price ||
            selectedOptions.state
          }>
          <ScrollView
            horizontal={true}
            pagingEnabled={false}
            showsHorizontalScrollIndicator={true}>
            {selectedOptions.date && (
              <OptionView activeOpacity={0.6} onPress={deleteDate}>
                <OptionText>{selectedOptions.date}</OptionText>
                <OptionText isDeleteText> x</OptionText>
              </OptionView>
            )}
            {/* {selectedOptions.searchName && (
              <OptionView activeOpacity={0.6} onPress={deleteName}>
                <OptionText>{selectedOptions.searchName}</OptionText>
                <OptionText isDeleteText> x</OptionText>
              </OptionView>
            )} */}
            {selectedOptions.field &&
              selectedOptions.field.map((item: string, index: number) => (
                <OptionView
                  activeOpacity={0.6}
                  onPress={() => deleteField(item)}
                  key={index}>
                  <OptionText>{item}</OptionText>
                  <OptionText isDeleteText> x</OptionText>
                </OptionView>
              ))}
            {selectedOptions.price && (
              <OptionView activeOpacity={0.6} onPress={deletePrice}>
                <OptionText>{selectedOptions.price}</OptionText>
                <OptionText isDeleteText> x</OptionText>
              </OptionView>
            )}
            {selectedOptions.state &&
              selectedOptions.state.map((item: string, index: number) => (
                <OptionView
                  activeOpacity={0.6}
                  onPress={() => deleteState(item)}
                  key={index}>
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
