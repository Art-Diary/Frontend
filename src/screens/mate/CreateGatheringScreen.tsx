import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {
  heightPercentage as hp,
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import {Keyboard, TouchableOpacity} from 'react-native';
import {showToast} from '~/components/common/modal/toastConfig';
import {useCreateGathering} from '~/api/queries/gathering';
import LoadingModal from '~/components/common/modal/LoadingModal';

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
    Keyboard.dismiss();
    createGathering();
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
            <WriteScroll>
              <GatheringInput
                multiline={true}
                placeholderTextColor="#D3D3D3"
                placeholder={'새로운 모임 이름을 작성해주세요.'}
                onChangeText={onChangeGathering}
                value={gahteringKeyword}
              />
            </WriteScroll>
          </WriteView>
        </ContentWrapper>
        {/* 모임 만들기 버튼 */}
        <TouchableOpacity onPress={onPressCreate}>
          <CreateButton>모임 만들기</CreateButton>
        </TouchableOpacity>
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
  background-color: #f6f6f6;
  padding-top: ${wp(12)}px;
  padding-left: ${wp(12)}px;
  padding-right: ${wp(12)}px;
  gap: 10px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  gap: 15px;
`;

const ContentText = styled.Text`
  font-size: ${fp(21)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const CreateButton = styled.Text`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: #ff6f61;
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;

const WriteView = styled.View`
  border-width: 1.5px;
  border-color: #d3d3d3;
  border-radius: 5px;
`;

const WriteScroll = styled.ScrollView``;

const GatheringInput = styled.TextInput`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  border-color: #d3d3d3;
  border-radius: 10px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
`;
