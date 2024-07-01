import React from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {
  sizePercentage as sp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import UpdateAlarm1 from './UpdateAlarm1';
import UpdateAlarm2 from './UpdateAlarm2';
import UpdateAlarm3 from './UpdateAlarm3';
import {BACK_COLOR, DEFAULT_TEXT} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';

const AlarmSettingScreen = () => {
  return (
    <Container>
      <BackView title="푸시 알림 설정" line={true} />

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
  background-color: ${BACK_COLOR};
  padding-top: ${sp(15)}px;
  padding-bottom: ${sp(15)}px;
  padding-left: ${sp(16.5)}px;
  padding-right: ${sp(16.5)}px;
  gap: ${sp(15.2)}px;
`;

const ContentRow = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const AlarmText = styled.Text`
  font-size: ${rf(19.9)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;
