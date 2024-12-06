import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import BackView from '~/components/common/BackView';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  useWriteMyDiaryActions,
  useWriteMyDiaryInfo,
} from '~/zustand/mydiary/writeMyDiary';
import {RootStackNavigationProp} from '~/App';
import {checkBlankInKeyword} from '~/utils/keyword';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {BACK_COLOR, LIGHT_GREY, MAIN_COLOR} from '~/components/common/colors';
import CustomTouchable from '~/components/common/CustomTouchable';
import {showToast} from '~/components/common/modal/toastConfig';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInputForm from '~/components/common/TextInputForm';
import StarRateSelector from '~/components/common/diary/StarRateSelector';
import SayingInputForm from '~/components/common/diary/SayingInputForm';
import ImageInputForm from '~/components/common/ImageInputForm';
import PublicSelector from '~/components/common/diary/PublicSelector';

const WriteMyDiaryInfoScreen = () => {
  const titleMaxInputLength = 20;
  const sayingMaxInputLength = 60;
  const navigation = useNavigation<RootStackNavigationProp>();
  const [titleKeyword, setTitleKeyword] = useState<string>('');
  const [starNum, setStarNum] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [sayingKeyword, setSayingKeyword] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const {
    updateforDetailInfo,
    updateTitle,
    updateRate,
    updateDiaryPrivate,
    updateThumbnail,
    updateSaying,
  } = useWriteMyDiaryActions();
  const writeMyDiaryInfo = useWriteMyDiaryInfo();

  useEffect(() => {
    setTitleKeyword(writeMyDiaryInfo.title ?? '');
    setStarNum(writeMyDiaryInfo.rate ?? 0.0);
    setIsPublic(writeMyDiaryInfo.diaryPrivate ?? true);
    setSayingKeyword(writeMyDiaryInfo.saying ?? '');
    // thumbnail
    setImageUri(writeMyDiaryInfo.thumbnail ?? undefined);
  }, []);

  const onClickNextButton = async () => {
    if (checkBlankInKeyword(titleKeyword)) {
      showToast('제목 작성해주세요.');
      return;
    }
    if (starNum == 0) {
      showToast('별점 선택해주세요.');
      return;
    }
    if (!sayingKeyword || checkBlankInKeyword(sayingKeyword)) {
      showToast('한마디 작성해주세요.');
      return;
    }
    // ??
    updateTitle(titleKeyword);
    updateRate(starNum);
    updateDiaryPrivate(isPublic);
    updateThumbnail(imageUri ?? null);
    updateSaying(sayingKeyword);
    //
    updateforDetailInfo(
      titleKeyword,
      starNum,
      isPublic,
      imageUri ?? null,
      sayingKeyword,
    );
    // 기록 내용 작성 페이지로 이동
    navigation.navigate('WriteMyDiaryContents');
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: BACK_COLOR}}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <BackView title="기록 추가" line={true} children={null} />
        <ContentsContainer>
          {/* 기록 정보 작성 */}
          {/* 제목 */}
          <TextInputForm
            title={'제목'}
            isEssential
            maxLen={titleMaxInputLength}
            keyword={titleKeyword}
            handleKeyword={setTitleKeyword}
          />
          <SecondSection>
            {/* 평점 */}
            <StarRateSelector starNum={starNum} handleStarNum={setStarNum} />
            {/* 공개여부 */}
            <PublicSelector isPublic={isPublic} handleIsPublic={setIsPublic} />
          </SecondSection>
          {/* 한마디 */}
          <SayingInputForm
            maxLen={sayingMaxInputLength}
            keyword={sayingKeyword}
            handleKeyword={setSayingKeyword}
          />
          {/* 대표사진 */}
          <ImageInputForm
            title={'대표사진'}
            image={imageUri}
            handleImage={setImageUri}
          />
          {/* 다음 버튼 */}
          <CustomTouchable onPress={onClickNextButton}>
            <NextButton moveNext={true}>다음</NextButton>
          </CustomTouchable>
        </ContentsContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default WriteMyDiaryInfoScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-top: ${hp(1.6)}px;
  padding-bottom: ${hp(1.6)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
  gap: ${hp(1.6)}px;
`;

const SecondSection = styled.View`
  width: 100%;
  flex-direction: row;
  gap: ${wp(2.9)}px;
`;

interface NextButtonProps {
  moveNext: boolean;
}

const NextButton = styled.Text<NextButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.moveNext ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
