import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Modal,
  PanResponder,
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

// import {
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import CreditCardFront from './CreditCardFront';
// import CreditCardBack from './CreditCardBack';

const MyDiaryList = () => {
  const myExhId = useMyDiaryExhId();
  const navigation = useNavigation<RootStackNavigationProp>();
  // const {data: myDiaryList, isLoading, isError} = useFetchMyDiaryList(myExhId);

  // if (isError) {
  //   return <InfoMessage message={'에러 발생 ;('} />;
  // }

  // if (isLoading) {
  //   return <Loading message={'로딩 중 :)'} />;
  // }
  const myDiaryList = myDiaryListData;

  if (myDiaryList.length === 0) {
    return <InfoMessage message={'아직 전시회에 대한 기록이 없습니다 >_<'} />;
  }

  const move = () => {
    navigation.navigate('MyAddExhibition');
  };

  const [isFlipped, setIsFlipped] = useState(false); // 상태 추가
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  //
  // const rotate = useSharedValue(0);
  // const frontAnimatedStyles = useAnimatedStyle(() => {
  //   const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
  //   return {
  //     transform: [
  //       {
  //         rotateY: withTiming(`${rotateValue}deg`, {duration: 1000}),
  //       },
  //     ],
  //   };
  // });
  // const backAnimatedStyles = useAnimatedStyle(() => {
  //   const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
  //   return {
  //     transform: [
  //       {
  //         rotateY: withTiming(`${rotateValue}deg`, {duration: 1000}),
  //       },
  //     ],
  //   };
  // });
  // const spinValue = new Animated.Value(0);
  // const rotate = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '180deg'],
  // });

  // const handleAnimation = () => {
  //   spinValue.setValue(0);
  //   Animated.timing(spinValue, {}).start(() => {
  //     spinValue.setValue(0);
  //   });
  // };

  // const frontAnimatedStyles = useAnimatedStyle(() => {
  //   const rotateValue = spinValue.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [0, 180],
  //   });
  //   return {
  //     transform: [
  //       {
  //         rotateY: withTiming(`${rotateValue}deg`, {duration: 1000}),
  //       },
  //     ],
  //   };
  // });
  // const backAnimatedStyles = useAnimatedStyle(() => {
  //   const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
  //   return {
  //     transform: [
  //       {
  //         rotateY: withTiming(`${rotateValue}deg`, {duration: 1000}),
  //       },
  //     ],
  //   };
  // });

  // PanResponder를 생성합니다.
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // 수직으로 스크롤되었는지 확인합니다.
        if (gestureState.dy < -50) {
          setIsFlipped(true); // 버튼을 보이도록 상태를 변경합니다.
        } else if (gestureState.dy > 50) {
          setIsFlipped(false); // 버튼을 숨기도록 상태를 변경합니다.
        }
      },
      onPanResponderRelease: () => {
        // 손을 뗄 때 버튼 상태를 초기화합니다.
        setIsFlipped(false);
      },
    }),
  ).current;
  /**
   * 기록 추가, 수정
   */
  return (
    <Swiper
      style={styles.wrapper}
      // onIndexChanged={(state) => {
      //   // const {index} = state;
      //   // 현재 화면의 인덱스를 확인하여 isFlipped 상태를 변경
      //   setIsFlipped(state === 1); // 첫 번째 화면(앞면)이면 isFlipped를 false로, 두 번째 화면(뒷면)이면 true로 설정
      // }}
      // // onTouchStart={() => setIsFlipped(false)} // 스와이프 시작시 뒤집은 상태 초기화
      // // onTouchMove={toggleFlip}
      scrollEnabled={!isFlipped}
      showsPagination={true}>
      {myDiaryList.map((item: any) => (
        <Container key={item.diaryId}>
          {/* {...panResponder.panHandlers} */}
          {/* <Animatable.View
            animation={isFlipped ? 'flipInY' : 'flipInY'}
            duration={300}
            style={{flex: 1}}>
            {isFlipped === true ? (
              
            ) : (
              
            )}
          </Animatable.View> */}
          <TouchableOpacity onPress={toggleFlip}>
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
            </Shadow>
          </TouchableOpacity>
          {isFlipped && (
            <>
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
            </>
          )}

          {/* <Animated.View style={[styles.frontcard]}>
            <CreditCardFront rotate={rotate} />
          </Animated.View>
          <Animated.View style={[styles.backCard]}>
            <CreditCardBack rotate={rotate} />
          </Animated.View> */}
          {/* <FlipCard
            // onFlipStart={() => navigation.setOptions({gestureEnabled: true})}
            onFlipStart={toggleFlip}
            onFlipEnd={toggleFlip}
            // onFlipStart={() => setIsFlipped(true)}
            // onFlipEnd={toggleFlip}
            // flipped={isFlipped} // 뒤집혔는지 여부 전달
            // onFlip={toggleFlip} // 카드 뒤집기 토글 함수 연결
          > */}
          {/* <Shadow distance={5}>
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
          </Shadow> */}
          {/* Back Side */}
          {/* <Shadow distance={5}>
              <Contents>
                <ContentsInfo
                  contents={item.contents}
                  writeDate={item.writeDate}
                />
              </Contents>
            </Shadow> */}
          {/* <TouchableOpacity onPress={move}>내용</TouchableOpacity> */}
          {/* </FlipCard> */}
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
