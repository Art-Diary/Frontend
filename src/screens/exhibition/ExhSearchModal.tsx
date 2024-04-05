import React, {useEffect, useState} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {Modal, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface ExhSearchProps {
  title: string; // title prop의 타입을 문자열로 지정
  x: string;
}

const ExhSearchModal: React.FC<ExhSearchProps> = ({title, x}) => {
  return (
    <Modal animationType="fade" transparent={true}>
      <Container>
        <ModalHeader>
          <Title>{title}</Title>
          <BackButton>{x}</BackButton>
        </ModalHeader>
        <ModalBody>
          <SubSection>
            <SubTitle>{'전시 부문'}</SubTitle>
            <OptionContainer>
              <Option>{'사진'}</Option>
              <Option>{'회화'}</Option>
              <Option>{'조각'}</Option>
              <Option>{'공예'}</Option>
              <Option>{'미디어아트'}</Option>
            </OptionContainer>
            <OptionContainer>
              <Option>{'그외'}</Option>
            </OptionContainer>
          </SubSection>
          <SubSection>
            <SubTitle>{'전시 가격'}</SubTitle>
            <OptionContainer>
              <Option>{'무료'}</Option>
              <Option>{'유료'}</Option>
              <Option>{'20000원 이하'}</Option>
            </OptionContainer>
          </SubSection>
          <SubSection>
            <SubTitle>{'전시 진행상황'}</SubTitle>
            <OptionContainer>
              <Option>{'진행중'}</Option>
              <Option>{'예정'}</Option>
              <Option>{'종료'}</Option>
            </OptionContainer>
          </SubSection>
        </ModalBody>
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
  flex-direction: row;
  padding: ${wp(10)}px;
  padding-left: ${wp(0)}px;
  padding-bottom: ${wp(0)}px;
  gap: 10px;
`;

const Option = styled.Text`
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
