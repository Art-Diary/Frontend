import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {LoginUserParams} from '~/api/auth';
import {useSeparateSocialLogin, useUniteSocialLogin} from '~/api/queries/auth';
import CustomTouchable from '~/components/common/CustomTouchable';
import {
  heightSizePercentage as hp,
  widthSizePercentage as wp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import DecisionModal from '~/components/common/modal/DecisionModal';
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
      showToast('다시 시도해주세요.');
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
  }, [uniteError, uniteSuccess]);

  useEffect(() => {
    if (separateError) {
      showToast('다시 시도해주세요.');
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
  }, [separateError, separateSuccess]);

  const socialLogin = (isUnite: boolean) => {
    if (isUnite) {
      uniteSocialLogin(loginUserInfo);
    } else {
      separateSocialLogin(loginUserInfo);
    }
  };

  return (
    <DecisionModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={uniteLoading || separateLoading} />
      <Contents>
        <MsgWrapper>
          <Message isMainMsg>
            해당 이메일 주소로 {'\n'}이미 등록된 계정이 있습니다.
          </Message>
          <Message>
            통합을 원하시면 <HighlightMain>통합</HighlightMain>을,{'\n'}새
            계정을 원하시면 <HighlightSub>분리</HighlightSub>를 눌러주세요.
          </Message>
        </MsgWrapper>
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
    </DecisionModal>
  );
};

export default EmailDuplicateModal;

/** style */
const Contents = styled.View`
  flex: 1px;
  justify-content: space-between;
  padding-top: ${hp(2)}px;
  padding-bottom: ${hp(2)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
`;

const MsgWrapper = styled.View`
  flex: 1px;
  flex-direction: column;
  width: 100%;
  padding-top: ${hp(3)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  gap: ${hp(2)}px;
`;

interface MessageProps {
  color: string;
  isMainMsg: boolean;
}

const Message = styled.Text<MessageProps>`
  font-size: ${(props: MessageProps) =>
    props.isMainMsg ? `${rf(19)}px` : `${rf(14.5)}px`};
  color: ${(props: MessageProps) =>
    props.isMainMsg ? `${DEFAULT_TEXT}` : `${MIDDLE_GREY}`};
  font-family: ${FONT_NAME};
`;

const HighlightMain = styled.Text`
  color: ${MAIN_COLOR};
`;

const HighlightSub = styled.Text`
  color: ${DEFAULT_TEXT};
`;

const TouchView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${wp(1.5)}px;
`;

const ButtonDetailSection = styled.View`
  width: 49%;
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
