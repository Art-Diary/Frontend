import React from 'react';
import {useUserInfo} from '~/zustand/auth/auth';
import UpdateProfile from '~/components/setting/UpdateProfile';

const EditProfileScreen = () => {
  const {authInfo} = useUserInfo();
  const user = {
    favoriteArt: authInfo.favoriteArt === '' ? '없음' : authInfo.favoriteArt,
    nickname: authInfo.nickname === '' ? '전시 메이트' : authInfo.nickname,
    profile: authInfo.profile,
    email: authInfo.email === '' ? '이메일' : authInfo.email,
    providerType: authInfo.providerType === '' ? '' : authInfo.providerType,
  };

  return (
    <UpdateProfile
      title={'프로필 수정'}
      initProfile={user}
      messages={{
        errorMsg: '정보 수정을 실패했습니다.',
        successMsg: '정보 수정 완료!',
      }}
      navigateTo={'back'}
    />
  );
};

export default EditProfileScreen;
