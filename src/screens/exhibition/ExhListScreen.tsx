import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {CalendarIcon} from '~/assets/images/index';
import {AnotherSearchIcon} from '~/assets/images/index';
import {ClassifyButton} from '~/assets/images/index';
import {EmptyHeart} from '~/assets/images/index';
import {FullHeart} from '~/assets/images/index';
import {useQuery} from 'react-query';
import {fetchAddLike, fetchAllExh} from '~/api/exhibition';
import {useFetchSearchExh} from '~/api/queries/exhibition';
import {ServerContainer, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useAddLike, useDeleteLike} from '~/api/queries/exhibition';
import {showToast} from '~/components/common/modal/toastConfig';
import ExhSearchModal from './ExhSearchModal';
import ExhSearchByDate from './ExhSearchByDate';
import ExhDetailInfo from './ExhDetailInfo';
import {
  useSearchNameActions,
  useSearchNameInfo,
} from '~/zustand/exhibition/exhibition';
import {useIsFocused} from '@react-navigation/native';
import OptionsModal from '~/components/exhibition/OptionsModal';

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
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [like, setLike] = useState<boolean>(false); //좋아요를 누르면 true
  const [dislike, setDislike] = useState<boolean>(false); //삭제할때 true
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
  } = useAddLike(favExhId);

  const {
    mutate: DeleteLike,
    isLoading: isLoadingDislike,
    isError: isErrorDislike,
    isSuccess: isSuccessDislike,
  } = useDeleteLike(deleteList);

  useEffect(() => {
    if (isFocused) {
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
      console.log(
        '다른 곳 갔다옴:name',
        selectedName,
        ' field: ',
        selectedField,
        ' price: ',
        selectedPrice,
        ' state:',
        selectedState,
        'date:',
        selectedDate,
        '이름 상태',
        isNameVisible,
      );
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    //이름으로 검색시
    if (searchExhName != null) {
      setSelectedName(searchExhName);
      console.log('자, 이름을 알려줘:', searchExhName);
      // setIsNameVisible(true);
    }
  }, [searchExhName]);

  useEffect(() => {
    //날짜로 검색시
    if (selectedDate != null) {
      //searchExhDate=>selectedDate
      if (isStateVisible) {
        setSelectedState(null);
        setIsStateVisible(false);
      }
      setSelectedDate(selectedDate); //searchExhDate=>selectedDate
      //searchExhDate=>selectedDate
      // setIsNameVisible(true);
    } //else setIsDateVisible(false);
    console.log('자, 날짜 알려줘:', selectedDate);
  }, [selectedDate]); //searchExhDate=>selectedDate

  //선택된 옵션 있으면 상단에 보여주기
  useEffect(() => {
    if (selectedDate) {
      setIsDateVisible(true);
    } else {
      setIsDateVisible(false);
    }
    console.log(
      'name',
      selectedName,
      ' field: ',
      selectedField,
      ' price: ',
      selectedPrice,
      ' state:',
      selectedState,
      'date:',
      selectedDate,
      '이름 상태',
      isNameVisible,
    );
  }, [selectedDate]);

  useEffect(() => {
    if (selectedName) {
      setIsNameVisible(true);
    } else {
      setIsNameVisible(false);
    }
    console.log(
      'name',
      selectedName,
      ' field: ',
      selectedField,
      ' price: ',
      selectedPrice,
      ' state:',
      selectedState,
      'date:',
      selectedDate,
      '이름 상태',
      isNameVisible,
    );
  }, [selectedName]);

  useEffect(() => {
    if (selectedField) {
      setIsFieldVisible(true);
    } else {
      setIsFieldVisible(false);
    }
    console.log(
      'name',
      selectedName,
      ' field: ',
      selectedField,
      ' price: ',
      selectedPrice,
      ' state:',
      selectedState,
      'date:',
      selectedDate,
    );
  }, [selectedField]);

  useEffect(() => {
    if (selectedPrice) {
      setIsPriceVisible(true);
    } else {
      setIsPriceVisible(false);
    }
    console.log(
      'name',
      selectedName,
      ' field: ',
      selectedField,
      ' price: ',
      selectedPrice,
      ' state:',
      selectedState,
      'date:',
      selectedDate,
    );
  }, [selectedPrice]);

  useEffect(() => {
    if (selectedState) {
      setIsStateVisible(true);
    } else {
      setIsStateVisible(false);
    }
    console.log(
      'name',
      selectedName,
      ' field: ',
      selectedField,
      ' price: ',
      selectedPrice,
      ' state:',
      selectedState,
      'date:',
      selectedDate,
    );
  }, [selectedState]);

  useEffect(() => {
    if (isSuccess) {
      setHearts(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (like) {
      addLike();
      setLike(false);
    }
  }, [like]);

  useEffect(() => {
    if (dislike) {
      DeleteLike();
      setDislike(false);
    }
  }, [dislike]);

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
  if (isSuccess) {
    //console.log('석공:', data[0].poster);
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
    setSelectedField(selectedOption2);
    setSelectedPrice(selectedOption3);
    setSelectedState(selectedOption4);
    setSelectedDate(selectedOption5);
    closeModal();
  };

  //calendarModal
  const openCalendarModal = () => {
    setIsCalendarModalVisible(true);
  };

  const closeCalendarModal = () => {
    setIsCalendarModalVisible(false);
  };

  const handleCalendarModalClose = (
    selectedOption4: string[] | null,
    selectedOption5: string | null,
  ) => {
    setSelectedState(selectedOption4);
    setSelectedDate(selectedOption5);
    closeCalendarModal();
  };

  //하트 클릭
  const onPressHeart = (exhId: number, index: number) => {
    const tmp: number[] = [];
    setfavExhId(exhId);

    if (!hearts[index].favoriteExh) {
      setLike(true);
    } else {
      tmp.push(exhId);
      setDeleteList(tmp);
      setDislike(true);
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
          <TouchableOpacity onPress={() => openModal()}>
            <ClassifyButton />
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ExhibitionSearch')}>
            <AnotherSearchIcon />
          </TouchableOpacity>
          {selectedState ? (
            <TouchableOpacity onPress={() => optionsModalOpen()}>
              <CalendarIcon />
              {isOptionsModalPressed && (
                <OptionsModal
                  handleCloseModal={optionsModalClose}
                  onPressYes={() => onPressYes()}
                  onPressNo={() => onPressNo()}
                  message="이미 지정된 전시 진행 상황은 삭제됩니다. 
              그렇게 할까요?"
                />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={openCalendarModal}>
              <CalendarIcon />
              {isCalendarModalVisible && (
                <ExhSearchByDate
                  isVisible={isCalendarModalVisible}
                  state={selectedState}
                  date={selectedDate}
                  onClose={handleCalendarModalClose}
                />
              )}
            </TouchableOpacity>
          )}
        </IconsView>
      </Header>

      {/* body */}

      <ScrollView style={{flex: 1}} scrollEventThrottle={200}>
        <OptionContainer>
          {isDateVisible && (
            <TouchableOpacity onPress={() => deleteDate()}>
              <OptionView>{selectedDate}x</OptionView>
            </TouchableOpacity>
          )}
          {isNameVisible && (
            <TouchableOpacity onPress={() => deleteName()}>
              <OptionView>{selectedName}x</OptionView>
            </TouchableOpacity>
          )}
          {isFieldVisible &&
            selectedField?.map((item: string) => (
              <TouchableOpacity onPress={() => deleteField(item)}>
                <OptionView>{item}x</OptionView>
              </TouchableOpacity>
            ))}
          {isPriceVisible && (
            <TouchableOpacity onPress={() => deletePrice()}>
              <OptionView>{selectedPrice}x</OptionView>
            </TouchableOpacity>
          )}
          {isStateVisible &&
            selectedState?.map((item: string) => (
              <TouchableOpacity onPress={() => deleteState(item)}>
                <OptionView key={item}>{item}x</OptionView>
              </TouchableOpacity>
            ))}
        </OptionContainer>
        {data &&
          data.map((item: any, index: number) => (
            <Contents key={item.exhId}>
              <ExhItemView
                exhInfo={{...item}}
                noLine={index === data.length - 1 ? true : false}
                notTouchable={false}
                onTouch={() =>
                  navigation.navigate('ExhDetailInfo', {
                    exhId: item.exhId,
                  })
                }>
                <EmptyHeartContent>
                  <TouchableOpacity
                    onPress={() => onPressHeart(item.exhId, index)}>
                    {hearts &&
                    hearts.length === data.length &&
                    hearts[index].favoriteExh ? (
                      <FullHeart />
                    ) : (
                      <EmptyHeart />
                    )}
                  </TouchableOpacity>
                </EmptyHeartContent>
              </ExhItemView>
            </Contents>
          ))}
      </ScrollView>
    </Container>
  );
};

export default ExhListScreen;

/** style */
const Container = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const HeartContent = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const OptionContainer = styled.View`
  flex: 1;
  background-color: #f6f6f6;
  //flex-wrap: wrap;
  flex-direction: row;
  padding: ${wp(10)}px;
  padding-left: ${wp(10)}px;
  padding-bottom: ${wp(0)}px;
  gap: 10px;
`;
const OptionView = styled.Text`
  font-size: ${fp(15)}px;
  color: #ff6f61;
  font-family: 'omyu pretty';
  text-align: center;
  padding-bottom: ${wp(2)}px;
  padding-top: ${wp(7)}px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  border-color: #ff6f61;
  border-width: ${wp(1.3)}px;
  border-radius: ${wp(20)}px;
`;

const IconsView = styled.View`
  // flex: 1;
  flex-direction: row;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 동일한 폭의 열을 만듦 */
  gap: ${wp(15)}px;
  /* display: flex;
  justify-content: space-between;*/
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: row;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  background-color: #f6f6f6;
`;

const EmptyHeartContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
