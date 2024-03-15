import React from 'react';
import {StyleSheet} from 'react-native';
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

const MyDiaryList = () => {
  const myExhId = useMyDiaryExhId();
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

  /**
   * 기종마다 비율 같게
   *
   * 기록 추가, 수정
   */
  return (
    <Swiper
      style={styles.wrapper}
      // showsButtons={true}
      // prevButton={
      //   <Text style={styles.prevButtonText}>
      //     <LeftArrowIcon />
      //   </Text>
      // }
      // nextButton={
      //   <Text style={styles.nextButtonText}>
      //     <RightArrowIcon />
      //   </Text>
      // }
      showsPagination={true}>
      {myDiaryList.map((item: any) => (
        <Container key={item.diaryId}>
          <Shadow distance={5}>
            {/* 썸네일 */}
            <ThumbnailInfo thumbnail={item.thumbnail} />
            {/* 세부 내용 */}
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
  background-color: #f6f6f6;
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
});
