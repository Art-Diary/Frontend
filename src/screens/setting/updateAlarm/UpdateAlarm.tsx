import React, {useEffect, useState} from 'react';
import CustomTouchable from '~/components/common/CustomTouchable';
import {PrivateToggleIcon, PublicToggleIcon} from '~/components/common/icon';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {showToast} from '~/components/common/modal/toastConfig';

interface Props {
  initValue: boolean;
  updateAlarmApi: (alarm: boolean) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  updateUserAlarm: (alarm: boolean) => void;
}

const UpdateAlarm: React.FC<Props> = ({
  initValue,
  updateAlarmApi,
  isLoading,
  isError,
  isSuccess,
  updateUserAlarm,
}) => {
  const [alarm, setAlarm] = useState(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  useEffect(() => {
    setAlarm(initValue);
  }, [initValue]);

  useEffect(() => {
    if (isError) {
      showToast('알림 설정에 실패했습니다.');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    } else {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      updateUserAlarm(!alarm);
      setAlarm(!alarm);
    }
  }, [isError, isLoading, isSuccess]);

  const onPressAlarm = () => {
    updateAlarmApi(!alarm);
  };

  return (
    <>
      <CustomTouchable onPress={onPressAlarm}>
        {alarm ? <PublicToggleIcon /> : <PrivateToggleIcon />}
      </CustomTouchable>
      {isLoadingOpen && <LoadingModal message={'알림 설정 중 :)'} />}
    </>
  );
};

export default UpdateAlarm;
