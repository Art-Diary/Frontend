import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '../../../components/common/modal/LoadingModal';
import {useFetchSearchMateList} from '~/api/queries/mate';
import NameTag from '../NameTag';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  DEFAULT_TEXT,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';

interface SearchNewMateListProps {
  searchKeyword: string;
  changeIsPressed: () => void;
  selectedMate: number;
  handleSelectedMate: (userId: number) => void;
}

const SearchNewMateList: React.FC<SearchNewMateListProps> = ({
  searchKeyword,
  changeIsPressed,
  selectedMate,
  handleSelectedMate,
}) => {
  const {
    data: mateList,
    isLoading,
    isError,
    isSuccess,
  } = useFetchSearchMateList(searchKeyword);

  useEffect(() => {
    if (isSuccess) {
      changeIsPressed();
    }
  }, [isSuccess]);

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
      {mateList.length === 0 ? (
        <ErrorMessageView message={'검색 결과가 없습니다.'} />
      ) : (
        <FlatList
          data={mateList}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => pressItem(item)}>
              <UserInfoWrapper>
                <NameTag isSelected={item.userId === selectedMate}>
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
                </NameTag>
              </UserInfoWrapper>
            </TouchableOpacity>
          )}
        />
      )}
    </MateListView>
  );
};

export default SearchNewMateList;

/** style */
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
