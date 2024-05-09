import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import {
  heightPercentage as hp,
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import LoadingModal from '~/components/common/modal/LoadingModal';
import NameTag from './NameTag';
import {useFetchExhMateList} from '~/api/queries/mate';
import {useMateActions} from '~/zustand/mate/mate';

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
      <FlatList
        data={exhMateList}
        renderItem={({item, index}) => (
          <NameTag isSelected={true}>
            <TouchItem
              key={index}
              isLast={exhMateList.length - 1 === index}
              onPress={() => pressExhMate(item)}>
              <UserInfo>
                <ProfileWrapper>
                  <Profile
                    source={{uri: `data:image/png;base64,${item.profile}`}}
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
            </TouchItem>
          </NameTag>
        )}
      />
    </Container>
  );
};

export default ExhMateList;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: ${wp(1)}px;
`;

interface ExhMateItemProps {
  isLast: boolean;
}

const TouchItem = styled.TouchableOpacity`
  margin-bottom: ${(props: ExhMateItemProps) => (props.isLast ? '0px' : '5px')};
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const UserInfo = styled.View`
  flex-direction: row;
  gap: 13px;
`;

const ProfileWrapper = styled.View`
  border-color: #ff6f61;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  width: ${wp(35)}px;
  height: ${wp(35)}px;
  overflow: hidden;
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
