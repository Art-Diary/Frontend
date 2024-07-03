import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {TouchableOpacity} from 'react-native';
import {useDeleteUser} from '~/api/queries/auth';
import {showToast} from '~/components/common/modal/toastConfig';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const LeaveScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [reasonKeyword, setReasonKeyword] = useState<string>('');
  const {
    mutate: deleteUser,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteUser(reasonKeyword);

  useEffect(() => {
    if (isError) {
      showToast('탈퇴를 실패했습니다.');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      showToast('탈퇴 성공 :(');
      // TODO 나중에 로그아웃 구체적으로 하기
      AsyncStorage.removeItem('userId');
      // 로그인 페이지로 이동
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, [isError, isLoading, isSuccess]);

  const onChangeReason = useCallback((text: string) => {
    setReasonKeyword(text);
  }, []);

  const onPressLeave = () => {
    deleteUser();
  };

  return (
    <Container>
      <BackView title="회원 탈퇴" line={true} />

      {/* body */}
      <Contents>
        <ContentColumn>
          <SectionName>탈퇴 이유</SectionName>
          <ReasonView>
            <ReasonScroll>
              <ReasonInput
                multiline={true}
                placeholderTextColor="#D3D3D3"
                placeholder={'탈퇴 이유를 작성해주세요.'}
                onChangeText={onChangeReason}
                value={reasonKeyword}
              />
            </ReasonScroll>
          </ReasonView>
        </ContentColumn>
        {/* 탈퇴 버튼 */}
        {reasonKeyword !== '' ? (
          <TouchableOpacity onPress={onPressLeave}>
            <LeaveButton leave={true}>탈퇴</LeaveButton>
          </TouchableOpacity>
        ) : (
          <LeaveButton leave={false}>탈퇴</LeaveButton>
        )}
      </Contents>
      {isLoadingOpen && <LoadingModal message={'탈퇴 처리 중 :('} />}
    </Container>
  );
};

export default LeaveScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${BACK_COLOR};
  padding: ${wp(4)}px;
`;

const ContentColumn = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: ${wp(4)}px;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const ReasonView = styled.View`
  border-width: ${wp(0.3)}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${wp(1.5)}px;
  height: ${hp(40)}px;
`;

const ReasonScroll = styled.ScrollView``;

const ReasonInput = styled.TextInput`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
`;

interface LeaveButtonProps {
  leave: boolean;
}

const LeaveButton = styled.Text<LeaveButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: LeaveButtonProps) =>
    props.leave ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
