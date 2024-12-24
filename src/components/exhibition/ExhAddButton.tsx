import React from 'react';
import styled from 'styled-components/native';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {ExhPlusIcon} from '~/components/common/icon';
import CustomTouchable from '~/components/common/CustomTouchable';

const ExhAddButton = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressButton = () => {
    navigation.navigate('RegisterNewExh');
  };

  return (
    <TopLayer>
      <EmptyHeartContent>
        <CustomTouchable onPress={onPressButton}>
          <ExhPlusIcon />
        </CustomTouchable>
      </EmptyHeartContent>
    </TopLayer>
  );
};

export default ExhAddButton;

/** style */
const TopLayer = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${wp(2.9)}px;
  padding-bottom: ${wp(3.9)}px;
  padding-right: ${wp(5)}px;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: flex-end;
`;

const EmptyHeartContent = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
