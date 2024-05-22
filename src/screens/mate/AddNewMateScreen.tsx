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
import SearchNewMateList from './SearchNewMateList';
import {useAddNewMate} from '~/api/queries/mate';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';

const AddNewMateScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [nicknameKeyword, setNicknameKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedMate, setSelectedMate] = useState(-1);
  const {
    mutate: addNewMate,
    isLoading,
    isError,
    isSuccess,
  } = useAddNewMate(selectedMate);

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
      <BackView title="전시 메이트 추가" line={true} />
      {/* body */}
      <Contents>
        <SearchExhFrame
          searchKeyword={nicknameKeyword}
          onPressSearch={onPressSearch}
          handleSearchKeyword={setNicknameKeyword}
          searchMessage={'닉네임을 검색하세요'}>
          {/* 전시회 메이트 목록 */}
          {keyword !== '' && (
            <SearchNewMateList
              searchKeyword={keyword}
              changeIsPressed={onPressSearch}
              selectedMate={selectedMate}
              handleSelectedMate={setSelectedMate}
            />
          )}
        </SearchExhFrame>
      </Contents>
      {/* 전시 메이트 추가 버튼 */}
      <ButtonTouch
        onPress={onPressCreate}
        disabled={selectedMate === -1 ? true : false}>
        <CreateButton isSelected={selectedMate === -1 ? false : true}>
          추가
        </CreateButton>
      </ButtonTouch>
      {isLoadingOpen && <LoadingModal message={'전시 메이트 추가 중'} />}
    </Container>
  );
};

export default AddNewMateScreen;

/** style */
const Container = styled.View`
  flex: 1;
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
