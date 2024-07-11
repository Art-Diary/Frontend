import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import ThumbnailInfo from '~/components/diary/ThumbnailInfo';
import TitleInfo from '~/components/diary/TitleInfo';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import WriterRateInfo from '~/components/diary/WriterRateInfo';
import OtherInfo from '~/components/diary/OtherInfo';
import SayingInfo from '~/components/diary/SayingInfo';
import {Shadow} from 'react-native-shadow-2';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useTabIdentifierInfo} from '~/zustand/tabIdentifier';
import {useDiaryBackActions} from '~/zustand/common/diaryBack';
import {useUserInfo} from '~/zustand/auth/auth';
import DeleteDiaryModal from './modal/DeleteDiaryModal';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';

type DeleteActions = {
  handleShowOptionBar: (show: boolean) => void; // 내가 작성한 기록만 옵션바가 보이도록
  isDeleteModalOpen: boolean; // 옵션 모달에서 삭제 눌렀는지
  handleCloseDeleteModal: () => void; // 삭제 모달 닫기
  handleCloseOptionModal: () => void; // 옵션 모달 닫기
};

type UpdateActions = {
  isUpdateClicked: boolean;
  handleUpdateClicked: () => void;
  handleCloseOptionModal: () => void; // 옵션 모달 닫기
};

interface DiaryListProps {
  diaryList: any[];
  deleteActions?: DeleteActions;
  updateActions?: UpdateActions;
}

const DiaryList: React.FC<DiaryListProps> = ({
  diaryList,
  deleteActions,
  updateActions,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateBackInfo} = useDiaryBackActions();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const scrollViewRef = useRef<ScrollView>(null);
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const {authInfo} = useUserInfo();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    updateIsUpdate,
    updateforIds,
    updateforDetailInfo,
    updateforContent,
    updateInGathering,
  } = useWriteMyDiaryActions();
  const tabIdentifier = useTabIdentifierInfo();

  useEffect(() => {
    if (deleteActions) {
      if (diaryList[currentPage].userId === authInfo.userId) {
        deleteActions.handleShowOptionBar(true);
      } else {
        deleteActions.handleShowOptionBar(false);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    if (updateActions?.isUpdateClicked) {
      const onPressUpdate = () => {
        updateIsUpdate(true);
        updateforIds(
          diaryList[currentPage].diaryId
            ? diaryList[currentPage].diaryId
            : null,
          diaryList[currentPage].userExhId ?? -1,
          diaryList[currentPage].gatherExhId ?? -1,
        );
        updateforDetailInfo(
          diaryList[currentPage].title,
          diaryList[currentPage].rate,
          diaryList[currentPage].diaryPrivate,
          diaryList[currentPage].thumbnail,
          diaryList[currentPage].writeDate,
          diaryList[currentPage].saying,
        );
        updateforContent(diaryList[currentPage].contents);
        updateInGathering(false, null);
        updateActions.handleUpdateClicked();
        updateActions.handleCloseOptionModal();
        if (
          tabIdentifier.tab === 'mydiary' ||
          tabIdentifier.tab === 'gathering'
        ) {
          navigation.navigate('AddMyVisitDateRoutes');
        } else {
          navigation.navigate('WriteMyDiaryRoutes');
        }
      };

      onPressUpdate();
    }
  }, [updateActions?.isUpdateClicked]);

  const onPressBack = (item: any) => {
    updateBackInfo({
      contents: item.contents,
      writeDate: item.writeDate,
    });
    if (tabIdentifierInfo.tab === 'mydiary') {
      navigation.navigate('MyDiaryBack');
    } else if (tabIdentifierInfo.tab === 'calendar') {
      navigation.navigate('CalendarDiaryBack');
    } else if (tabIdentifierInfo.tab === 'mate') {
      navigation.navigate('MateDiaryBack');
    } else if (tabIdentifierInfo.tab === 'gathering') {
      navigation.navigate('GatheringRoutes', {
        screen: 'GatheringDiaryBack',
        params: undefined,
      });
    } else if (tabIdentifierInfo.tab === 'exhibition') {
      navigation.navigate('ExhToDiaryBack');
    }
    // [NEW] 추가
  };

  const handleIsDeleted = (isLastItem: boolean) => {
    if (isLastItem) {
      const itemWidth = wp(100);
      const scrollToX = (diaryList.length - 2) * itemWidth;

      scrollViewRef.current?.scrollTo({x: scrollToX, animated: true});
    }
  };

  const handleDeletePage = (pageIndex: number) => {
    handleIsDeleted(diaryList.length - 1 === pageIndex);
    deleteActions?.handleCloseOptionModal();
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width;
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(scrollPosition / slideWidth);
    setCurrentPage(newPage);
  };

  return (
    <CarouselContainer style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        horizontal
        pagingEnabled
        contentContainerStyle={{width: `${100 * diaryList.length}%`}}
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={true}
        onScroll={handleScroll}>
        {diaryList.map((item: any, index: number) => {
          return (
            <Pressable key={index} onPress={() => onPressBack(item)}>
              <CarouselItemContainer width={wp(100)}>
                <Container>
                  <Shadow distance={5}>
                    <ThumbnailInfo thumbnail={item.thumbnail} />
                    <ScrollView>
                      <Contents>
                        <TitleInfo diaryInfo={item} />
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
                        <SayingInfo
                          saying={item.saying}
                          exhName={item.exhName}
                        />
                      </Contents>
                    </ScrollView>
                  </Shadow>
                </Container>
              </CarouselItemContainer>
            </Pressable>
          );
        })}
      </ScrollView>
      {/* 수정 | 삭제 */}
      {deleteActions && deleteActions.isDeleteModalOpen && (
        <DeleteDiaryModal
          deleteInfo={{
            exhId: visitedExhId,
            diaryId: diaryList[currentPage].diaryId,
            userExhId: diaryList[currentPage].userExhId,
          }}
          handleCloseModal={deleteActions.handleCloseDeleteModal}
          message="기록을 삭제하겠습니까?"
          handleSuccessDelete={() => handleDeletePage(currentPage)}
        />
      )}
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
  padding-bottom: ${hp(0.8)}px;
  padding-left: ${wp(1.3)}px;
  padding-right: ${wp(1.3)}px;
  background-color: white;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: ${hp(3.5)}px;
  /* padding-bottom: ${hp(3.5)}px; */
  padding-left: ${wp(8.3)}px;
  padding-right: ${wp(8.3)}px;
`;
