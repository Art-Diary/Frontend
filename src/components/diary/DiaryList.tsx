import React, {useRef} from 'react';
import {ScrollView, Pressable} from 'react-native';
import ThumbnailInfo from '~/components/diary/ThumbnailInfo';
import TitleInfo from '~/components/diary/TitleInfo';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import WriterRateInfo from '~/components/diary/WriterRateInfo';
import OtherInfo from '~/components/diary/OtherInfo';
import SayingInfo from '~/components/diary/SayingInfo';
import {Shadow} from 'react-native-shadow-2';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useMyDiaryBackActions} from '~/zustand/mydiary/mydiary';
import {useTabIdentifierInfo} from '~/zustand/tabIdentifier';

interface DiaryListProps {
  diaryList: any[];
}

const DiaryList: React.FC<DiaryListProps> = ({diaryList}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateforBackInfo} = useMyDiaryBackActions();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const scrollViewRef = useRef<ScrollView>(null);

  const onPressBack = (item: any) => {
    updateforBackInfo(item.contents, item.writeDate);
    if (tabIdentifierInfo.tab === 'mydiary') {
      navigation.navigate('MyDiaryBack');
    } else {
      navigation.navigate('CalendarDiaryBack');
    }
  };

  const handleIsDeleted = (isLastItem: boolean) => {
    if (isLastItem) {
      const itemWidth = wp(360);
      const scrollToX = (diaryList.length - 2) * itemWidth;

      scrollViewRef.current?.scrollTo({x: scrollToX, animated: true});
    }
  };

  return (
    <CarouselContainer style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        horizontal
        pagingEnabled
        contentContainerStyle={{width: `${100 * diaryList.length}%`}}
        scrollEventThrottle={200}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={true}>
        {diaryList.map((item: any, index: number) => {
          return (
            <Pressable key={index} onPress={() => onPressBack(item)}>
              <CarouselItemContainer width={wp(360)}>
                <Container>
                  <Shadow distance={5}>
                    <ThumbnailInfo thumbnail={item.thumbnail} />
                    <Contents>
                      <TitleInfo
                        diaryInfo={item}
                        handleIsDeleted={() =>
                          handleIsDeleted(diaryList.length - 1 === index)
                        }
                      />
                      <WriterRateInfo
                        nickname={item.nickname}
                        rate={item.rate}
                      />
                      <OtherInfo
                        userExhId={item.userExhId}
                        gatherName={item.gatherName}
                        visitDate={item.visitDate}
                        diaryPrivate={item.diaryPrivate}
                      />
                      <SayingInfo saying={item.saying} exhName={item.exhName} />
                    </Contents>
                  </Shadow>
                </Container>
              </CarouselItemContainer>
            </Pressable>
          );
        })}
      </ScrollView>
    </CarouselContainer>
  );
};

export default DiaryList;

/** style */
const CarouselContainer = styled.View`
  flex: 1;
`;

interface CarouselItemContainerProps {
  width: number;
}

const CarouselItemContainer = styled.View<CarouselItemContainerProps>`
  width: ${({width}: CarouselItemContainerProps) => width}px;
  height: 100%;
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
