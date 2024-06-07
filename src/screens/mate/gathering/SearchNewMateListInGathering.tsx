import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import {
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import LoadingModal from '~/components/common/modal/LoadingModal';
import NameTag from '../NameTag';
import {useFetchSearchNewMateInGathering} from '~/api/queries/gathering';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';

interface SearchNewMateListInGatheringProps {
  searchKeyword: string;
  changeIsPressed: () => void;
  selectedMate: number;
  handleSelectedMate: (userId: number) => void;
}

const SearchNewMateListInGathering: React.FC<
  SearchNewMateListInGatheringProps
> = ({searchKeyword, changeIsPressed, selectedMate, handleSelectedMate}) => {
  const {enterGatheringInfo} = useEnterGatheringInfo();
  const {
    data: searchNewMateInGathering,
    isLoading,
    isError,
    isSuccess,
  } = useFetchSearchNewMateInGathering(
    enterGatheringInfo.gatherId,
    searchKeyword,
  );

  useEffect(() => {
    if (isSuccess) {
      changeIsPressed();
    }
  }, [isSuccess]);

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'모임 메이트 조회 중 :)'} />;
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
      {searchNewMateInGathering.length === 0 ? (
        <ErrorMessageView message={'검색 결과가 없습니다.'} />
      ) : (
        <FlatList
          data={searchNewMateInGathering}
          renderItem={({item, index}) => (
            <TouchNewMate onPress={() => pressItem(item)}>
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
            </TouchNewMate>
          )}
        />
      )}
    </MateListView>
  );
};

export default SearchNewMateListInGathering;

/** style */
const MateListView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const TouchNewMate = styled.TouchableOpacity`
  margin-left: ${wp(12)}px;
  margin-right: ${wp(12)}px;
`;

const UserInfoWrapper = styled.View`
  padding-top: ${wp(7)}px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  justify-content: center;
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
