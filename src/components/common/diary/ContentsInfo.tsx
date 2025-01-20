import React, {useState} from 'react';
import styled from 'styled-components/native';
import {DEFAULT_TEXT} from '../colors';
import {ScrollView, StyleSheet} from 'react-native';
import {
  widthSizePercentage as wp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {AREA_FONT_SIZE, FONT_NAME} from '../style';
import {RichEditor} from 'react-native-pell-rich-editor';
import FontFamilyStylesheet from '~/assets/fonts/stylesheet';

interface ContentsProps {
  contents: string;
}

const ContentsInfo: React.FC<ContentsProps> = ({contents}) => {
  const [fontColor, setFontColor] = useState('#3c4045');

  const initialCSSText = {
    initialCSSText: `${FontFamilyStylesheet}`,
    // backgroundColor: '#f6eceb',
    contentCSSText: `font-family: omyu_pretty; font-size: ${AREA_FONT_SIZE}px; color: ${fontColor}; height: 100%;`,
  };
  return (
    <Container>
      {/* 내용 */}
      <ContentWrapper>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <RichEditor
            editorStyle={initialCSSText}
            initialContentHTML={contents}
            disabled={true}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            useContainer={false}
          />
        </ScrollView>
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

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  render: {
    fontFamily: FONT_NAME,
    color: DEFAULT_TEXT,
    fontSize: rf(17),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1.5),
  },
});
