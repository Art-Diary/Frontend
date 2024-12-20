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

  useEffect(() => {
    setAlarm(initValue);
  }, [initValue]);

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해주세요.');
    }
    if (isSuccess) {
      updateUserAlarm(!alarm);
      setAlarm(!alarm);
    }
  }, [isError, isSuccess]);

  const onPressAlarm = () => {
    updateAlarmApi(!alarm);
  };

  return (
    <>
      <CustomTouchable onPress={onPressAlarm}>
        {alarm ? <PublicToggleIcon /> : <PrivateToggleIcon />}
      </CustomTouchable>
      <LoadingModal isLoading={isLoading} />
    </>
  );
};

export default UpdateAlarm;
