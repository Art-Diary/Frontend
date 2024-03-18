import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Button,
} from 'react-native';
import InfoMessage from '~/components/common/InfoMessage';
import ContentsInfo from '~/components/mydiary/ContentsInfo';
import ThumbnailInfo from '~/components/mydiary/ThumbnailInfo';
import TitleInfo from '~/components/mydiary/TitleInfo';
import {myDiaryListData} from '../dataset';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import WriterRateInfo from '~/components/mydiary/WriterRateInfo';
import OtherInfo from '~/components/mydiary/OtherInfo';
import SayingInfo from '~/components/mydiary/SayingInfo';
import {Shadow} from 'react-native-shadow-2';
import {BackButton} from '~/assets/images';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useMyDiaryActions} from '~/zustand/mydiary/mydiary';

const MyDiaryList = () => {
  const [isFlippedIndex, setIsFlippedIndex] = useState(null);
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isFlipped, setIsFlipped] = useState(false); // 상태 추가
  const {updateMyDiaryInfo} = useMyDiaryActions();

  const myDiaryList = myDiaryListData;

  if (myDiaryList.length === 0) {
    return <InfoMessage message={'아직 전시회에 대한 기록이 없습니다 >_<'} />;
  }

  const data = ['tomato', 'skyblue', 'green', 'beige', 'yellow'];
  const [itemWidth, setItemWidth] = useState(0);

  const move = (item: any) => {
    updateMyDiaryInfo({
      diaryId: item.diaryId,
      title: item.title,
      rate: item.rate,
      diaryPrivate: item.diaryPrivate,
      contents: item.contents,
      thumbnail: item.thumbnail,
      writeDate: item.writeDate,
      saying: item.saying,
      nickname: item.nickname,
      gatherName: item.gatherName,
      visitDate: item.visitDate,
      exhName: item.exhName,
      userExhId: item.userExhId,
      gatheringExhId: item.gatheringExhId,
    });
    navigation.navigate('MyDiaryBack');
    // setIsFlipped(!isFlipped);
  };

  return (
    <CarouselContainer style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        horizontal
        pagingEnabled
        contentContainerStyle={{width: `${100 * myDiaryList.length}%`}}
        scrollEventThrottle={200}
        decelerationRate="fast"
        onContentSizeChange={w => setItemWidth(w / myDiaryList.length)}
        showsHorizontalScrollIndicator={false}>
        <Row>
          {myDiaryList.map(item => {
            return (
              <TouchableOpacity
                onPress={() => move(item)}
                key={item.gatheringExhId}>
                <CarouselItemContainer width={itemWidth}>
                  {/* <CarouselItem color={item} /> */}
                  <Container key={item.diaryId}>
                    {/* <Pressable onPress={toggleFlip}> */}
                    <Shadow distance={5}>
                      <ThumbnailInfo thumbnail={item.thumbnail} />
                      <Contents>
                        <TitleInfo diaryId={item.diaryId} title={item.title} />
                        <WriterRateInfo nickname={item.nickname} rate={'3.0'} />
                        <OtherInfo
                          userExhId={item.userExhId}
                          gatherName={item.gatherName}
                          visitDate={item.visitDate}
                          diaryPrivate={item.diaryPrivate}
                        />
                        <SayingInfo
                          saying={item.saying}
                          exhName={item.exhName}
                        />
                      </Contents>
                      {/* <Button title="내용보기" onPress={toggleFlip}></Button> */}
                    </Shadow>
                  </Container>
                </CarouselItemContainer>
              </TouchableOpacity>
            );
          })}
        </Row>
      </ScrollView>
    </CarouselContainer>
  );
};

export default MyDiaryList;
const CarouselContainer = styled.View`
  flex: 1;
`;
const Row = styled.View`
  flex-direction: row;
`;
interface CarouselItemContainerProps {
  width: number;
}

const CarouselItemContainer = styled.View<CarouselItemContainerProps>`
  width: ${({width}: CarouselItemContainerProps) => width}px;
  height: 100%;
  // padding: 20px;
`;

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
