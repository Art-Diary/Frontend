import React from 'react';
import styled from 'styled-components/native';
import {
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import {useMateInfo} from '~/zustand/mate/mate';
import MateExhList from './MateExhList';

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
        <DashLine />
        {/* 전시 목록 */}
        <MateExhList />
      </Contents>
    </Container>
  );
};

export default MateExhListScreen;

/** style */
const Container = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  padding-top: ${wp(12)}px;
  gap: ${wp(12)}px;
`;

const UserWrapper = styled.View`
  width: 100%;
  justify-content: center;
  padding-left: ${wp(12)}px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  gap: 13px;
`;

interface ProfileWrapperProps {
  isPresent: boolean;
}

const ProfileWrapper = styled.View<ProfileWrapperProps>`
  border-color: #ff6f61;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  width: ${wp(35)}px;
  height: ${wp(35)}px;
  overflow: hidden;
  border-width: ${(props: ProfileWrapperProps) =>
    props.isPresent ? `0px` : `1px`};
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const UserInfoColumn = styled.View`
  flex-direction: column;
  gap: 1.6px;
  justify-content: center;
`;

const NickName = styled.Text`
  font-size: ${fp(16)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  text-align: center;
`;

const Art = styled.Text`
  font-size: ${fp(11)}px;
  color: #979797;
  font-family: 'omyu pretty';
`;

const DashLine = styled.View`
  width: 100%;
  border-style: dashed;
  border-color: #d3d3d3;
  border-bottom-width: ${wp(1.3)}px;
`;
