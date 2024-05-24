import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useUpdateAlarm3} from '~/api/queries/auth';
import {PrivateToggle, PublicToggle} from '~/assets/images';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {useUserActions, useUserInfo} from '~/zustand/auth/auth';

const UpdateAlarm3 = () => {
  const userInfo = useUserInfo();
  const [getAlarm3, setAlarm3] = useState(userInfo.authInfo.alarm3);
  const {updateAlarm3} = useUserActions();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {
    mutate: changeAlarm3,
    isLoading,
    isError,
    isSuccess,
  } = useUpdateAlarm3(!getAlarm3);

  useEffect(() => {
    if (isError) {
      showToast('알림 설정에 실패했습니다.');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      updateAlarm3(!getAlarm3);
      setAlarm3(!getAlarm3);
    }
  }, [isError, isLoading, isSuccess]);

  const onPressAlarm = () => {
    changeAlarm3();
  };

  return (
    <>
      <TouchableOpacity onPress={onPressAlarm}>
        {getAlarm3 ? <PublicToggle /> : <PrivateToggle />}
      </TouchableOpacity>
      {isLoadingOpen && <LoadingModal message={'알림 설정 중 :)'} />}
    </>
  );
};

export default UpdateAlarm3;
