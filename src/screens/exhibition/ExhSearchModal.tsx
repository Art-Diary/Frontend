import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Modal, BackHandler, ScrollView} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import OptionsModal from '~/components/exhibition/OptionsModal';

interface ExhSearchProps {
  title: string; // title prop의 타입을 문자열로 지정
  x: string;
  isVisible: boolean;
  field: string[] | null;
  price: string | null;
  state: string[] | null;
  date: string | null;
  onClose: (
    selectedOption2: string[] | null,
    selectedOption3: string | null,
    selectedOption4: string[] | null,
    selectedOption5: string | null,
  ) => void;
}

const ExhSearchModal: React.FC<ExhSearchProps> = ({
  title,
  x,
  isVisible,
  field,
  price,
  state,
  date,
  onClose,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedOption2, setSelectedOption2] = useState<string[] | null>(
    field,
  ); //전시 분야
  const [selectedOption3, setSelectedOption3] = useState<string | null>(price); //전시 가격
  const [selectedOption4, setSelectedOption4] = useState<string[] | null>(
    state,
  ); //전시 진행상황
  const [selectedOption5, setSelectedOption5] = useState<string | null>(date); //전시 날짜

  //전시 지역 const exhLocation: string[] = ['서울', '부산', '대구'];
  const [isClickField, SetIsClickField] = useState([
    {key: '사진', value: false},
    {key: '회화', value: false},
    {key: '조각', value: false},
    {key: '공예', value: false},
    {key: '미디어아트', value: false},
    {key: '그외', value: false},
  ]);
  const [isClickPrice, SetIsClickPrice] = useState([
    {key: '무료', value: false},
    {key: '유료', value: false},
    {key: '20000원 이하', value: false},
  ]);
  const [isClickState, SetIsClickState] = useState([
    {key: '진행중', value: false},
    {key: '예정', value: false},
    {key: '종료', value: false},
  ]);
  const [isPossibleSearch, SetIsPossibleSearch] = useState<boolean>(false);
  const [options, SetOptions] = useState<number>(0); //선택된 옵션 개수 -> 버튼 색변화
  //모달
  const [isOptionsModalPressed, setIsOptionsModalPressed] =
    useState<boolean>(false);

  const [selectedStatekey, setSelectedStateKey] = useState<string | null>(null); // 날짜 옵션 선택되어있는 경우, 선택된 state key알려주는 용도

  // useEffect(() => {
  //   //확인용
  //   //  if(date!=null) setIsDate(true);
  //   console.log(
  //     '분류 선택 페이지>searchExhDate:',
  //     selectedOption4,
  //     selectedOption5,
  //   );
  // }, [selectedOption4]);

  useEffect(() => {
    //이미 선택된 옵션 수
    let tmp: number = 0;
    if (selectedOption2 != null) {
      tmp = tmp + selectedOption2.length;
    }
    if (selectedOption3 != null) {
      tmp = tmp + selectedOption3.length;
    }
    if (selectedOption4 != null) {
      tmp = tmp + selectedOption4.length;
    }

    SetOptions(tmp);
    if (options > 0) SetIsPossibleSearch(true);
    else SetIsPossibleSearch(false);
  }, [options]);

  useEffect(() => {
    //선택된 값을 모달이 열릴 때, 다시 받아와야함.
    let tmp: number = options;
    //전시분야
    if (field != null) {
      tmp = tmp + 1;
      SetOptions(tmp);
    }

    SetIsClickField(
      isClickField.map(item => {
        if (field?.includes(item.key)) {
          return {...item, value: true}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );

    //가격
    if (price != null) {
      tmp = tmp + 1;
      SetOptions(tmp);
    }
    SetIsClickPrice(
      isClickPrice.map(item => {
        if (item.key === price) {
          return {...item, value: true}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );

    //전시 상황
    if (state != null) {
      tmp = tmp + 1;
      SetOptions(tmp);
    }
    SetIsClickState(
      isClickState.map(item => {
        if (state?.includes(item.key)) {
          return {...item, value: true}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );
  }, [field, price, state]);

  useEffect(() => {
    console.log(selectedOption2, ',', selectedOption3, ',', selectedOption4);
  }, [selectedOption2, selectedOption3, selectedOption4]);

  const handleConfirm = (
    selectedOption2: string[] | null,
    selectedOption3: string | null,
    selectedOption4: string[] | null,
    selectedOption5: string | null,
  ) => {
    onClose(selectedOption2, selectedOption3, selectedOption4, selectedOption5);
  };

  const pressExhField = (key: string, value: boolean) => {
    //전시 분야 누를 때

    let tmp: number = options;
    if (value) {
      //눌려져있는 상태
      tmp = tmp - 1;
      SetOptions(tmp);
      if (selectedOption2 != null) {
        setSelectedOption2(selectedOption2.filter(item => item !== key));
      }
    } else {
      tmp = tmp + 1;
      SetOptions(tmp);
      if (selectedOption2 != null) {
        setSelectedOption2(selectedOption2.concat(key));
      } else {
        setSelectedOption2([key]);
      }
    }

    SetIsClickField(
      isClickField.map(item => {
        if (item.key === key) {
          return {...item, value: !value}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );
  };

  const pressExhPrice = (key: string, kvalue: boolean) => {
    //전시 가격 누를 때

    let tmp: number = options;
    let preoptions = isClickPrice;
    if (selectedOption3) {
      const updatedClickPriceIndex = preoptions.findIndex(
        item => item.key === selectedOption3,
      );
      if (updatedClickPriceIndex !== -1) {
        preoptions[updatedClickPriceIndex].value = false;
      }
    }

    if (kvalue) {
      tmp = tmp - 1;
      SetOptions(tmp);
      setSelectedOption3(null);
    } else {
      tmp = tmp + 1;
      SetOptions(tmp);
      setSelectedOption3(key);
    }

    const updatedClickPriceIndex = preoptions.findIndex(
      item => item.key === key,
    );
    if (updatedClickPriceIndex !== -1) {
      preoptions[updatedClickPriceIndex].value = !kvalue;
    }
    SetIsClickPrice(preoptions);
  };

  // const pressExhPrice = (key: string, kvalue: boolean) => {
  //   //전시 가격 누를 때
  //   let tmp: number = options;
  //   if (kvalue) {
  //     tmp = tmp - 1;
  //     SetOptions(tmp);
  //     setSelectedOption3(null);
  //   } else {
  //     tmp = tmp + 1;
  //     SetOptions(tmp);
  //     setSelectedOption3(key);
  //   }

  //   SetIsClickPrice(
  //     isClickPrice.map(item => {
  //       if (item.key === key) {
  //         // console.log('preoptions', preoption, item.value);
  //         return {...item, value: !kvalue};
  //       }
  //       return item;
  //     }),
  //   );
  //   console.log(isClickPrice);

  // };

  const pressExhState = (key: string | null, value: any) => {
    //전시 진행상황 누를 때
    let tmp: number = options;

    if (key) {
      if (value) {
        //눌려져있는 상태
        tmp = tmp - 1;
        SetOptions(tmp);
        if (selectedOption4 != null) {
          setSelectedOption4(selectedOption4.filter(item => item !== key));
        }
      } else {
        tmp = tmp + 1;
        SetOptions(tmp);
        if (selectedOption4 != null) {
          setSelectedOption4(selectedOption4.concat(key));
        } else {
          setSelectedOption4([key]);
        }
      }
    }

    SetIsClickState(
      isClickState.map(item => {
        if (item.key === key) {
          return {...item, value: !value}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );
  };

  //전시 상태 누를 때, 날짜옵션이 지정되어 있으면 모달 오픈
  // 모달을 열기 위한 함수
  const optionsModalOpen = (key: string, value: boolean) => {
    console.log(
      '[OptionsModalOpen] Opening OptionsModal for Field and key:',
      key,
    );
    setIsOptionsModalPressed(true);
    setSelectedStateKey(key); // 선택한 값의 key 알려주는 용도
  };

  const optionsModalClose = () => {
    setIsOptionsModalPressed(false);
  };

  const onPressYes = (key: string | null) => {
    setSelectedOption5(null);
    pressExhState(key, isClickState.find(item => item.key === key)?.value);
    optionsModalClose();
  };

  const onPressNo = () => {
    setSelectedOption4(null);
    optionsModalClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      {/* onRequestClose={() => onClose}> */}
      <Container>
        <ModalHeader>
          <Title>{title}</Title>
          <TouchableOpacity
            onPress={() => handleConfirm(field, price, state, date)}>
            <BackButton>{x}</BackButton>
          </TouchableOpacity>
        </ModalHeader>
        <ModalBody>
          <SubSection>
            <SubTitle>{'전시 부문'}</SubTitle>
            <OptionContainer>
              {isClickField.map(({key, value}) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => pressExhField(key, value)}>
                  {value ? <Option>{key}</Option> : <UnOption>{key}</UnOption>}
                </TouchableOpacity>
              ))}
            </OptionContainer>
          </SubSection>
          <SubSection>
            <SubTitlePrice>
              <SubTitle>{'전시 가격'}</SubTitle>
              <SubNoticeTitle>{'* 하나만 선택 가능'}</SubNoticeTitle>
            </SubTitlePrice>
            <OptionContainer>
              {isClickPrice.map(({key, value}) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => pressExhPrice(key, value)}>
                  {value ? <Option>{key}</Option> : <UnOption>{key}</UnOption>}
                </TouchableOpacity>
              ))}
            </OptionContainer>
          </SubSection>
          <SubSection>
            <SubTitle>{'전시 진행상황'}</SubTitle>
            <OptionContainer>
              {isClickState.map(
                (
                  {key, value}, //{
                ) =>
                  selectedOption5 ? (
                    <TouchableOpacity
                      key={key}
                      onPress={() => optionsModalOpen(key, value)}>
                      {value ? (
                        <Option>{key}</Option>
                      ) : (
                        <UnOption>{key}</UnOption>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={key}
                      onPress={() => pressExhState(key, value)}>
                      {value ? (
                        <Option>{key}</Option>
                      ) : (
                        <UnOption>{key}</UnOption>
                      )}
                    </TouchableOpacity>
                  ),
              )}
              {isOptionsModalPressed && (
                <OptionsModal
                  handleCloseModal={optionsModalClose}
                  // tkey={selectedOption4}
                  onPressYes={() => onPressYes(selectedStatekey)}
                  onPressNo={() => onPressNo()}
                  message="이미 지정된 날짜는 삭제됩니다.
                  그렇게 할까요?"
                />
              )}
            </OptionContainer>
          </SubSection>
        </ModalBody>
        <ButtonSection>
          {isPossibleSearch ? (
            <TouchableOpacity
              onPress={() =>
                handleConfirm(
                  selectedOption2,
                  selectedOption3,
                  selectedOption4,
                  selectedOption5,
                )
              }>
              <CompleteButton>{'선택 완료'}</CompleteButton>
            </TouchableOpacity>
          ) : (
            <UnCompleteButton>{'선택 완료'}</UnCompleteButton>
          )}
        </ButtonSection>
      </Container>
    </Modal>
  );
};

export default ExhSearchModal;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between; // 양 끝으로 버튼 배치
  width: 100%;
  height: ${hp(42)}px;
  background-color: #f6f6f6;
`;

const Title = styled.Text`
  flex: 1;
  font-size: ${fp(20)}px;
  color: #ff6f61;
  font-family: 'omyu pretty';
`;

const BackButton = styled.Text`
  font-size: ${fp(21)}px;
  color: #979797;
  font-family: 'omyu pretty';
`;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${wp(18)}px;
`;

const SubSection = styled.View`
  flex-direction: column;
  padding-bottom: ${wp(35)}px;
`;

const UnCompleteButton = styled.Text`
  font-size: ${fp(17)}px;
  flex-direction: column;
  color: #ffffff;
  padding: ${wp(10)}px;
  font-family: 'omyu pretty';
  text-align: center;
  background-color: #979797;
  border-color: #979797;
  border-width: ${wp(1.3)}px;
  border-radius: ${wp(5)}px;
`;

const CompleteButton = styled.Text`
  font-size: ${fp(17)}px;
  flex-direction: column;
  color: #ffffff;
  padding: ${wp(10)}px;
  font-family: 'omyu pretty';
  text-align: center;
  background-color: #ff6f61;
  border-color: #ff6f61;
  border-width: ${wp(1.3)}px;
  border-radius: ${wp(5)}px;
`;

const ButtonSection = styled.View`
  flex-direction: column;
  padding: ${wp(10)}px;
`;

const ModalBody = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${wp(20)}px;
  padding-top: ${wp(10)}px;
`;

const SubTitlePrice = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  padding: ${wp(10)}px;
  padding-left: ${wp(0)}px;
  padding-bottom: ${wp(0)}px;
  gap: 10px;
`;

const SubTitle = styled.Text`
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const SubNoticeTitle = styled.Text`
  font-size: ${fp(10)}px;
  color: #979797;
  font-family: 'omyu pretty';
  text-align: center;
`;

const OptionContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  padding: ${wp(10)}px;
  padding-left: ${wp(0)}px;
  padding-bottom: ${wp(0)}px;
  gap: 10px;
`;

const Option = styled.Text`
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

const UnOption = styled.Text`
  font-size: ${fp(15)}px;
  color: #979797;
  font-family: 'omyu pretty';
  text-align: center;
  padding-bottom: ${wp(2)}px;
  padding-top: ${wp(7)}px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  border-color: #979797;
  border-width: ${wp(1.3)}px;
  border-radius: ${wp(20)}px;
`;
