import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import BackView from '~/components/common/BackView';
import {
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {TouchableOpacity} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {
  useWriteMyDiaryActions,
  useWriteMyDiaryInfo,
} from '~/zustand/mydiary/writeMyDiary';
import {changeDotToHyphen, dateToString} from '~/utils/Date';
import {useCreateMyDiary, useUpdateMyDiary} from '~/api/queries/mydiary';
import {showToast} from '~/components/common/modal/toastConfig';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useTabIdentifierInfo} from '~/zustand/tabIdentifier';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';
import CustomDiaryEditor from './CustomDiaryEditor';
import {BACK_COLOR, LIGHT_GREY, MAIN_COLOR} from '~/components/common/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {changeImageSize} from '~/utils/resizeImage';

const WriteMyDiaryContentsScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [editorContent, setEditorContent] = useState('');
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const tabIdentifier = useTabIdentifierInfo();
  const writeMyDiaryInfo = useWriteMyDiaryInfo();
  const {resetWriteInfo, updateforContent} = useWriteMyDiaryActions();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  // post
  const {
    mutate: createMyDiary,
    isLoading: isLoadingCreate,
    isError: isErrorCreate,
    isSuccess: isSuccessCreate,
  } = useCreateMyDiary(visitedExhId);
  const {
    mutate: updateMyDiary,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
    data: resData,
  } = useUpdateMyDiary(visitedExhId);

  useEffect(() => {
    setEditorContent(writeMyDiaryInfo.contents ?? '');
  }, []);

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
      if (isSuccessCreate) {
        showToast('다이어리 작성 완료!');
      } else if (isSuccessUpdate) {
        showToast('다이어리 업데이트 완료!');
      }
      resetWriteInfo();
      if (tabIdentifier.tab === 'mydiary') {
        navigation.reset({
          // [내 기록] 기록 목록 화면으로 이동
          index: 0,
          routes: [{name: 'Main'}, {name: 'MyDiaryRoutes'}],
        });
      } else if (tabIdentifier.tab === 'calendar') {
        // [캘린더] 기록 목록 화면으로 이동
        navigation.navigate('CalendarDiaryRoutes');
      } else if (tabIdentifier.tab === 'gathering') {
        // [캘린더] 기록 목록 화면으로 이동
        navigation.navigate('GatheringRoutes', {
          screen: 'GatheringDiaryList',
          params: undefined,
        });
      } else if (tabIdentifier.tab === 'exhibition') {
        const data = resData.data;
        const filteredData = data.filter(
          (value: any) => value.diaryId === writeMyDiaryInfo.diaryId,
        )[0];
        navigation.navigate('ExhToDiary', {diary: filteredData});
      }
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
    /**
     * TODO
     * {check editorContent}
     * 1. 이미지 업로드 api 만들기
     * 2. 문자열 정규화를 통해 이미지 찾기
     * 3. 찾은 이미지를 서버에 보내 스토리지에 저장
     * 4. 이미지 자리를 이미지 경로로 바꾸기
     */
    const resultFormData = await makeFormData();
    if (writeMyDiaryInfo.isUpdate) {
      updateMyDiary({
        exhId: visitedExhId,
        diaryId: writeMyDiaryInfo.diaryId ?? -1,
        formData: resultFormData,
      });
    } else {
      createMyDiary({
        exhId: visitedExhId,
        formData: resultFormData,
      });
    }
  };

  const makeFormData = async (): Promise<FormData> => {
    const formData = new FormData();

    formData.append('exhVisitId', writeMyDiaryInfo.exhVisitId);
    formData.append('title', writeMyDiaryInfo.title);
    formData.append('rate', writeMyDiaryInfo.rate);
    formData.append('diaryPrivate', writeMyDiaryInfo.diaryPrivate);
    formData.append('contents', editorContent);
    formData.append('writeDate', changeDotToHyphen(dateToString(new Date())));

    if (writeMyDiaryInfo.saying) {
      formData.append('saying', writeMyDiaryInfo.saying);
    }
    // 기록 생성에만 추가
    if (
      writeMyDiaryInfo.thumbnail &&
      writeMyDiaryInfo.thumbnail.indexOf('file:///') !== -1
    ) {
      const resultResizedImage = await changeImageSize(
        writeMyDiaryInfo.thumbnail,
      );
      formData.append('thumbnail', resultResizedImage);
    }
    return formData;
  };

  const handleContent = (content: string) => {
    setEditorContent(content);
    updateforContent(content);
  };

  return (
    <Container>
      <BackView title="기록 작성" line={true} children={null} />
      <ContentsContainer>
        <CustomDiaryEditor
          handleEditorContent={handleContent}
          editorContent={editorContent}
        />
        {!checkBlankInKeyword(editorContent) ? (
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
  background-color: ${BACK_COLOR};
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-top: ${hp(1.6)}px;
  padding-bottom: ${hp(1.6)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
  gap: ${hp(1.6)}px;
`;

interface NextButtonProps {
  moveNext: boolean;
}

const NextButton = styled.Text<NextButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.moveNext ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
