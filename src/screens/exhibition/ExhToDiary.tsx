import React, {ReactNode, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import DiaryList from '~/components/diary/DiaryList';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import BackView from '~/components/common/BackView';

type RootStackParamList = {
  ExhToDiary: {diary: any};
};

type ExhDetailInfoScreenRouteProp = RouteProp<RootStackParamList, 'ExhToDiary'>;

interface Props {
  route: ExhDetailInfoScreenRouteProp;
}

const ExhToDiary: React.FC<Props> = ({route}) => {
  //  const navigation = useNavigation<RootStackNavigationProp>();

  const {diary} = route.params;
  const [diaryArr, setDiaryArr] = useState<any[]>([diary]);

  if (diary.length === 0) {
    return (
      <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다 >_<'} />
    );
  }

  return (
    <Container>
      <BackView line={false} children={null} />

      <DiaryList diaryList={diaryArr}></DiaryList>
    </Container>
  );
};
export default ExhToDiary;

/** style */

const Container = styled.View`
  // height: 30%;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
  /* justify-content: center;
  align-items: center; */
`;

const Title = styled.Text`
  font-size: ${fp(19)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;
