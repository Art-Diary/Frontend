import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {TouchableOpacity} from 'react-native';
import {useDeleteUser} from '~/api/queries/auth';
import {showToast} from '~/components/common/modal/toastConfig';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  background-color: #f6f6f6;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
  padding-top: ${hp(10)}px;
  padding-bottom: ${hp(10)}px;
`;

const ContentColumn = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: ${hp(10)}px;
`;

const SectionName = styled.Text`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const ReasonView = styled.View`
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 5px;
  height: 30%;
`;

const ReasonScroll = styled.ScrollView``;

const ReasonInput = styled.TextInput`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  border-color: #d3d3d3;
  border-radius: 10px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
`;

interface LeaveButtonProps {
  leave: boolean;
}

const LeaveButton = styled.Text<LeaveButtonProps>`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: ${(props: LeaveButtonProps) =>
    props.leave ? '#ff6f61' : '#D3D3D3'};
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;
