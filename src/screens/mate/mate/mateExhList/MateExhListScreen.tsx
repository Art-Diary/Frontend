import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import {useMateInfo} from '~/zustand/mate/mate';
import MateExhList from './MateExhList';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  DASH_WIDTH,
  FONT_NAME,
  ITEM_BORDER_WIDTH,
} from '~/components/common/style';

const MateExhListScreen = () => {
  const mateInfo = useMateInfo();

  return (
    <Container>
      {/* header */}
      <BackView
        title={
          mateInfo.mateInfo.nickname === ''
            ? '전시 메이트의 기록'
            : mateInfo.mateInfo.nickname + '의 기록'
        }
        line={true}
      />
      {/* body */}
      <Contents>
        {/* 메이트 정보 */}
        <UserWrapper>
          <UserInfo>
            <ProfileWrapper isPresent={mateInfo.mateInfo.profile}>
              <Profile
                source={{
                  uri: `data:image/png;base64,${mateInfo.mateInfo.profile}`,
                }}
                resizeMode="cover"
                alt={'이미지 읽기 실패'}
              />
            </ProfileWrapper>
            <UserInfoColumn>
              <NickName>
                {mateInfo.mateInfo.nickname === ''
                  ? '전시 메이트'
                  : mateInfo.mateInfo.nickname}
              </NickName>
              <Art>
                {mateInfo.mateInfo.favoriteArt === ''
                  ? '없음'
                  : mateInfo.mateInfo.favoriteArt}
              </Art>
            </UserInfoColumn>
          </UserInfo>
        </UserWrapper>
      </Contents>
      <DashLine />
      {/* 전시 목록 */}
      <MateExhList />
    </Container>
  );
};

export default MateExhListScreen;

/** style */
const Container = styled.View`
  flex: 1;
  background-color: ${BACK_COLOR};
`;

const Contents = styled.View`
  /* flex: 1; */
  flex-direction: column;
  padding-top: ${wp(3.3)}px;
  padding-bottom: ${wp(3.3)}px;
  /* gap: ${wp(3.3)}px; */
`;

const UserWrapper = styled.View`
  width: 100%;
  justify-content: center;
  padding-left: ${wp(3.3)}px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  gap: ${wp(3.1)}px;
  align-items: center;
`;

interface ProfileWrapperProps {
  isPresent: boolean;
}

const ProfileWrapper = styled.View<ProfileWrapperProps>`
  border-color: ${MAIN_COLOR};
  border-radius: ${wp(50)}px;
  align-items: center;
  justify-content: center;
  width: ${wp(10)}px;
  height: ${wp(10)}px;
  overflow: hidden;
  border-width: ${(props: ProfileWrapperProps) =>
    props.isPresent ? `0px` : `${ITEM_BORDER_WIDTH}px`};
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const UserInfoColumn = styled.View`
  flex-direction: column;
  gap: ${wp(0.4)}px;
  justify-content: center;
`;

const NickName = styled.Text`
  font-size: ${rf(15.1)}px;
  text-align: center;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const Art = styled.Text`
  font-size: ${rf(10.4)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const DashLine = styled.View`
  width: 100%;
  border-style: dashed;
  border-color: ${LIGHT_GREY};
  border-bottom-width: ${DASH_WIDTH}px;
`;
