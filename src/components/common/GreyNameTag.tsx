import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME} from './style';
import {responsiveScreenWidth as rw} from 'react-native-responsive-dimensions';
import GreyTag from '../../assets/name_tag/grey_tag.svg';
import LoginTag from '../../assets/name_tag/login_tag.svg';
import {DARK_GREY} from '~/components/common/colors';

interface TagProps {
  content: string;
  children?: ReactNode;
  login?: boolean;
  handleTouch?: () => void;
}

const GreyNameTag: React.FC<TagProps> = ({
  content,
  children,
  login,
  handleTouch,
}) => {
  var height = rw(13.2);
  if (login) {
    height = rw(14.3);
  }
  return (
    <Container>
      {login ? (
        <LoginTag
          width={504 * (height / 86)} // Adjust width according to height ratio
          height={height}
        />
      ) : (
        <GreyTag
          width={2800 * (height / 400)} // Adjust width according to height ratio
          height={height}
        />
      )}
      <WordContainer>
        <TouchView activeOpacity={0.6} onPress={handleTouch}>
          {children}
          <TitleText>{content}</TitleText>
        </TouchView>
      </WordContainer>
    </Container>
  );
};

export default GreyNameTag;

/** style */
const Container = styled.View`
  position: relative;
`;

const WordContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const TouchView = styled.TouchableOpacity`
  flex: 1;
  padding-left: ${wp(9)}px;
  flex-direction: row;
  align-items: center;
  gap: ${wp(13)}px;
`;

const TitleText = styled.Text`
  font-size: ${rf(14.8)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;
