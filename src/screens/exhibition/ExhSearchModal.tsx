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

interface ExhSearchProps {
  title: string; // title prop의 타입을 문자열로 지정
  x: string;
  isVisible: boolean;
  //manyOptions: string[];
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
  // manyOptions,
  onClose,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);

  //전시 지역 const exhLocation: string[] = ['서울', '부산', '대구'];
  const exhField: string[] = [
    '사진',
    '회화',
    '조각',
    '공예',
    '미디어아트',
    '그외',
  ]; //전시 부문
  const exhPrice: string[] = ['무료', '유료', '20000원 이하']; //전시 가격
  const exhState: string[] = ['진행중', '예정', '종료']; //전시 진행상황
  const [isClickField, SetIsClickField] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isClickPrice, SetIsClickPrice] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [isClickState, SetIsClickState] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [isPossibleSearch, SetIsPossibleSearch] = useState<boolean>(false);
  const [options, SetOptions] = useState<number>(0); //선택된 옵션 개수 -> 버튼 색변화

  useEffect(() => {
    if (options > 0) SetIsPossibleSearch(true);
    else SetIsPossibleSearch(false);
  }, [options]);

  const handleConfirm = () => {
    //데이터 전달
    onClose(selectedOption2, selectedOption3, selectedOption4);
  };

  const pressExhField = (index: number, item: string) => {
    //전시 분야 누를 때

    let tmp: number = options;
    if (isClickField[index]) {
      tmp = tmp - 1;
      SetOptions(tmp);
    } else {
      tmp = tmp + 1;
      SetOptions(tmp);
    }

    setSelectedOption2(item);
    const updated = isClickField.map((item: any, tmpIndex: number) =>
      tmpIndex === index ? !item : item,
    );

    SetIsClickField(updated);
    console.log(options);
  };

  const pressExhPrice = (index: number, item: string) => {
    //전시 가격 누를 때
    let tmp: number = options;
    if (isClickField[index]) {
      tmp = tmp - 1;
      SetOptions(tmp);
    } else {
      tmp = tmp + 1;
      SetOptions(tmp);
    }

    setSelectedOption3(item);
    const updated = isClickPrice.map((item: any, tmpIndex: number) =>
      tmpIndex === index ? !item : item,
    );

    SetIsClickPrice(updated);
  };

  const pressExhState = (index: number, item: string) => {
    //전시 진행상황 누를 때

    let tmp: number = options;
    if (isClickField[index]) {
      tmp = tmp - 1;
      SetOptions(tmp);
    } else {
      tmp = tmp + 1;
      SetOptions(tmp);
    }

    setSelectedOption4(item);
    const updated = isClickState.map((item: any, tmpIndex: number) =>
      tmpIndex === index ? !item : item,
    );

    SetIsClickState(updated);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose}>
      <Container>
        <ModalHeader>
          <Title>{title}</Title>
          <TouchableOpacity onPress={() => onClose}>
            <BackButton>{x}</BackButton>
          </TouchableOpacity>
        </ModalHeader>
        <ModalBody>
          <SubSection>
            <SubTitle>{'전시 부문'}</SubTitle>
            <OptionContainer>
              {exhField.map((item: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => pressExhField(index, item)}>
                  {isClickField[index] ? (
                    <Option>{item}</Option>
                  ) : (
                    <UnOption>{item}</UnOption>
                  )}
                </TouchableOpacity>
              ))}
            </OptionContainer>
          </SubSection>
          <SubSection>
            <SubTitle>{'전시 가격'}</SubTitle>
            <OptionContainer>
              {exhPrice.map((item: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => pressExhPrice(index, item)}>
                  {isClickPrice[index] ? (
                    <Option>{item}</Option>
                  ) : (
                    <UnOption>{item}</UnOption>
                  )}
                </TouchableOpacity>
              ))}
            </OptionContainer>
          </SubSection>
          <SubSection>
            <SubTitle>{'전시 진행상황'}</SubTitle>
            <OptionContainer>
              {exhState.map((item: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => pressExhState(index, item)}>
                  {isClickState[index] ? (
                    <Option>{item}</Option>
                  ) : (
                    <UnOption>{item}</UnOption>
                  )}
                </TouchableOpacity>
              ))}
            </OptionContainer>
          </SubSection>
        </ModalBody>
        <ButtonSection>
          {isPossibleSearch ? (
            <TouchableOpacity onPress={handleConfirm}>
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
