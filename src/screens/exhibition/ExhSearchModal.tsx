import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import OptionsModal from '~/components/exhibition/OptionsModal';
import {
  BACK_COLOR,
  BORDER_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  DASH_WIDTH,
  FONT_NAME,
} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';

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
          <CustomTouchable
            onPress={() => handleConfirm(field, price, state, date)}>
            <BackButton>{x}</BackButton>
          </CustomTouchable>
        </ModalHeader>
        <ModalBody>
          <SubSection>
            <SubTitle>{'전시 부문'}</SubTitle>
            <OptionContainer>
              {isClickField.map(({key, value}) => (
                <CustomTouchable
                  key={key}
                  onPress={() => pressExhField(key, value)}>
                  <Option isClicked={value}>{key}</Option>
                </CustomTouchable>
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
                <CustomTouchable
                  key={key}
                  onPress={() => pressExhPrice(key, value)}>
                  <Option isClicked={value}>{key}</Option>
                </CustomTouchable>
              ))}
            </OptionContainer>
          </SubSection>
          <SubSection>
            <SubTitle>{'전시 진행상황'}</SubTitle>
            <OptionContainer>
              {isClickState.map(({key, value}) => (
                <CustomTouchable
                  key={key}
                  onPress={
                    selectedOption5
                      ? () => optionsModalOpen(key, value)
                      : () => pressExhState(key, value)
                  }>
                  <Option isClicked={value}>{key}</Option>
                </CustomTouchable>
              ))}
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
          <CustomTouchable
            onPress={() =>
              handleConfirm(
                selectedOption2,
                selectedOption3,
                selectedOption4,
                selectedOption5,
              )
            }>
            <CompleteButton isClicked={isPossibleSearch}>
              {'선택 완료'}
            </CompleteButton>
          </CustomTouchable>
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
  background-color: ${BACK_COLOR};
  gap: ${wp(4.5)}px;
`;

const ModalHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between; // 양 끝으로 버튼 배치
  align-items: center;
  border-style: dashed;
  border-bottom-color: ${BORDER_COLOR};
  border-bottom-width: ${DASH_WIDTH}px;
  padding: ${wp(4.5)}px;
`;

const Title = styled.Text`
  font-size: ${rf(19)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
`;

const BackButton = styled.Text`
  font-size: ${rf(19.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const ModalBody = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: ${wp(4.5)}px;
  padding-right: ${wp(4.5)}px;
  gap: ${wp(9)}px;
`;

const SubSection = styled.View`
  flex-direction: column;
  gap: ${wp(2.9)}px;
`;

const SubTitle = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const SubTitlePrice = styled.View`
  flex-direction: row;
  gap: ${wp(1.5)}px;
`;

const SubNoticeTitle = styled.Text`
  font-size: ${rf(9.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-align: center;
  padding-top: ${wp(0.4)}px;
`;

const OptionContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  gap: ${wp(1.8)}px;
`;

interface OptionProps {
  isClicked: boolean;
}

const Option = styled.Text<OptionProps>`
  font-size: ${rf(14.3)}px;
  color: ${(props: OptionProps) =>
    props.isClicked ? `${MAIN_COLOR}` : `${MIDDLE_GREY}`};
  font-family: ${FONT_NAME};
  text-align: center;
  padding-top: ${wp(1.5)}px;
  padding-bottom: ${wp(0.8)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
  border-color: ${(props: OptionProps) =>
    props.isClicked ? `${MAIN_COLOR}` : `${MIDDLE_GREY}`};
  border-width: ${DASH_WIDTH}px;
  border-radius: ${wp(50)}px;
`;

interface CompleteButtonProps {
  isClicked: boolean;
}

const CompleteButton = styled.Text<CompleteButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: CompleteButtonProps) =>
    props.isClicked ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const ButtonSection = styled.View`
  padding-left: ${wp(4.5)}px;
  padding-right: ${wp(4.5)}px;
  padding-bottom: ${wp(2.9)}px;
`;
