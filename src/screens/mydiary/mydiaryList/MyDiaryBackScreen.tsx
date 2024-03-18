import React from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {Shadow} from 'react-native-shadow-2';
import ContentsInfo from '~/components/mydiary/ContentsInfo';
import {useMyDiaryInfo} from '~/zustand/mydiary/mydiary';
import {
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';

const MyDiaryBackScreen = () => {
  const myDiaryInfo = useMyDiaryInfo();

  return (
    <Container>
      <BackView children={null} />
      <ContentsContainer>
        <Shadow distance={5}>
          <Contents>
            <ContentsInfo
              contents={myDiaryInfo.contents}
              writeDate={myDiaryInfo.writeDate}
            />
          </Contents>
        </Shadow>
      </ContentsContainer>
    </Container>
  );
};

export default MyDiaryBackScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-bottom: ${hp(5)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  background-color: white;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: ${hp(20)}px;
  padding-bottom: ${hp(20)}px;
  padding-left: ${wp(30)}px;
  padding-right: ${wp(30)}px;
`;
