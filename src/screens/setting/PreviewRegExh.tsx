import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
  BORDER_COLOR,
} from '~/components/common/colors';
import {FONT_NAME, BACK_FONT_SIZE, DASH_WIDTH} from '~/components/common/style';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';

type RootStackParamList = {
  PreviewRegExh: {rExhId: number};
};

type PreviewRegExhProp = RouteProp<RootStackParamList, 'PreviewRegExh'>;

interface Props {
  route: PreviewRegExhProp;
}

const PreviewRegExh: React.FC<Props> = ({route}) => {
  const {rExhId} = route.params;

  return (
    <Container>
      <RExhNumber>{rExhId}</RExhNumber>
    </Container>
  );
};

export default PreviewRegExh;

/** style */

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  width: 100%;
`;

const RExhNumber = styled.Text`
  font-size: ${rf(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;
