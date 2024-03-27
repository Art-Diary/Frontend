import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import BackView from '~/components/common/BackView';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {TouchableOpacity} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {useMySoloInfo} from '~/zustand/mydiary/mySoloStoredDates';
import {
  useWriteMyDiaryActions,
  useWriteMyDiaryInfo,
} from '~/zustand/mydiary/writeMyDiary';
import {changeDotToHyphen, dateToString} from '~/utils/Date';
import {useCreateMyDiary, useUpdateMyDiary} from '~/api/queries/mydiary';
import {showToast} from '~/components/common/modal/toastConfig';
import LoadingModal from '~/components/common/modal/LoadingModal';

const WriteMyDiaryContentsScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [contentsKeyword, setContentsKeyword] = useState<string>('');
  const mySoloInfo = useMySoloInfo();
  const writeMyDiaryInfo = useWriteMyDiaryInfo();
  const {updateIsUpdate, updateforIds, updateforDetailInfo, updateforContent} =
    useWriteMyDiaryActions();
  const [createFormData, setCreateFormData] = useState<FormData | null>(null);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  // post
  const {
    mutate: createMyDiary,
    isLoading: isLoadingCreate,
    isError: isErrorCreate,
    isSuccess: isSuccessCreate,
  } = useCreateMyDiary(mySoloInfo.exhId, createFormData);
  const {
    mutate: updateMyDiary,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateMyDiary(
    mySoloInfo.exhId,
    writeMyDiaryInfo.diaryId ?? -1,
    createFormData,
  );

  useEffect(() => {
    setContentsKeyword(writeMyDiaryInfo.contents ?? '');
  }, []);

  useEffect(() => {
    if (createFormData) {
      if (!writeMyDiaryInfo.isUpdate) {
        createMyDiary();
      } else {
        // 업데이트
        updateMyDiary();
      }
    }
  }, [createFormData]);

  useEffect(() => {
    if (isErrorCreate) {
      showToast('기록 작성 실패했습니다.');
    }
    if (isErrorUpdate) {
      showToast('기록 수정 실패했습니다');
    }
    if (isLoadingCreate || isLoadingUpdate) {
      setIsLoadingOpen(true);
    }
    if (!(isLoadingCreate || isLoadingUpdate)) {
      setIsLoadingOpen(false);
    }
    if (isSuccessCreate || isSuccessUpdate) {
      updateIsUpdate(null);
      updateforIds(null, null, null);
      updateforDetailInfo(null, null, null, null, null, null);
      updateforContent(null);
      if (isSuccessCreate) {
        showToast('다이어리 작성 완료!');
      } else if (isSuccessUpdate) {
        showToast('다이어리 업데이트 완료!');
      }
      navigation.navigate('MyDiaryRoutes'); // 기록 목록 화면으로 이동
    }
  }, [
    isErrorCreate,
    isErrorUpdate,
    isLoadingCreate,
    isLoadingUpdate,
    isSuccessCreate,
    isSuccessUpdate,
  ]);

  const onClickNextButton = async () => {
    const formData = new FormData();

    formData.append('userExhId', writeMyDiaryInfo.userExhId);
    formData.append('gatheringExhId', writeMyDiaryInfo.gatheringExhId);
    formData.append('title', writeMyDiaryInfo.title);
    formData.append('rate', writeMyDiaryInfo.rate);
    formData.append('diaryPrivate', writeMyDiaryInfo.diaryPrivate);
    formData.append('contents', contentsKeyword);

    // 기록 생성에만 추가
    if (!writeMyDiaryInfo.isUpdate) {
      const filename = writeMyDiaryInfo.thumbnail?.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('thumbnail', {
        name: filename,
        type,
        uri: writeMyDiaryInfo.thumbnail,
      });
    }

    formData.append('writeDate', changeDotToHyphen(dateToString(new Date())));
    formData.append('saying', writeMyDiaryInfo.saying);
    setCreateFormData(formData);
  };

  const onChangeContents = useCallback((text: string) => {
    setContentsKeyword(text);
  }, []);

  const checkKeyword = (text: string): boolean => {
    var blank = false;
    if (text === '') {
      blank = true;
    }
    if (text.trim() === '') {
      blank = true;
    }
    return blank;
  };

  return (
    <Container>
      <BackView title="기록 작성" line={true} children={null} />
      <ContentsContainer>
        <ScrollContents>
          <WriteContents
            multiline={true}
            placeholderTextColor="#D3D3D3"
            placeholder={'전시회 감상을 기록해보세요!'}
            onChangeText={onChangeContents}
            value={contentsKeyword}
          />
        </ScrollContents>
        {!checkKeyword(contentsKeyword) ? (
          <TouchableOpacity onPress={onClickNextButton}>
            <NextButton moveNext={true}>완료</NextButton>
          </TouchableOpacity>
        ) : (
          <NextButton moveNext={false}>완료</NextButton>
        )}
      </ContentsContainer>
      {isLoadingOpen && <LoadingModal message={'다이어리 저장 중 :)'} />}
    </Container>
  );
};

export default WriteMyDiaryContentsScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-top: ${hp(10)}px;
  padding-bottom: ${hp(10)}px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  gap: ${hp(10)}px;
`;

const ScrollContents = styled.ScrollView`
  flex: 1;
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 5px;
`;

const WriteContents = styled.TextInput`
  width: 100%;
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
`;

interface NextButtonProps {
  moveNext: boolean;
}

const NextButton = styled.Text<NextButtonProps>`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.moveNext ? '#ff6f61' : '#D3D3D3'};
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;
