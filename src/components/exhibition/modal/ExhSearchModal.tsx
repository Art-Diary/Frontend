import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import OptionsModal from '~/components/exhibition/modal/OptionsModal';
import {
  BACK_COLOR,
  BORDER_COLOR,
  DEFAULT_TEXT,
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
import {OptionsType} from '~/screens/exhibition/ExhListScreen';

interface ExhSearchProps {
  selectedOptions: OptionsType;
  handleUpdateOptions: (options: OptionsType) => void;
  handleCloseModal: () => void;
}

const ExhSearchModal: React.FC<ExhSearchProps> = ({
  selectedOptions,
  handleUpdateOptions,
  handleCloseModal,
}) => {
  //전시 지역 const exhLocation: string[] = ['서울', '부산', '대구'];
  const [isClickField, setIsClickField] = useState([
    {key: '사진', value: false},
    {key: '회화', value: false},
    {key: '조각', value: false},
    {key: '공예', value: false},
    {key: '미디어아트', value: false},
    {key: '그외', value: false},
  ]);
  const [isClickPrice, setIsClickPrice] = useState([
    {key: '무료', value: false},
    {key: '유료', value: false},
    {key: '20000원 이하', value: false},
  ]);
  const [isClickState, setIsClickState] = useState([
    {key: '진행중', value: false},
    {key: '예정', value: false},
    {key: '종료', value: false},
  ]);
  //모달
  const [isOptionsModalPressed, setIsOptionsModalPressed] =
    useState<boolean>(false);
  // 날짜 옵션 선택되어있는 경우, 선택된 state key알려주는 용도
  const [selectedStatekey, setSelectedStateKey] = useState<string | null>(null);

  useEffect(() => {
    //선택된 값을 모달이 열릴 때, 다시 받아와야함.
    setIsClickField(
      isClickField.map(item => {
        if (selectedOptions.field?.includes(item.key)) {
          return {...item, value: true}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );
    //가격
    setIsClickPrice(
      isClickPrice.map(item => {
        if (item.key === selectedOptions.price) {
          return {...item, value: true}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );
    //전시 상황
    setIsClickState(
      isClickState.map(item => {
        if (selectedOptions.state?.includes(item.key)) {
          return {...item, value: true}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );
  }, [selectedOptions]);

  const pressExhField = (key: string, value: boolean) => {
    //전시 분야 누를 때
    setIsClickField(
      isClickField.map(item => {
        if (item.key === key) {
          return {...item, value: !value}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );
  };

  const pressExhPrice = (key: string) => {
    //전시 가격 누를 때
    let preoptions = isClickPrice;

    preoptions = preoptions.map(item => ({
      ...item,
      value: item.key === key ? !item.value : false,
    }));
    setIsClickPrice(preoptions);
  };

  const pressExhState = (key: string | null, value: any) => {
    //전시 진행상황 누를 때
    setIsClickState(
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
  const optionsModalOpen = (key: string) => {
    setSelectedStateKey(key); // 선택한 값의 key 알려주는 용도
    setIsOptionsModalPressed(true);
  };

  const optionsModalClose = () => {
    setIsOptionsModalPressed(false);
  };

  const onPressYes = () => {
    handleUpdateOptions({...selectedOptions, date: null});
    pressExhState(
      selectedStatekey,
      isClickState.find(item => item.key === selectedStatekey)?.value,
    );
    optionsModalClose();
  };

  const handleConfirm = () => {
    var field: string[] | undefined = undefined;
    var price: string | undefined = undefined;
    var state: string[] | undefined = undefined;

    field = isClickField.filter(item => item.value).map(item => item.key);
    price = isClickPrice.find(item => item.value)?.key;
    state = isClickState.filter(item => item.value).map(item => item.key);

    handleUpdateOptions({
      ...selectedOptions,
      field: field.length === 0 ? null : field,
      price: price ?? null,
      state: state.length === 0 ? null : state,
    });
    handleCloseModal();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={handleCloseModal}>
      <Container>
        <ModalHeader>
          <Title>전시 분류 카테고리</Title>
          <CustomTouchable onPress={handleCloseModal}>
            <BackButton>X</BackButton>
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
                <CustomTouchable key={key} onPress={() => pressExhPrice(key)}>
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
                    selectedOptions.date
                      ? () => optionsModalOpen(key)
                      : () => pressExhState(key, value)
                  }>
                  <Option isClicked={value}>{key}</Option>
                </CustomTouchable>
              ))}
              {isOptionsModalPressed && (
                <OptionsModal
                  handleCloseModal={optionsModalClose}
                  onPressYes={onPressYes}
                  message="전시 진행 상황을 선택하겠습니까?"
                  subMessage="기존에 선택한 날짜는 제외됩니다."
                />
              )}
            </OptionContainer>
          </SubSection>
        </ModalBody>
        <ButtonSection>
          <CustomTouchable onPress={handleConfirm}>
            <CompleteButton>{'선택 완료'}</CompleteButton>
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

const CompleteButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const ButtonSection = styled.View`
  padding-left: ${wp(4.5)}px;
  padding-right: ${wp(4.5)}px;
  padding-bottom: ${wp(2.9)}px;
`;
