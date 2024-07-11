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
import ImageResizer from '@bam.tech/react-native-image-resizer';
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

const WriteMyDiaryContentsScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [editorContent, setEditorContent] = useState('');
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const tabIdentifier = useTabIdentifierInfo();
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
  } = useCreateMyDiary(visitedExhId, createFormData);
  const {
    mutate: updateMyDiary,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
    data: resData,
  } = useUpdateMyDiary(
    visitedExhId,
    writeMyDiaryInfo.diaryId ?? -1,
    createFormData,
  );

  useEffect(() => {
    if (writeMyDiaryInfo.isUpdate) {
      setEditorContent(writeMyDiaryInfo.contents ?? '');
    } else {
      setEditorContent('');
    }
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
          (value: any) =>
            value.diaryId === writeMyDiaryInfo.diaryId &&
            (value.userExhId === writeMyDiaryInfo.userExhId ||
              value.gatherExhId === writeMyDiaryInfo.gatherExhId),
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
    const formData = new FormData();

    formData.append('userExhId', writeMyDiaryInfo.userExhId);
    formData.append('gatherExhId', writeMyDiaryInfo.gatherExhId);
    formData.append('title', writeMyDiaryInfo.title);
    formData.append('rate', writeMyDiaryInfo.rate);
    formData.append('diaryPrivate', writeMyDiaryInfo.diaryPrivate);
    formData.append('contents', editorContent);

    // 기록 생성에만 추가
    if (
      writeMyDiaryInfo.thumbnail?.search('file://') !== undefined &&
      writeMyDiaryInfo.thumbnail?.search('file://') !== null &&
      writeMyDiaryInfo.thumbnail?.search('file://') !== -1
    ) {
      const resizedImage = await ImageResizer.createResizedImage(
        writeMyDiaryInfo.thumbnail ?? '', // path
        300, // width
        300, // height
        'JPEG', // format
        100, // quality
        undefined, // rotation
        // uploadFileName, // outputPath
        undefined, // keepMeta,
        undefined, // options => object
      );
      const uri = resizedImage.uri;
      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('thumbnail', {
        name: filename,
        type,
        uri: uri,
      });
    }

    formData.append('writeDate', changeDotToHyphen(dateToString(new Date())));
    formData.append('saying', writeMyDiaryInfo.saying);
    setCreateFormData(formData);
  };

  return (
    <Container>
      <BackView title="기록 작성" line={true} children={null} />
      <ContentsContainer>
        <CustomDiaryEditor
          handleEditorContent={setEditorContent}
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
