import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Modal, BackHandler, ScrollView} from 'react-native';
//import {useNavigation} from '@react-navigation/native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
//import {Modal, ActivityIndicator} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import useModal from './ExhListScreen';
import {copyFileAssets} from 'react-native-fs';

interface ExhSearchProps {
  title: string; // title prop의 타입을 문자열로 지정
  x: string;
  isVisible: boolean;
  field: string | null;
  price: string | null;
  state: string | null;
  onClose: (
    selectedOption2: string | null,
    selectedOption3: string | null,
    selectedOption4: string | null,
  ) => void;
}

const ExhSearchModal: React.FC<ExhSearchProps> = ({
  title,
  x,
  isVisible,
  field,
  price,
  state,
  onClose,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedOption2, setSelectedOption2] = useState<string | null>(field);
  const [selectedOption3, setSelectedOption3] = useState<string | null>(price);
  const [selectedOption4, setSelectedOption4] = useState<string | null>(state);

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

  useEffect(() => {
    if (options > 0) SetIsPossibleSearch(true);
    else SetIsPossibleSearch(false);
  }, [options]);

  useEffect(() => {
    let tmp: number = options;
    //전시분야
    if (field != null) {
      tmp = tmp + 1;
      SetOptions(tmp);
    }
    SetIsClickField(
      isClickField.map(item => {
        if (item.key === field) {
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
        if (item.key === state) {
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
    selectedOption2: string | null,
    selectedOption3: string | null,
    selectedOption4: string | null,
  ) => {
    onClose(selectedOption2, selectedOption3, selectedOption4);
  };

  const pressExhField = (key: string, value: boolean) => {
    //전시 분야 누를 때

    let tmp: number = options;
    if (value) {
      //눌려져있는 상태
      tmp = tmp - 1;
      SetOptions(tmp);
      setSelectedOption2(null);
    } else {
      tmp = tmp + 1;
      SetOptions(tmp);
      setSelectedOption2(key);
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

  const pressExhPrice = (key: string, value: boolean) => {
    //전시 가격 누를 때
    let tmp: number = options;
    if (value) {
      tmp = tmp - 1;
      SetOptions(tmp);
      setSelectedOption3(null);
    } else {
      tmp = tmp + 1;
      SetOptions(tmp);
      setSelectedOption3(key);
    }

    SetIsClickPrice(
      isClickPrice.map(item => {
        if (item.key === key) {
          return {...item, value: !value}; // 특정 키의 값을 수정
        }
        return item;
      }),
    );
  };

  const pressExhState = (key: string, value: boolean) => {
    //전시 진행상황 누를 때

    let tmp: number = options;
    if (value) {
      tmp = tmp - 1;
      SetOptions(tmp);
      setSelectedOption4(null);
    } else {
      tmp = tmp + 1;
      SetOptions(tmp);
      setSelectedOption4(key);
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

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      {/* onRequestClose={() => onClose}> */}
      <Container>
        <ModalHeader>
          <Title>{title}</Title>
          <TouchableOpacity onPress={() => handleConfirm(field, price, state)}>
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
            <SubTitle>{'전시 가격'}</SubTitle>
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
              {isClickState.map(({key, value}) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => pressExhState(key, value)}>
                  {value ? <Option>{key}</Option> : <UnOption>{key}</UnOption>}
                </TouchableOpacity>
              ))}
            </OptionContainer>
          </SubSection>
        </ModalBody>
        <ButtonSection>
          {isPossibleSearch ? (
            <TouchableOpacity
              onPress={() =>
                handleConfirm(selectedOption2, selectedOption3, selectedOption4)
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
/*const Container = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;*/

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between; // 양 끝으로 버튼 배치
  // align-items: center;
  //padding: ${hp(12)}px;
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
  //align-items: center;
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
  //align-items: last baseline;
  padding: ${wp(10)}px;
`;

const ModalBody = styled.View`
  flex: 1;
  flex-direction: column;
  // align-items: center;
  padding: ${wp(20)}px;
  padding-top: ${wp(10)}px;
`;

const SubTitle = styled.Text`
  //  flex: 1;
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
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
