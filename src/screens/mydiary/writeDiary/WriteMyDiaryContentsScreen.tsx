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
import {useCreateMyDiary} from '~/api/queries/mydiary';
import Loading from '~/components/common/Loading';
import {showToast} from '~/components/common/modal/toastConfig';

const WriteMyDiaryContentsScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [contentsKeyword, setContentsKeyword] = useState<string>('');
  const mySoloInfo = useMySoloInfo();
  const writeMyDiaryInfo = useWriteMyDiaryInfo();
  const {updateforIds, updateforDetailInfo, updateforContent} =
    useWriteMyDiaryActions();
  const [createFormData, setCreateFormData] = useState<FormData | null>(null);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  // post
  const {
    mutate: createMyDiary,
    isLoading,
    isError,
    isSuccess,
  } = useCreateMyDiary(mySoloInfo.exhId, createFormData);

  useEffect(() => {
    if (createFormData) {
      createMyDiary();
      updateforIds(null, null);
      updateforDetailInfo(null, null, null, null, null, null);
      updateforContent(null);
    }
  }, [createFormData]);

  useEffect(() => {
    if (isError) {
      showToast('기록 작성 실패');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      navigation.navigate('MyDiaryRoutes'); // 기록 목록 화면으로 이동
    }
  }, [isError, isSuccess, isLoading]);

  const onClickNextButton = async () => {
    const formData = new FormData();

    const filename = writeMyDiaryInfo.thumbnail?.split('/').pop();
    const match = /\.(\w+)$/.exec(filename || '');
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('userExhId', writeMyDiaryInfo.userExhId);
    formData.append('gatheringExhId', writeMyDiaryInfo.gatheringExhId);
    formData.append('title', writeMyDiaryInfo.title);
    formData.append('rate', writeMyDiaryInfo.rate);
    formData.append('diaryPrivate', writeMyDiaryInfo.diaryPrivate);
    formData.append('contents', contentsKeyword);
    formData.append('thumbnail', {
      name: filename,
      type,
      uri: writeMyDiaryInfo.thumbnail,
    });
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
            <NextButton moveNext={true}>다음</NextButton>
          </TouchableOpacity>
        ) : (
          <NextButton moveNext={false}>다음</NextButton>
        )}
      </ContentsContainer>
      {/* TODO 나중에 로딩 모달로 수정 */}
      {isLoadingOpen && <Loading message={'로딩 중 :)'} />}
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
