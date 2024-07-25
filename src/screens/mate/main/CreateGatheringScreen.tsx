import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import {Keyboard} from 'react-native';
import {showToast} from '~/components/common/modal/toastConfig';
import {useCreateGathering} from '~/api/queries/gathering';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
} from '~/components/common/colors';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';

// [WORD_LIMIT]
const CreateGatheringScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [gahteringKeyword, setGahteringKeyword] = useState<string>('');
  const {
    mutate: createGathering,
    isLoading,
    isError,
    isSuccess,
  } = useCreateGathering(gahteringKeyword);

  useEffect(() => {
    if (isError) {
      showToast('모임 만들기를 실패했습니다.');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      showToast('모임 만들기 성공 :)');
      navigation.goBack();
    }
  }, [isError, isLoading, isSuccess]);

  const onChangeGathering = useCallback((text: string) => {
    setGahteringKeyword(text);
  }, []);

  const onPressCreate = () => {
    if (checkBlankInKeyword(gahteringKeyword)) {
      showToast('모임 이름을 다시 작성해주세요.');
    } else {
      createGathering();
    }
    Keyboard.dismiss();
  };

  return (
    <Container>
      {/* header */}
      <BackView title="모임 추가" line={true} />
      {/* body */}
      <Contents>
        <ContentWrapper>
          <ContentText>모임 이름</ContentText>
          <WriteView>
            <GatheringInput
              multiline={false}
              placeholderTextColor="#D3D3D3"
              placeholder={'새로운 모임 이름을 작성해주세요.'}
              onChangeText={onChangeGathering}
              value={gahteringKeyword}
            />
          </WriteView>
        </ContentWrapper>
        {/* 모임 만들기 버튼 */}
        <CustomTouchable onPress={onPressCreate}>
          <CreateButton>모임 만들기</CreateButton>
        </CustomTouchable>
      </Contents>
      {isLoadingOpen && <LoadingModal message={'모임 만들기 처리 중'} />}
    </Container>
  );
};

export default CreateGatheringScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
  padding: ${wp(3.3)}px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  gap: ${wp(3.8)}px;
`;

const ContentText = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const CreateButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const WriteView = styled.View`
  border-width: ${wp(0.33)}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
`;

const GatheringInput = styled.TextInput`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
`;
