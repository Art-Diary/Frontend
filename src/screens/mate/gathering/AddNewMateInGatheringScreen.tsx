import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {
  heightPercentage as hp,
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import {Keyboard} from 'react-native';
import {showToast} from '~/components/common/modal/toastConfig';
import LoadingModal from '~/components/common/modal/LoadingModal';
import SearchExhFrame from '~/components/exhSearch/SearchExhFrame';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';
import {useAddNewMateInGathering} from '~/api/queries/gathering';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';
import SearchNewMateListInGathering from './SearchNewMateListInGathering';

const AddNewMateInGatheringScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {enterGatheringInfo} = useEnterGatheringInfo();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [nicknameKeyword, setNicknameKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedMate, setSelectedMate] = useState(-1);
  const {
    mutate: addNewMate,
    isLoading,
    isError,
    isSuccess,
  } = useAddNewMateInGathering(enterGatheringInfo.gatherId, selectedMate);

  useEffect(() => {
    if (isError) {
      showToast('전시 메이트 추가를 실패했습니다.');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      showToast('전시 메이트 추가 성공 :)');
      navigation.goBack();
    }
  }, [isError, isLoading, isSuccess]);

  const onPressCreate = () => {
    Keyboard.dismiss();
    console.log(selectedMate);
    if (selectedMate !== -1) {
      addNewMate();
    } else {
      showToast('추가할 전시 메이트를 선택해주세요.');
    }
  };

  const onPressSearch = () => {
    if (checkBlankInKeyword(nicknameKeyword)) {
      showToast('다시 검색해 주세요');
    } else {
      setSelectedMate(-1);
      setKeyword(nicknameKeyword);
    }
    Keyboard.dismiss();
  };

  return (
    <Container>
      {/* header */}
      <BackView title="모임 메이트 추가" line={true} />
      {/* body */}
      <Contents>
        <AreaView>
          <AreaText>모임 메이트 선택</AreaText>
          <AreaText greyColor={true}>(내 전시 메이트만 가능)</AreaText>
        </AreaView>
        <SearchExhFrame
          searchKeyword={nicknameKeyword}
          onPressSearch={onPressSearch}
          handleSearchKeyword={setNicknameKeyword}
          searchMessage={'닉네임을 검색하세요'}>
          {/* 모임 메이트 목록 */}
          {keyword !== '' && (
            <SearchNewMateListInGathering
              searchKeyword={keyword}
              changeIsPressed={onPressSearch}
              selectedMate={selectedMate}
              handleSelectedMate={setSelectedMate}
            />
          )}
        </SearchExhFrame>
      </Contents>
      {/* 모임 메이트 추가 버튼 */}
      <ButtonTouch
        onPress={onPressCreate}
        disabled={selectedMate === -1 ? true : false}>
        <CreateButton isSelected={selectedMate === -1 ? false : true}>
          추가
        </CreateButton>
      </ButtonTouch>
      {isLoadingOpen && <LoadingModal message={'모임 메이트 추가 중'} />}
    </Container>
  );
};

export default AddNewMateInGatheringScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const AreaView = styled.View`
  flex-direction: row;
  padding-top: ${hp(10)}px;
  padding-left: ${wp(20)}px;
  gap: ${wp(5)}px;
  align-items: flex-end;
`;

interface AreaTextProps {
  greyColor: boolean;
}

const AreaText = styled.Text<AreaTextProps>`
  font-size: ${(props: AreaTextProps) =>
    props.greyColor ? `${fp(15)}px` : `${fp(19)}px`};
  font-family: 'omyu pretty';
  color: #3c4045;
  color: ${(props: AreaTextProps) => (props.greyColor ? '#D3D3D3' : '#3c4045')};
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
`;

const ButtonTouch = styled.TouchableOpacity`
  padding-left: ${wp(12)}px;
  padding-right: ${wp(12)}px;
`;

interface CreateButtonProps {
  isSelected: boolean;
}

const CreateButton = styled.Text<CreateButtonProps>`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: ${(props: CreateButtonProps) =>
    props.isSelected ? '#ff6f61' : '#D3D3D3'};
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;
