import React, {useEffect, useState} from 'react';
import {useUpdateAlarm2} from '~/api/queries/auth';
import CustomTouchable from '~/components/common/CustomTouchable';
import {PrivateToggleIcon, PublicToggleIcon} from '~/components/common/icon';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {useUserActions, useUserInfo} from '~/zustand/auth/auth';

const UpdateAlarm2 = () => {
  const userInfo = useUserInfo();
  const [getAlarm2, setAlarm2] = useState(userInfo.authInfo.alarm2);
  const {updateAlarm2} = useUserActions();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {
    mutate: changeAlarm2,
    isLoading,
    isError,
    isSuccess,
  } = useUpdateAlarm2(!getAlarm2);

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
      updateAlarm2(!getAlarm2);
      setAlarm2(!getAlarm2);
    }
  }, [isError, isLoading, isSuccess]);

  const onPressAlarm = () => {
    changeAlarm2();
  };

  return (
    <>
      <CustomTouchable onPress={onPressAlarm}>
        {getAlarm2 ? <PublicToggleIcon /> : <PrivateToggleIcon />}
      </CustomTouchable>
      {isLoadingOpen && <LoadingModal message={'알림 설정 중 :)'} />}
    </>
  );
};

export default UpdateAlarm2;
