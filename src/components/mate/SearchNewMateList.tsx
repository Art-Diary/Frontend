import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '../common/modal/LoadingModal';
import {useFetchSearchMateList} from '~/api/queries/mate';
import NameTag from '../../screens/mate/NameTag';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  DEFAULT_TEXT,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';
import {DEFAULT_IMAGE} from '@env';
import CustomTouchable from '~/components/common/CustomTouchable';
import {UserDetailInfo} from '~/types';

interface SearchNewMateListProps {
  searchKeyword: string;
  selectedMate: number;
  handleSelectedMate: (userId: number) => void;
}

const SearchNewMateList: React.FC<SearchNewMateListProps> = ({
  searchKeyword,
  selectedMate,
  handleSelectedMate,
}) => {
  const {
    data: mateList,
    isLoading,
    isError,
    isSuccess,
  } = useFetchSearchMateList(searchKeyword);

  if (isError) {
    return <ErrorMessageView message={'전시 메이트 검색 실패했습니다.'} />;
  }

  if (isLoading) {
    return <LoadingModal message={'전시 메이트 검색 중 :)'} />;
  }

  const pressItem = (item: any) => {
    if (item.userId === selectedMate) {
      handleSelectedMate(-1);
    } else {
      handleSelectedMate(item.userId);
    }
  };

  return (
    <MateListView>
      {!mateList ||
      (mateList.notMate.length === 0 && mateList.alreadyMate.length === 0) ? (
        <ErrorMessageView message={'검색 결과가 없습니다.'} />
      ) : (
        <ScrollView
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}>
          {mateList.notMate.length !== 0 && (
            <>
              <Message>추가 가능한 전시 메이트</Message>
              {mateList.notMate.map((item: UserDetailInfo, index: number) => {
                return (
                  <CustomTouchable onPress={() => pressItem(item)} key={index}>
                    <UserInfoWrapper>
                      <NameTag isSelected={item.userId === selectedMate}>
                        <UserInfo>
                          <ProfileWrapper>
                            <Profile
                              source={{uri: `${item.profile ?? DEFAULT_IMAGE}`}}
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
            </>
          )}
          {mateList.alreadyMate.length !== 0 && (
            <>
              <Message>이미 추가된 전시 메이트</Message>
              {mateList.alreadyMate.map(
                (item: UserDetailInfo, index: number) => {
                  return (
                    <CustomTouchable
                      onPress={() => pressItem(item)}
                      disabled
                      key={index}>
                      <UserInfoWrapper>
                        <NameTag>
                          <UserInfo>
                            <ProfileWrapper>
                              <Profile
                                source={{
                                  uri: `${item.profile ?? DEFAULT_IMAGE}`,
                                }}
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
                },
              )}
            </>
          )}
        </ScrollView>
      )}
    </MateListView>
  );
};

export default SearchNewMateList;

/** style */
const Message = styled.Text`
  font-size: ${rf(15)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-top: ${hp(1.5)}px;
  padding-left: ${wp(4)}px;
  padding-right: ${wp(4)}px;
`;

const MateListView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const UserInfoWrapper = styled.View`
  padding-top: ${wp(1.9)}px;
  align-items: center;
`;

const UserInfo = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${wp(3.1)}px;
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
  text-align: center;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const Art = styled.Text`
  font-size: ${rf(10.4)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
