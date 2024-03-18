import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Modal,
  PanResponder,
  Pressable,
  Button,
} from 'react-native';
import styled from 'styled-components/native';
import {Shadow} from 'react-native-shadow-2';
import InfoMessage from '~/components/common/InfoMessage';
import {useMyDiaryExhId} from '~/zustand/mydiary/mydiary';
import Loading from '~/components/common/Loading';
import {useFetchMyDiaryList} from '~/api/queries/mydiary';
import ThumbnailInfo from '~/components/mydiary/ThumbnailInfo';
import TitleInfo from '~/components/mydiary/TitleInfo';
import WriterRateInfo from '~/components/mydiary/WriterRateInfo';
import OtherInfo from '~/components/mydiary/OtherInfo';
import SayingInfo from '~/components/mydiary/SayingInfo';
import Swiper from 'react-native-swiper';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import FlipCard from 'react-native-flip-card';
import ContentsInfo from '~/components/mydiary/ContentsInfo';
import {myDiaryListData} from '../dataset';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import * as Animatable from 'react-native-animatable';
import Header from '~/components/common/Header';
import {BackButton} from '~/assets/images';
import BackView from '~/components/common/BackView';

const MyDiaryList = () => {
  const myExhId = useMyDiaryExhId();
  const navigation = useNavigation<RootStackNavigationProp>();
  const myDiaryList = myDiaryListData;

  if (myDiaryList.length === 0) {
    return <InfoMessage message={'아직 전시회에 대한 기록이 없습니다 >_<'} />;
  }

  const move = () => {
    navigation.navigate('MyAddExhibition');
  };

  const [isFlipped, setIsFlipped] = useState(false); // 상태 추가
  const [swipeEnabled, setSwipeEnabled] = useState(true); // 스와이프 활성화 여부 상태 추가

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  // 모달 열릴 때 스와이프 동작 비활성화
  const handleModalOpen = () => {
    setSwipeEnabled(false);
  };

  // 모달 닫힐 때 스와이프 동작 다시 활성화
  const handleModalClose = () => {
    setSwipeEnabled(true);
  };
  /**
   * 기록 추가, 수정
   */
  return (
    <Swiper
      style={styles.wrapper}
      // scrollEnabled={!isFlipped}
      scrollEnabled={swipeEnabled}
      showsPagination={true}>
      {myDiaryList.map((item: any) => (
        <Container key={item.diaryId}>
          {/* <Pressable onPress={toggleFlip}> */}
          <Shadow distance={5}>
            <ThumbnailInfo thumbnail={item.thumbnail} />
            <Contents>
              <TitleInfo diaryId={item.diaryId} title={item.title} />
              <WriterRateInfo nickname={item.nickname} rate={item.rate} />
              <OtherInfo
                userExhId={item.userExhId}
                gatherName={item.gatherName}
                visitDate={item.visitDate}
                diaryPrivate={item.diaryPrivate}
              />
              <SayingInfo saying={item.saying} exhName={item.exhName} />
            </Contents>
            <Button title="내용보기" onPress={toggleFlip}></Button>
          </Shadow>
          {/* </Pressable>
           */}
          {isFlipped && (
            <ModalContainer onAccessibilityAction={handleModalOpen}>
              <Back>
                <TouchableOpacity onPress={toggleFlip}>
                  <BackButton />
                </TouchableOpacity>
              </Back>
              <Container>
                <Shadow distance={5}>
                  <Contents>
                    <ContentsInfo
                      contents={item.contents}
                      writeDate={item.writeDate}
                    />
                  </Contents>
                </Shadow>
              </Container>
            </ModalContainer>
          )}
        </Container>
      ))}
    </Swiper>
  );
};

export default MyDiaryList;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-bottom: ${hp(5)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  background-color: white;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: ${hp(20)}px;
  padding-bottom: ${hp(20)}px;
  padding-left: ${wp(30)}px;
  padding-right: ${wp(30)}px;
`;

const Back = styled.View`
  flex-direction: row;
  justify-content: space-between; // 양 끝으로 버튼 배치
  align-items: center;
  padding: ${hp(12.5)}px;
  width: 100%;
  height: ${hp(35)}px;
  background-color: #f6f6f6;
`;

const ModalContainer = styled.Modal`
  flex-direction: column;
  width: 100%;
  padding-bottom: ${hp(5)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  background-color: white;
`;

/** style for button */
const styles = StyleSheet.create({
  wrapper: {
    // Swiper styles
  },
  prevButtonText: {
    color: 'red', // 이전 화살표 색상
  },
  nextButtonText: {
    color: 'red', // 다음 화살표 색상
  },
  frontcard: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  backCard: {
    backfaceVisibility: 'hidden',
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: '#8ecae6',
    marginTop: 10,
    borderRadius: 5,
  },
});
