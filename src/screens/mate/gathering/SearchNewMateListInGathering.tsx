import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import {
  responseFont as rf,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import LoadingModal from '~/components/common/modal/LoadingModal';
import NameTag from '../NameTag';
import {useFetchSearchNewMateInGathering} from '~/api/queries/gathering';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';
import {
  DEFAULT_TEXT,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';
import {DEFAULT_IMAGE} from '@env';
import CustomTouchable from '~/components/common/CustomTouchable';

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
    return (
      <ErrorMessageView message={'모임에 추가할 전시 메이트 조회 실패 ;('} />
    );
  }

  if (isLoading) {
    return <LoadingModal message={'추가할 전시 메이트 조회 중 :)'} />;
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
            <CustomTouchable onPress={() => pressItem(item)}>
              <UserInfoWrapper>
                <NameTag isSelected={item.userId === selectedMate}>
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
