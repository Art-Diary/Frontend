import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import BackView from '~/components/common/BackView';
import {useUserInfo} from '~/zustand/auth/auth';
import {GoogleIcon, KakaoIcon, NaverIcon} from '~/assets/images';
import EditNickname from './EditNickname';
import EditArtCategory from './EditArtCategory';
import EditPicture from './EditPicture';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {TouchableOpacity} from 'react-native';
import {useUpdateUserInfo} from '~/api/queries/auth';
import {showToast} from '~/components/common/modal/toastConfig';
import LoadingModal from '~/components/common/modal/LoadingModal';

const EditProfileScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const userInfo = useUserInfo();
  const [art, setArt] = useState<string>(userInfo.favoriteArt);
  const [nicknameKeyword, setNicknameKeyword] = useState<string>(
    userInfo.nickname,
  );
  const [imageUri, setImageUri] = useState<string | undefined>(
    `data:image/png;base64,${userInfo.profile}`,
  );
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [createFormData, setCreateFormData] = useState<FormData | null>(null);
  const {
    mutate: updateUserInfo,
    isLoading,
    isError,
    isSuccess,
  } = useUpdateUserInfo(createFormData);

  useEffect(() => {
    if (createFormData !== null) {
      updateUserInfo();
    }
  }, [createFormData]);

  useEffect(() => {
    if (isError) {
      showToast('정보 수정을 실패했습니다.');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      setCreateFormData(null);
      showToast('정보 수정 완료!');
      navigation.goBack();
    }
  }, [isError, isLoading, isSuccess]);

  const onPressComplete = async () => {
    const formData = new FormData();

    formData.append('nickname', nicknameKeyword);
    formData.append('favoriteArt', art);
    if (imageUri?.search('file://') !== -1) {
      const resizedImage = await ImageResizer.createResizedImage(
        imageUri ?? '', // path
        300, // width
        300, // height
        'JPEG', // format
        100, // quality
        undefined, // rotation
        // uploadFileName, // outputPath
        undefined, // keepMeta,
        undefined, // options => object
      );
      const uri = resizedImage.uri;
      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('profile', {
        name: filename,
        type,
        uri: uri,
      });
    }
    setCreateFormData(formData);
  };

  return (
    <Container>
      <BackView title="프로필 수정" line={true} />

      {/* body */}
      <Contents>
        {/* 닉네임 */}
        <EditNickname
          getNickname={nicknameKeyword}
          setNickname={setNicknameKeyword}
        />
        {/* 좋아하는 전시 분야 */}
        <EditArtCategory getValue={art} setValue={setArt} />
        {/* 프로필 */}
        <EditPicture imageUri={imageUri} setImageUri={setImageUri} />
        {/* 이메일 */}
        <ContentColumn>
          <SectionName>이메일</SectionName>
          <BoxView color={true}>
            {userInfo.email.includes('naver') ? (
              <NaverIcon width={20} />
            ) : userInfo.email.includes('gmail') ? (
              <GoogleIcon width={20} />
            ) : (
              <KakaoIcon width={20} />
            )}
            <EmailText>{userInfo.email}</EmailText>
          </BoxView>
        </ContentColumn>
        {/* 완료 버튼 */}
        <TouchableOpacity onPress={onPressComplete}>
          <CompleteButton moveNext={true}>완료</CompleteButton>
        </TouchableOpacity>
      </Contents>
      {isLoadingOpen && <LoadingModal message={'정보 수정 중 :)'} />}
    </Container>
  );
};

export default EditProfileScreen;

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
  gap: ${hp(15)}px;
`;

const ContentColumn = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${hp(10)}px;
`;

const SectionName = styled.Text`
  font-size: ${fp(19)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

interface ContentProps {
  color: boolean;
}

const BoxView = styled.View<ContentProps>`
  border-width: 1.5px;
  border-color: #d3d3d3;
  border-radius: 10px;
  flex-direction: row;
  background-color: ${(props: ContentProps) =>
    props.color ? '#d9d9d9' : '#f6f6f6'};
  padding: ${hp(10)}px;
  gap: 6.5px;
  align-items: center;
`;

const EmailText = styled.Text`
  font-size: ${fp(18)}px;
  color: white;
  font-family: 'omyu pretty';
  text-align: center;
`;

interface NextButtonProps {
  complete: boolean;
}

const CompleteButton = styled.Text<NextButtonProps>`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: #ff6f61;
  /* background-color: ${(props: NextButtonProps) =>
    props.complete ? '#ff6f61' : '#D3D3D3'}; */
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;
