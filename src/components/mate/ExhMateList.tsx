import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import LoadingModal from '~/components/common/modal/LoadingModal';
import NameTag from '../../screens/mate/NameTag';
import {useFetchExhMateList} from '~/api/queries/mate';
import {useMateActions} from '~/zustand/mate/mate';
import {
  DEFAULT_TEXT,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';
import {DEFAULT_IMAGE} from '@env';
import CustomTouchable from '~/components/common/CustomTouchable';

interface ExhMateInfo {
  userId: number;
  nickname: string;
  profile: string;
  favoriteArt: string;
}

const ExhMateList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateMate} = useMateActions();
  const {
    data: exhMateList,
    isLoading,
    isError,
    isSuccess,
  } = useFetchExhMateList();

  if (isError) {
    return <ErrorMessageView message="전시메이트 목록 조회 실패:(" />;
  }

  if (isLoading) {
    return <LoadingModal message="전시메이트 목록 조회 중:)" />;
  }

  const pressExhMate = (item: ExhMateInfo) => {
    // 메이트 클릭
    updateMate({
      userId: item.userId,
      nickname: item.nickname,
      profile: item.profile,
      favoriteArt:
        item.favoriteArt === '.' || !item.favoriteArt
          ? '그외'
          : item.favoriteArt,
    });
    navigation.navigate('MateDiaryRoutes');
  };

  return (
    <Container>
      {/* 전시메이트 리스트 */}
      <ScrollView>
        {exhMateList.map((item: any, index: number) => {
          return (
            <CustomTouchable key={index} onPress={() => pressExhMate(item)}>
              <UserInfoWrapper>
                <NameTag isSelected={true}>
                  <UserInfo>
                    <ProfileWrapper>
                      <Profile
                        source={{uri: `${item.profile ?? DEFAULT_IMAGE}`}}
                        resizeMode="cover"
                        alt={'이미지 읽기 실패'}
                      />
                    </ProfileWrapper>
                    <UserInfoColumn>
                      <NickName>{item.nickname}</NickName>
                      <Art>
                        {item.favoriteArt === '.' || !item.favoriteArt
                          ? '그외'
                          : item.favoriteArt}
                      </Art>
                    </UserInfoColumn>
                  </UserInfo>
                </NameTag>
              </UserInfoWrapper>
            </CustomTouchable>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default ExhMateList;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

const UserInfoWrapper = styled.View`
  padding-bottom: ${wp(1.9)}px;
  padding-left: ${wp(3.3)}px;
  padding-right: ${wp(3.3)}px;
  /* align-items: center; */
`;

const UserInfo = styled.View`
  flex-direction: row;
  gap: ${wp(3.1)}px;
  align-items: center;
`;

const ProfileWrapper = styled.View`
  border-color: ${MAIN_COLOR};
  border-radius: ${wp(50)}px;
  align-items: center;
  justify-content: center;
  width: ${wp(10)}px;
  height: ${wp(10)}px;
  overflow: hidden;
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
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  text-align: center;
`;

const Art = styled.Text`
  font-size: ${rf(10.4)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
