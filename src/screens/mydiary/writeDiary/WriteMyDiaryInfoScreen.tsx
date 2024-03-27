import React, {useCallback, useState} from 'react';
import {Alert, Image, Platform, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import BackView from '~/components/common/BackView';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {
  CameraIcon,
  EmptyStarIcon,
  FillStarIcon,
  PrivateToggle,
  PublicToggle,
} from '~/assets/images';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {RootStackNavigationProp} from '~/App';

const WriteMyDiaryInfoScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [starNum, setStarNum] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [titleKeyword, setTitleKeyword] = useState<string>('');
  const [sayingKeyword, setSayingKeyword] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const {updateforDetailInfo} = useWriteMyDiaryActions();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then(result => {
          if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
            return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          } else {
            console.log(result);
            throw new Error('카메라 지원 안 함');
          }
        })
        .catch(console.error);
    }
  };

  const showPhoto = async () => {
    await requestCameraPermission();

    const option: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    const response = await launchImageLibrary(option);

    if (response.errorMessage) {
      Alert.alert('Error : ' + response.errorMessage);
    } else {
      const uris: Asset[] = [];

      response.assets?.forEach(value => uris.push(value));

      const imageUri = uris[0].uri;

      setImageUri(imageUri);
    }
  };

  const changeStarNum = (num: number) => {
    setStarNum(num);
  };

  const changeToggle = () => {
    setIsPublic(!isPublic);
  };

  const onChangeTitle = useCallback((text: string) => {
    setTitleKeyword(text);
  }, []);

  const onChangeSaying = useCallback((text: string) => {
    setSayingKeyword(text);
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

  const onClickNextButton = async () => {
    const today = new Date();
    const dateList = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ];
    if (imageUri === undefined) {
      console.log('사진 uri 없음.');
      return;
    }
    updateforDetailInfo(
      titleKeyword,
      starNum,
      isPublic,
      imageUri,
      dateList,
      sayingKeyword,
    );
    // 기록 내용 작성 페이지로 이동
    navigation.navigate('WriteMyDiaryContents');
  };

  return (
    <Container>
      <BackView title="기록 작성" line={true} children={null} />
      <ContentsContainer>
        {/* 기록 정보 작성 */}
        <WriteTitle
          placeholderTextColor="#D3D3D3"
          placeholder={'제목'}
          onChangeText={onChangeTitle}
          value={titleKeyword}
        />
        <SecondSection>
          <HalfSection>
            <SectionName>별점</SectionName>
            <StarList>
              <TouchableOpacity onPress={() => changeStarNum(1)}>
                {starNum >= 1 ? <FillStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStarNum(2)}>
                {starNum >= 2 ? <FillStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStarNum(3)}>
                {starNum >= 3 ? <FillStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStarNum(4)}>
                {starNum >= 4 ? <FillStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStarNum(5)}>
                {starNum >= 5 ? <FillStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
            </StarList>
          </HalfSection>
          <HalfSection>
            <SectionName>공개 여부</SectionName>
            <TouchableOpacity onPress={changeToggle}>
              {isPublic ? <PublicToggle /> : <PrivateToggle />}
            </TouchableOpacity>
          </HalfSection>
        </SecondSection>
        <SayingSection>
          <SectionName>한마디</SectionName>
          <WriteSayingSection>
            <SectionName>"</SectionName>
            <WriteSaying
              placeholderTextColor="#D3D3D3"
              placeholder={'한마디'}
              value={sayingKeyword}
              onChangeText={onChangeSaying}
            />
            <SectionName>"</SectionName>
          </WriteSayingSection>
        </SayingSection>
        <ThumbnailSection>
          <SectionName>대표사진</SectionName>
          <PutThumbnail>
            {imageUri === undefined ? (
              <TouchableOpacity style={{padding: 30}} onPress={showPhoto}>
                <CameraIcon />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
                onPress={showPhoto}>
                <Image
                  source={{uri: imageUri}}
                  style={{width: '100%', height: '100%', alignItems: 'center'}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </PutThumbnail>
        </ThumbnailSection>
        {/* 다음 버튼 */}
        {!checkKeyword(titleKeyword) &&
        !checkKeyword(sayingKeyword) &&
        starNum > 0 &&
        imageUri !== undefined ? (
          <TouchableOpacity onPress={onClickNextButton}>
            <NextButton moveNext={true}>다음</NextButton>
          </TouchableOpacity>
        ) : (
          <NextButton moveNext={false}>다음</NextButton>
        )}
      </ContentsContainer>
    </Container>
  );
};

export default WriteMyDiaryInfoScreen;

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

const WriteTitle = styled.TextInput`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 5px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
`;

const SecondSection = styled.View`
  width: 100%;
  flex-direction: row;
  gap: ${wp(10)}px;
`;

const HalfSection = styled.View`
  flex: 1;
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 5px;
  width: 50%;
  padding-top: ${wp(10)}px;
  padding-bottom: ${wp(10)}px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const SectionName = styled.Text`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const StarList = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SayingSection = styled.View`
  flex-direction: column;
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 5px;
  width: 100%;
  padding-top: ${wp(10)}px;
  padding-bottom: ${wp(10)}px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  gap: ${hp(10)}px;
`;

const WriteSayingSection = styled.View`
  flex-direction: row;
`;

const WriteSaying = styled.TextInput`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const ThumbnailSection = styled.View`
  flex: 1;
  flex-direction: column;
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 5px;
  width: 100%;
  padding-top: ${wp(10)}px;
  padding-bottom: ${wp(10)}px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  gap: ${hp(10)}px;
`;

const PutThumbnail = styled.View`
  flex: 1;
  background-color: rgba(217, 217, 217, 0.3);
  align-items: center;
  justify-content: center;
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
