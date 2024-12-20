import React from 'react';
import {useUserLoginInfo} from '~/zustand/auth/authLogin';
import UpdateProfile from '~/components/setting/UpdateProfile';

const InitProfileScreen = () => {
  const userloginInfo = useUserLoginInfo();

  return (
    <UpdateProfile
      title={'프로필 초기화'}
      initProfile={{
        favoriteArt: '',
        nickname: '',
        profile: undefined,
        email: userloginInfo.email,
        providerType: userloginInfo.providerType,
      }}
      navigateTo={'Main'}
    />
  );
};

export default InitProfileScreen;
