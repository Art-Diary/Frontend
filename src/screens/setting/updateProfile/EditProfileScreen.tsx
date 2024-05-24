import React from 'react';
import {useUserInfo} from '~/zustand/auth/auth';
import UpdateProfile from '~/components/setting/UpdateProfile';

const EditProfileScreen = () => {
  const userInfo = useUserInfo();

  return (
    <UpdateProfile
      title={'프로필 수정'}
      initProfile={{
        favoriteArt: userInfo.authInfo.favoriteArt,
        nickname: userInfo.authInfo.nickname,
        profile: userInfo.authInfo.profile,
        email: userInfo.authInfo.email,
        providerType: userInfo.authInfo.email.split('@')[1].split('.')[0],
      }}
      messages={{
        errorMsg: '정보 수정을 실패했습니다.',
        successMsg: '정보 수정 완료!',
      }}
      navigateTo={'back'}
    />
  );
};

export default EditProfileScreen;
