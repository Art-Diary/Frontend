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
      messages={{
        errorMsg: '정보 초기화를 실패했습니다.',
        successMsg: '정보 초기화 완료!',
      }}
      navigateTo={'Main'}
    />
  );
};

export default InitProfileScreen;
