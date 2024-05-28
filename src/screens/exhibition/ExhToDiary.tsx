import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

type RootStackParamList = {
  ExhToDiary: {diaryId: number};
};

type ExhDetailInfoScreenRouteProp = RouteProp<RootStackParamList, 'ExhToDiary'>;

interface Props {
  route: ExhDetailInfoScreenRouteProp;
}

const ExhToDiary: React.FC<Props> = ({route}) => {
  //  const navigation = useNavigation<RootStackNavigationProp>();

  const {diaryId} = route.params;

  return (
    <Container>
      <Title>{diaryId}</Title>
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
