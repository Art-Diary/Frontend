import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
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
import {LeftArrowIcon, RightArrowIcon} from '~/assets/images';

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
        <View key={item.diaryId} style={myDiaryStyles.wrapView}>
          <View style={myDiaryStyles.shadowView}>
            {/* 썸네일 */}
            <ThumbnailInfo thumbnail={item.thumbnail} />
            {/* 세부 내용 */}
            <View style={myDiaryStyles.infoView}>
              <TitleInfo diaryId={item.diaryId} title={item.title} />
              <WriterRateInfo nickname={item.nickname} rate={item.rate} />
              <OtherInfo
                userExhId={item.userExhId}
                gatherName={item.gatherName}
                visitDate={item.visitDate}
                diaryPrivate={item.diaryPrivate}
              />
              <SayingInfo saying={item.saying} exhName={item.exhName} />
            </View>
          </View>
        </View>
      ))}
    </Swiper>
  );
};

export default MyDiaryList;

/** style */
const myDiaryStyles = StyleSheet.create({
  wrapView: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 5,
    paddingHorizontal: 3,
    backgroundColor: '#F6F6F6',
  },
  shadowView: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 3.5,
    paddingTop: 4.5,
    borderColor: 'white',
    borderWidth: 0.1,
    ...Platform.select({
      android: {
        elevation: 2.5,
      },
    }),
  },
  infoView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});

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
