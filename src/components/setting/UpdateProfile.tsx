import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import BackView from '~/components/common/BackView';
import {useUpdateUserInfo} from '~/api/queries/auth';
import {showToast} from '~/components/common/modal/toastConfig';
import LoadingModal from '~/components/common/modal/LoadingModal';
import EditNickname from '~/components/setting/EditNickname';
import EditArtCategory from '~/components/setting/EditArtCategory';
import EditPicture from '~/components/setting/EditPicture';
import {useUserActions} from '~/zustand/auth/auth';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
} from '../common/colors';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '../common/style';
import {GoogleLogoIcon, KakaoLogoIcon, NaverLogoIcon} from '../common/icon';
import {changeImageSize} from '~/utils/resizeImage';
import CustomTouchable from '../common/CustomTouchable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native';

type InitProfile = {
  favoriteArt: string;
  nickname: string;
  profile: string | undefined;
  email: string;
  providerType: string;
};

type UpdateProfileMessage = {
  errorMsg: string;
  successMsg: string;
};

interface UpdateProfileProps {
  title: string;
  initProfile: InitProfile;
  messages: UpdateProfileMessage;
  navigateTo: string;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({
  title,
  initProfile,
  messages,
  navigateTo,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateAuthInfo} = useUserActions();
  const [art, setArt] = useState<string>(initProfile.favoriteArt);
  const [nicknameKeyword, setNicknameKeyword] = useState<string>(
    initProfile.nickname,
  );
  const [imageUri, setImageUri] = useState<string | undefined>(
    initProfile.profile,
  );
  const [isVerified, setIsVerified] = useState<boolean>(true);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {
    mutate: updateUserInfo,
    isLoading,
    isError,
    isSuccess,
    data: resData,
  } = useUpdateUserInfo();

  useEffect(() => {
    if (isError) {
      showToast(messages.errorMsg);
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      const data = resData.data;

      updateAuthInfo({
        userId: data.userId,
        nickname: data.nickname,
        email: data.email,
        profile: data.profile,
        favoriteArt: data.favoriteArt,
        alarm1: data.alarm1,
        alarm2: data.alarm2,
        alarm3: data.alarm3,
        providerType: data.providerType,
        role: data.roleType,
      });
      showToast(messages.successMsg);
      if (navigateTo === 'back') {
        navigation.goBack();
      } else if (navigateTo === 'Main') {
        navigation.navigate('Main');
      }
    }
  }, [isError, isLoading, isSuccess]);

  const onPressComplete = async () => {
    if (!(nicknameKeyword !== '' && art !== '' && isVerified)) {
      if (nicknameKeyword === '') {
        showToast('닉네임을 작성해주세요.');
      } else if (art === '') {
        showToast('좋아하는 전시 분야를 선택해주세요.');
      } else if (!isVerified) {
        showToast('닉네임 중복 확인을 해주세요.');
      }
      return;
    }
    const formData = new FormData();

    formData.append('nickname', nicknameKeyword);
    formData.append('favoriteArt', art);

    if (imageUri && imageUri.indexOf('file:///') !== -1) {
      const resultResizedImage = await changeImageSize(imageUri);
      formData.append('profile', resultResizedImage);
    }
    updateUserInfo(formData);
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: BACK_COLOR}}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <BackView title={title} line={true} />

        {/* body */}
        <Contents>
          {/* 닉네임 */}
          <EditNickname
            getNickname={nicknameKeyword}
            setNickname={setNicknameKeyword}
            isVerified={isVerified}
            setIsVerified={setIsVerified}
          />
          {/* 좋아하는 전시 분야 */}
          <EditArtCategory getValue={art} setValue={setArt} />
          {/* 프로필 */}
          <EditPicture imageUri={imageUri} setImageUri={setImageUri} />
          {/* 이메일 */}
          <ContentColumn>
            <SectionName>이메일</SectionName>
            <BoxView color={true}>
              {initProfile.providerType === 'naver' ? (
                <NaverLogoIcon customHeight={2.6} />
              ) : initProfile.providerType === 'gmail' ||
                initProfile.providerType === 'google' ? (
                <GoogleLogoIcon customHeight={2.6} />
              ) : initProfile.providerType === 'kakao' ? (
                <KakaoLogoIcon customHeight={2.6} />
              ) : (
                <></>
              )}
              <EmailText>{initProfile.email}</EmailText>
            </BoxView>
          </ContentColumn>
          {/* 완료 버튼 */}
          <CustomTouchable onPress={onPressComplete}>
            <CompleteButton
              complete={nicknameKeyword !== '' && art !== '' && isVerified}>
              완료
            </CompleteButton>
          </CustomTouchable>
        </Contents>
        {isLoadingOpen && <LoadingModal message={'정보 수정 중 :)'} />}
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default UpdateProfile;

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
  padding: ${hp(1.8)}px;
  gap: ${hp(2.6)}px;
`;

const ContentColumn = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${hp(1.8)}px;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

interface ContentProps {
  color: boolean;
}

const BoxView = styled.View<ContentProps>`
  border-width: ${wp(0.4)}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${wp(1.5)}px;
  flex-direction: row;
  background-color: ${(props: ContentProps) =>
    props.color ? '#d9d9d9' : `${BACK_COLOR}`};
  padding: ${wp(3)}px;
  gap: ${wp(1.5)}px;
  align-items: center;
`;

const EmailText = styled.Text`
  font-size: ${rf(16.5)}px;
  color: white;
  font-family: ${FONT_NAME};
  text-align: center;
`;

interface CompleteButtonProps {
  complete: boolean;
}

const CompleteButton = styled.Text<CompleteButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: CompleteButtonProps) =>
    props.complete ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
