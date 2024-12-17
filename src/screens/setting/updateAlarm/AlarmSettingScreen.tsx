import React from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {BACK_COLOR, DEFAULT_TEXT, LIGHT_GREY} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';
import {useUserActions, useUserInfo} from '~/zustand/auth/auth';
import {
  useUpdateFavoriteExhAlarm,
  useUpdateNewDateGatheringAlarm,
  useUpdateNewGatheringAlarm,
  useUpdateVisitGatheringAlarm,
  useUpdateVisitSoloAlarm,
} from '~/api/queries/auth';
import UpdateAlarm from './UpdateAlarm';

const AlarmSettingScreen = () => {
  const {authInfo} = useUserInfo();
  const {
    updateFavoriteExhAlarm,
    updateVisitSoloAlarm,
    updateVisitGatheringAlarm,
    updateNewGatheringAlarm,
    updateNewDateGatheringAlarm,
  } = useUserActions();
  const {
    mutate: changeFavoriteExhAlarm,
    isLoading: loadingFavorite,
    isError: errorFavorite,
    isSuccess: successFavorite,
  } = useUpdateFavoriteExhAlarm();
  const {
    mutate: changeVisitSoloAlarm,
    isLoading: loadingVisitSolo,
    isError: errorVisitSolo,
    isSuccess: successVisitSolo,
  } = useUpdateVisitSoloAlarm();
  const {
    mutate: changeVisitGatheringAlarm,
    isLoading: loadingVisitGathering,
    isError: errorVisitGathering,
    isSuccess: successVisitGathering,
  } = useUpdateVisitGatheringAlarm();
  const {
    mutate: changeNewGatheringAlarm,
    isLoading: loadingNewGathering,
    isError: errorNewGathering,
    isSuccess: successNewGathering,
  } = useUpdateNewGatheringAlarm();
  const {
    mutate: changeNewDateGatheringAlarm,
    isLoading: loadingNewDateGathering,
    isError: errorNewDateGathering,
    isSuccess: successNewDateGathering,
  } = useUpdateNewDateGatheringAlarm();

  return (
    <Container>
      <BackView title="푸시 알림 설정" line={true} />

      {/* body */}
      <Contents>
        <ContentRow>
          <ContentColumn>
            <AlarmText>좋아요한 전시회 시작일/마감일 알림</AlarmText>
            <AlarmSubText>
              전시회의 시작일과 마감일 당일에 대한 알림
            </AlarmSubText>
          </ContentColumn>
          <UpdateAlarm
            initValue={authInfo.favoriteExhAlarm}
            updateAlarmApi={changeFavoriteExhAlarm}
            isLoading={loadingFavorite}
            isError={errorFavorite}
            isSuccess={successFavorite}
            updateUserAlarm={updateFavoriteExhAlarm}
          />
        </ContentRow>
        <ContentRow>
          <ContentColumn>
            <AlarmText>혼자 가는 전시회 날짜 알림</AlarmText>
            <AlarmSubText>방문 날짜 당일에 대한 알림</AlarmSubText>
          </ContentColumn>
          <UpdateAlarm
            initValue={authInfo.visitSoloAlarm}
            updateAlarmApi={changeVisitSoloAlarm}
            isLoading={loadingVisitSolo}
            isError={errorVisitSolo}
            isSuccess={successVisitSolo}
            updateUserAlarm={updateVisitSoloAlarm}
          />
        </ContentRow>
        <ContentRow>
          <ContentColumn>
            <AlarmText>모임에서 가는 전시회 날짜 알림</AlarmText>
            <AlarmSubText>방문 날짜 당일에 대한 알림</AlarmSubText>
          </ContentColumn>
          <UpdateAlarm
            initValue={authInfo.visitGatheringAlarm}
            updateAlarmApi={changeVisitGatheringAlarm}
            isLoading={loadingVisitGathering}
            isError={errorVisitGathering}
            isSuccess={successVisitGathering}
            updateUserAlarm={updateVisitGatheringAlarm}
          />
        </ContentRow>
        <ContentRow>
          <ContentColumn>
            <AlarmText>새로운 모임 알림</AlarmText>
            <AlarmSubText>초대 받은 모임 알림</AlarmSubText>
          </ContentColumn>
          <UpdateAlarm
            initValue={authInfo.newGatheringAlarm}
            updateAlarmApi={changeNewGatheringAlarm}
            isLoading={loadingNewGathering}
            isError={errorNewGathering}
            isSuccess={successNewGathering}
            updateUserAlarm={updateNewGatheringAlarm}
          />
        </ContentRow>
        <ContentRow>
          <ContentColumn>
            <AlarmText>모임에서 추가된 전시회 알림</AlarmText>
            <AlarmSubText>새로운 전시회 방문 날짜 알림</AlarmSubText>
          </ContentColumn>
          <UpdateAlarm
            initValue={authInfo.newDateGatheringAlarm}
            updateAlarmApi={changeNewDateGatheringAlarm}
            isLoading={loadingNewDateGathering}
            isError={errorNewDateGathering}
            isSuccess={successNewDateGathering}
            updateUserAlarm={updateNewDateGatheringAlarm}
          />
        </ContentRow>
      </Contents>
    </Container>
  );
};

export default AlarmSettingScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
  padding: ${wp(5)}px;
  gap: ${hp(2)}px;
`;

const ContentRow = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const ContentColumn = styled.View`
  flex-direction: column;
  gap: ${hp(0.5)}px;
`;

const AlarmText = styled.Text`
  font-size: ${rf(16.8)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const AlarmSubText = styled.Text`
  font-size: ${rf(14)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;
