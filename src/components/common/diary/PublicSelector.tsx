import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  AREA_FONT_SIZE,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {BACK_COLOR, DEFAULT_TEXT, MAIN_COLOR} from '~/components/common/colors';
import CustomTouchable from '../CustomTouchable';
import {PrivateToggleIcon, PublicToggleIcon} from '../icon';

interface PublicSelectorProps {
  isPublic: boolean;
  handleIsPublic: (isPublic: boolean) => void;
}

const PublicSelector: React.FC<PublicSelectorProps> = ({
  isPublic,
  handleIsPublic,
}) => {
  const changeToggle = () => {
    handleIsPublic(!isPublic);
  };

  return (
    <Container>
      {/* section 제목 */}
      <SectionName>공개 여부</SectionName>
      <SectionWapper></SectionWapper>
      {/* section 내용 */}
      <BodyWrapper>
        <CustomTouchable onPress={changeToggle}>
          {isPublic ? <PublicToggleIcon /> : <PrivateToggleIcon />}
        </CustomTouchable>
      </BodyWrapper>
    </Container>
  );
};

export default PublicSelector;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  background-color: ${BACK_COLOR};
  justify-content: space-between;
  /* gap: ${wp(1.3)}px; */
  align-items: center;
`;

const SectionWapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${wp(1)}px;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-left: ${wp(2)}px;
`;

const BodyWrapper = styled.View`
  flex-direction: row;
  border-radius: ${BUTTON_RADIUS}px;
  align-items: center;
  padding: ${wp(2.9)}px;
  padding-left: ${wp(6)}px;
  padding-right: ${wp(6)}px;
  gap: ${wp(0.8)}px;
`;
