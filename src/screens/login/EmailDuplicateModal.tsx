import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {LoginUserParams} from '~/api/auth';
import {useSeparateSocialLogin, useUniteSocialLogin} from '~/api/queries/auth';
import CustomTouchable from '~/components/common/CustomTouchable';
import {
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {DEFAULT_TEXT, LIGHT_GREY, MAIN_COLOR} from '~/components/common/colors';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {useUserActions} from '~/zustand/auth/auth';

interface EmailDuplicateModalProps {
  handleCloseModal: () => void;
  loginUserInfo: LoginUserParams;
}

const EmailDuplicateModal: React.FC<EmailDuplicateModalProps> = ({
  handleCloseModal,
  loginUserInfo,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {updateAuthInfo} = useUserActions();
  const {
    mutate: uniteSocialLogin,
    isLoading: uniteLoading,
    isError: uniteError,
    isSuccess: uniteSuccess,
    data: uniteData,
  } = useUniteSocialLogin();
  const {
    mutate: separateSocialLogin,
    isLoading: separateLoading,
    isError: separateError,
    isSuccess: separateSuccess,
    data: separateData,
  } = useSeparateSocialLogin();

  const updateUserInfo = (data: any) => {
    updateAuthInfo({...data, role: data.roleType});
  };

  useEffect(() => {
    if (uniteError) {
      showToast('에러 발생 ;(');
      handleCloseModal();
    }
    if (uniteLoading) {
      setIsLoadingOpen(true);
    }
    if (!uniteLoading) {
      setIsLoadingOpen(false);
    }
    if (uniteSuccess) {
      const data = uniteData.data;
      updateUserInfo(data);
      handleCloseModal();
      if (data.initInfo) {
        navigation.navigate('Main', {screen: 'Diary'});
      } else {
        navigation.navigate('InitProfile');
      }
    }
  }, [uniteLoading, uniteError, uniteSuccess]);

  useEffect(() => {
    if (separateError) {
      showToast('에러 발생 ;(');
      handleCloseModal();
    }
    if (separateLoading) {
      setIsLoadingOpen(true);
    }
    if (!separateLoading) {
      setIsLoadingOpen(false);
    }
    if (separateSuccess) {
      const data = separateData.data;
      updateUserInfo(data);
      handleCloseModal();
      if (data.initInfo) {
        navigation.navigate('Main', {screen: 'Diary'});
      } else {
        navigation.navigate('InitProfile');
      }
    }
  }, [separateLoading, separateError, separateSuccess]);

  const socialLogin = (isUnite: boolean) => {
    if (isUnite) {
      uniteSocialLogin(loginUserInfo);
    } else {
      separateSocialLogin(loginUserInfo);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={handleCloseModal}>
      <Pressable
        style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
        onPress={handleCloseModal}
      />
      <Container>
        <Contents>
          <MessageView>
            <Message>동일한 이메일로 이미 로그인 한 적이 있습니다.</Message>
            <MessageView row>
              <Message>통합을 원하시면 </Message>
              <Message color="main">통합</Message>
              <Message>을,</Message>
            </MessageView>
            <Message>통합을 원하지 않으시면 "분리"를 눌러주세요.</Message>
          </MessageView>
          <TouchView>
            <ButtonDetailSection>
              <CustomTouchable onPress={() => socialLogin(false)}>
                <ButtonView>분리</ButtonView>
              </CustomTouchable>
            </ButtonDetailSection>
            <ButtonDetailSection>
              <CustomTouchable onPress={() => socialLogin(true)}>
                <ButtonView mainButton>통합</ButtonView>
              </CustomTouchable>
            </ButtonDetailSection>
          </TouchView>
        </Contents>
        {isLoadingOpen && <LoadingModal message={'로그인 시도 중 :)'} />}
      </Container>
    </Modal>
  );
};

export default EmailDuplicateModal;

/** style */
const Container = styled.View`
  justify-content: flex-end;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Contents = styled.View`
  background-color: white;
  border-top-left-radius: ${wp(5)}px;
  border-top-right-radius: ${wp(5)}px;
  padding: ${hp(2.4)}px;
  width: 100%;
`;

interface MessageViewProps {
  row: boolean;
}

const MessageView = styled.View<MessageViewProps>`
  flex-direction: ${(props: MessageViewProps) =>
    props.row ? `row` : `column`};
  padding: ${(props: MessageViewProps) => (props.row ? `0px` : `${hp(7)}px`)};
  padding-top: ${(props: MessageViewProps) =>
    props.row ? `${hp(2)}px` : `${hp(7)}px`};
  align-items: center;
  justify-content: center;
  /* border-width: 1px; */
`;

interface MessageProps {
  color: string;
}

const Message = styled.Text<MessageProps>`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${(props: MessageProps) =>
    props.color === 'main' ? `${MAIN_COLOR}` : `${DEFAULT_TEXT}`};
  font-family: ${FONT_NAME};
`;

const TouchView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${wp(1.5)}px;
`;

const ButtonDetailSection = styled.View`
  width: 50%;
`;

interface ButtonViewProps {
  mainButton: boolean;
}

const ButtonView = styled.Text<ButtonViewProps>`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${(props: ButtonViewProps) =>
    props.mainButton ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;
