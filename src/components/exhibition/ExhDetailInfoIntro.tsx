import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import RenderHtml from 'react-native-render-html';
import {MoreContentsIcon, ReduceContentsIcon} from '~/components/common/icon';
import {DEFAULT_TEXT, LIGHT_GREY} from '~/components/common/colors';
import {DASH_WIDTH, FONT_NAME} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';

interface Props {
  intro: string | undefined;
  modalOpen?: boolean;
}

const ExhDetailInfoIntro: React.FC<Props> = ({intro, modalOpen}) => {
  const [isMoreContent, setIsMoreContent] = useState<boolean>(false);
  const memoizedHtmlContent = useMemo(() => intro, [intro]);
  //   const [tmp, setTmp] = useState<string>( // 소개 부분 [변경 예정]
  //     'The Page Gallery is pleased to announce a solo exhibition by German artist André Butzer from November 9 to December 30. This will be the first solo exhibition in Asia in three years and the first for Korean audiences since Yuz Museum in Shanghai in 2020. The exhibition, which will be held at The Page Gallery East, consists of 15 major new works that span the artist"s oeuvre over the past 30 years. At the end of the 20th century, with the end of the Cold War and the sweep of industrialization.',
  //   );

  const showMore = () => {
    setIsMoreContent(true);
  };

  const backToIntro = () => {
    setIsMoreContent(false);
  };

  const renderHtmlContent = useMemo(
    () => (
      <RenderHtml
        systemFonts={[FONT_NAME]}
        baseStyle={styles.render}
        contentWidth={wp(93)}
        source={{
          html: !memoizedHtmlContent
            ? '전시회 소개글이 없습니다.'
            : memoizedHtmlContent.length > 300 && !isMoreContent
              ? memoizedHtmlContent.substring(0, 300) + '...'
              : memoizedHtmlContent,
        }}
      />
    ),
    [memoizedHtmlContent, isMoreContent],
  );

  return (
    <IntroduceView modalOpen={modalOpen}>
      <Title>{'소개'}</Title>
      {!memoizedHtmlContent ? (
        <NotIntroText>전시회 소개글이 없습니다.</NotIntroText>
      ) : (
        renderHtmlContent
      )}

      {/* 아이콘 */}
      {memoizedHtmlContent && memoizedHtmlContent.length > 300 && (
        <ArrowButton onPress={isMoreContent ? backToIntro : showMore}>
          {isMoreContent ? <ReduceContentsIcon /> : <MoreContentsIcon />}
        </ArrowButton>
      )}
    </IntroduceView>
  );
};

export default ExhDetailInfoIntro;

/** style */
const Title = styled.Text`
  font-size: ${rf(19)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

const NotIntroText = styled.Text`
  font-size: ${rf(15)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;

const ArrowButton = styled.TouchableOpacity`
  padding: ${wp(2)}px;
`;

// introduce section
interface IntroduceProps {
  modalOpen: boolean;
}

const IntroduceView = styled.View<IntroduceProps>`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: ${wp(5.2)}px;
  padding-bottom: ${wp(5.2)}px;
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
  border-style: dashed;
  border-bottom-width: ${(props: IntroduceProps) =>
    !props.modalOpen ? `${DASH_WIDTH}px` : `0px`};
  border-bottom-color: ${LIGHT_GREY};
`;

const styles = StyleSheet.create({
  render: {
    fontFamily: FONT_NAME,
    color: DEFAULT_TEXT,
    fontSize: rf(15),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1.5),
  },
});
