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
import {
  useSearchNameActions,
  useSearchNameInfo,
  useSearchDateInfo,
} from '~/zustand/exhibition/exhibition';
import {useIsFocused} from '@react-navigation/native';

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
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [isFieldVisible, setIsFieldVisible] = useState(false);
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [isStateVisible, setIsStateVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null); //선택된 분야
  const [selectedState, setSelectedState] = useState<string | null>(null); //선택된 전시 진행상황
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null); //선택된 가격
  const [selectedDate, setSelectedDate] = useState<string | null>(null); //검색 날짜
  const [selectedName, setSelectedName] = useState<string | null>(null); //검색 이름
  const searchExhName = useSearchNameInfo().name;
  const searchExhDate = useSearchDateInfo().date;
  const {data, isLoading, isError, isSuccess, refetch} = useFetchSearchExh(
    selectedName,
    selectedPrice,
    selectedField,
    selectedState,
    //'2024-04-03',
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
      // 다른 화면을 갔다왔을때 갱신
      setSelectedName(null);
      setSelectedField(null);
      setSelectedPrice(null);
      setSelectedState(null);
      setIsNameVisible(false);
      setIsFieldVisible(false);
      setIsPriceVisible(false);
      setIsStateVisible(false);
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
    //이름으로 검색시
    if (searchExhDate != null) {
      if (isStateVisible) {
        setSelectedState(null);
        setIsStateVisible(false);
      }
      setSelectedDate(searchExhDate);
      console.log('자, 날짜 알려줘:', searchExhDate);
      // setIsNameVisible(true);
    }
  }, [searchExhDate]);

  //선택된 옵션 있으면 상단에 보여주기
  useEffect(() => {
    if (selectedDate) {
      setIsDateVisible(true);
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
      if (isDateVisible) {
        setIsDateVisible(false);
        setSelectedDate(null);
      } else {
        setIsStateVisible(true);
      }
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

  //Modal

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleModalClose = (
    selectedOption2: string | null,
    selectedOption3: string | null,
    selectedOption4: string | null,
  ) => {
    setSelectedField(selectedOption2);
    setSelectedPrice(selectedOption3);
    setSelectedState(selectedOption4);
    closeModal();
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

  const deleteField = () => {
    setSelectedField(null);
    setIsFieldVisible(false);
  };

  const deletePrice = () => {
    setSelectedPrice(null);
    setIsPriceVisible(false);
  };

  const deleteState = () => {
    setSelectedState(null);
    setIsStateVisible(false);
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
                onClose={handleModalClose}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ExhibitionSearch')}>
            <AnotherSearchIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CalendarSearch')}>
            <CalendarIcon />
          </TouchableOpacity>
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
          {isFieldVisible && (
            <TouchableOpacity onPress={() => deleteField()}>
              <OptionView>{selectedField}x</OptionView>
            </TouchableOpacity>
          )}
          {isPriceVisible && (
            <TouchableOpacity onPress={() => deletePrice()}>
              <OptionView>{selectedPrice}x</OptionView>
            </TouchableOpacity>
          )}
          {isStateVisible && (
            <TouchableOpacity onPress={() => deleteState()}>
              <OptionView>{selectedState}x</OptionView>
            </TouchableOpacity>
          )}
        </OptionContainer>
        {data &&
          data.map((item: any, index: number) => (
            <Contents key={item.exhId}>
              <ExhItemView
                exhInfo={{...item}}
                noLine={index === data.length - 1 ? true : false}
                notTouchable={true}>
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
