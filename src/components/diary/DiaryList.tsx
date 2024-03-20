import React, {useState} from 'react';
import {ScrollView, Pressable} from 'react-native';
import InfoMessage from '~/components/common/InfoMessage';
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
import {useMyDiaryBackActions, useMyExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useFetchMyDiaryList} from '~/api/queries/mydiary';
import Loading from '../common/Loading';

const DiaryList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateforBackInfo} = useMyDiaryBackActions();
  const myExhId = useMyExhIdInfo();
  const [itemWidth, setItemWidth] = useState(0);
  const {data: myDiaryList, isLoading, isError} = useFetchMyDiaryList(myExhId);

  if (isError) {
    return <InfoMessage message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <Loading message={'로딩 중 :)'} />;
  }

  if (myDiaryList.length === 0) {
    return <InfoMessage message={'아직 전시회에 대한 기록이 없습니다 >_<'} />;
  }

  const onPressBack = (item: any) => {
    updateforBackInfo(item.contents, item.writeDate);
    navigation.navigate('MyDiaryBack');
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
        {myDiaryList.map((item: any, index: number) => {
          return (
            <Pressable key={index} onPress={() => onPressBack(item)}>
              <CarouselItemContainer width={itemWidth}>
                <Container>
                  <Shadow distance={5}>
                    <ThumbnailInfo thumbnail={item.thumbnail} />
                    <Contents>
                      <TitleInfo
                        diaryId={item.diaryId}
                        title={item.title}
                        userExhId={item.userExhId}
                      />
                      <WriterRateInfo nickname={item.nickname} rate={'3.0'} />
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
