import React from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import UpdateAlarm1 from './UpdateAlarm1';
import UpdateAlarm2 from './UpdateAlarm2';
import UpdateAlarm3 from './UpdateAlarm3';

const AlarmSettingScreen = () => {
  return (
    <Container>
      <BackView title="알림 설정" line={true} />

      {/* body */}
      <Contents>
        <ContentRow>
          <AlarmText>좋아요한 전시회 시작일 알림</AlarmText>
          <UpdateAlarm1 />
        </ContentRow>
        <ContentRow>
          <AlarmText>좋아요한 전시회 마감일 알림</AlarmText>
          <UpdateAlarm2 />
        </ContentRow>
        <ContentRow>
          <AlarmText>캘린더에 저장된 전시회 알림</AlarmText>
          <UpdateAlarm3 />
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
  background-color: #f6f6f6;
  padding-top: ${hp(10)}px;
  padding-bottom: ${hp(10)}px;
  padding-left: ${wp(20)}px;
  padding-right: ${wp(20)}px;
  gap: ${wp(15)}px;
`;

const ContentRow = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const AlarmText = styled.Text`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;
