import React from 'react';
import styled from 'styled-components/native';
import {DEFAULT_TEXT} from '../colors';
import {StyleSheet} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  widthSizePercentage as wp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME} from '../style';

interface ContentsProps {
  contents: string;
}

const ContentsInfo: React.FC<ContentsProps> = ({contents}) => {
  return (
    <Container>
      {/* 내용 */}
      <ContentWrapper>
        <ContentScroll>
          <RenderHtml
            systemFonts={[FONT_NAME]}
            baseStyle={styles.render}
            contentWidth={wp(93)}
            source={{html: contents}}
          />
        </ContentScroll>
      </ContentWrapper>
    </Container>
  );
};

export default ContentsInfo;

/** style */
const Container = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentWrapper = styled.View`
  height: 100%;
  width: 100%;
`;

const ContentScroll = styled.ScrollView`
  height: 100%;
  width: 100%;
`;

const styles = StyleSheet.create({
  render: {
    fontFamily: FONT_NAME,
    color: DEFAULT_TEXT,
    fontSize: rf(17),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1.5),
  },
});
