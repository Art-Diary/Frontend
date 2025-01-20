import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import RenderHtml from 'react-native-render-html';
import {MoreContentsIcon, ReduceContentsIcon} from '~/components/common/icon';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {DASH_WIDTH, FONT_NAME} from '~/components/common/style';

interface Props {
  intro: string | undefined;
  source: string;
  modalOpen?: boolean;
}

const ExhDetailInfoIntro: React.FC<Props> = ({intro, source, modalOpen}) => {
  const [isMoreContent, setIsMoreContent] = useState<boolean>(false);
  const memoizedHtmlContent = useMemo(() => {
    return intro;
  }, [intro]);

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
      <ColWrapper>
        <Title>소개</Title>
      </ColWrapper>
      {!memoizedHtmlContent ? (
        <NotIntroText>전시회 소개글이 없습니다.</NotIntroText>
      ) : (
        renderHtmlContent
      )}
      <Source>출처: ©{source}</Source>
      {/* 아이콘 */}
      {memoizedHtmlContent && memoizedHtmlContent.length > 300 && (
        <ColWrapper2>
          <ArrowButton onPress={isMoreContent ? backToIntro : showMore}>
            {isMoreContent ? <ReduceContentsIcon /> : <MoreContentsIcon />}
          </ArrowButton>
        </ColWrapper2>
      )}
    </IntroduceView>
  );
};

export default ExhDetailInfoIntro;

/** style */
const ColWrapper2 = styled.View`
  align-items: center;
`;

const ColWrapper = styled.View`
  align-items: center;
  padding-bottom: ${hp(0.5)}px;
`;

const Title = styled.Text`
  font-size: ${rf(19)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

const Source = styled.Text`
  font-size: ${rf(13)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  padding-right: ${wp(2)}px;
  text-align: right;
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
    lineHeight: wp(5.8),
  },
});
