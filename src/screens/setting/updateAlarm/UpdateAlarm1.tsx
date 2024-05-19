import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useUpdateAlarm1} from '~/api/queries/auth';
import {PrivateToggle, PublicToggle} from '~/assets/images';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {useUserActions, useUserInfo} from '~/zustand/auth/auth';

const UpdateAlarm1 = () => {
  const userInfo = useUserInfo();
  const [getAlarm1, setAlarm1] = useState(userInfo.authInfo.alarm1);
  const {updateAlarm1} = useUserActions();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {
    mutate: changeAlarm1,
    isLoading,
    isError,
    isSuccess,
  } = useUpdateAlarm1(!getAlarm1);

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
      updateAlarm1(!getAlarm1);
      setAlarm1(!getAlarm1);
    }
  }, [isError, isLoading, isSuccess]);

  const onPressAlarm = () => {
    changeAlarm1();
  };

  return (
    <>
      <TouchableOpacity onPress={onPressAlarm}>
        {getAlarm1 ? <PublicToggle /> : <PrivateToggle />}
      </TouchableOpacity>
      {isLoadingOpen && <LoadingModal message={'알림 설정 중 :)'} />}
    </>
  );
};

export default UpdateAlarm1;
