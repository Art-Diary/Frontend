import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {
  heightPercentage as hp,
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import {
  useDeleteGathering,
  useFetchGatheringInfo,
} from '~/api/queries/gathering';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import NameList from '~/components/mate/NameList';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {FlatList, TouchableOpacity} from 'react-native';
import {AddMyExhButton} from '~/assets/images';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {useGatheringListParamsActions} from '~/zustand/gathering/gathering';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';

interface ExhInfo {
  exhId: number;
  poster: string;
  exhName: string;
  rate?: number;
}

const GatheringInfoScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const {updateTab} = useTabIdentifierActions();
  const {updateGatheringListParams} = useGatheringListParamsActions();
  const {enterGatheringInfo} = useEnterGatheringInfo();
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: gatheringInfo,
    isLoading,
    isError,
    isSuccess,
  } = useFetchGatheringInfo(enterGatheringInfo.gatherId);
  const {
    mutate: deleteGathering,
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useDeleteGathering(enterGatheringInfo.gatherId);

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'gathering') {
        updateTab('gathering');
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (deleteError) {
      handleCloseModal();
      showToast('모임 탈퇴에 실패했습니다.');
    }
    if (deleteSuccess) {
      handleCloseModal();
      showToast('성공적으로 모임을 탈퇴했습니다.');
      // 이전 페이지로 이동
      navigation.goBack();
    }
  }, [deleteError, deleteSuccess]);

  if (isError) {
    return <ErrorMessageView message="모임 정보 조회 실패:(" />;
  }

  if (isLoading) {
    return <LoadingModal message="모임 정보 조회 중:)" />;
  }

  // TODO
  const pressNewExhMate = () => {
    // 모임에 새로운 전시 메이트 추가
  };

  const pressNewExh = () => {
    // 모임에 새로운 전시회 일정 추가
    navigation.navigate('GatheringRoutes', {
      screen: 'SearchAddVisitExhInGathering',
      params: undefined,
    });
  };

  const pressExh = (item: ExhInfo) => {
    // 모임의 기록으로 넘어가기
    updateVisitedExhId(item.exhId);
    updateGatheringListParams({
      gatherId: enterGatheringInfo.gatherId,
      exhId: item.exhId,
    });
    navigation.navigate('GatheringRoutes', {
      screen: 'GatheringDiaryList',
      params: undefined,
    });
  };

  const pressGetOut = () => {
    // 나가기 모달 열기
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    // 나가기 모달 닫기
    setIsOpen(false);
  };

  const handleDeleteGathering = () => {
    // 모임 나가기 api
    deleteGathering();
  };

  return (
    <Container>
      {/* header */}
      <BackView title={enterGatheringInfo.gatherName} line={true} />
      {/* body */}
      <Contents>
        <ExhMates>
          <ContentText>전시 메이트</ContentText>
          <NameList
            itemList={gatheringInfo.mates}
            handleCreate={pressNewExhMate}
            handleClickItem={null}
          />
        </ExhMates>
        <Dot />
        <ExhListWrapper>
          <ExhListTitle>
            <ContentText>함께 한 전시 리스트</ContentText>
            <TouchableOpacity onPress={pressNewExh}>
              <AddMyExhButton />
            </TouchableOpacity>
          </ExhListTitle>
          {/* 모임이 방문한 전시회 리스트 */}
          <FlatList
            data={gatheringInfo.exhibitions}
            renderItem={({item, index}) => (
              <ExhItemView
                key={index}
                exhInfo={item}
                noLine={gatheringInfo.exhibitions.length - 1 === index}
                notTouchable={false}
                onTouch={() => pressExh(item)}
                haveRate={true}
              />
            )}
          />
        </ExhListWrapper>
        {/* 모임 나가기 버튼 */}
        <DeleteTouch onPress={pressGetOut}>
          <OutButton>모임 나가기</OutButton>
        </DeleteTouch>
        {isOpen && (
          <ConfirmationModal handleCloseModal={handleCloseModal}>
            <Message>모임을 나가겠습니까?</Message>
            <TouchableOpacity onPress={handleDeleteGathering}>
              <DeleteButton>나가기</DeleteButton>
            </TouchableOpacity>
          </ConfirmationModal>
        )}
      </Contents>
    </Container>
  );
};

export default GatheringInfoScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  padding-top: ${wp(12)}px;
  gap: ${wp(12)}px;
`;

const ExhMates = styled.View`
  flex-direction: column;
  padding-left: ${wp(12)}px;
  padding-right: ${wp(12)}px;
  gap: ${wp(12)}px;
`;

const ExhListWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  gap: ${wp(5)}px;
`;

const ExhListTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-left: ${wp(12)}px;
  padding-right: ${wp(13)}px;
`;

const ContentText = styled.Text`
  font-size: ${fp(22)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const Dot = styled.View`
  width: 100%;
  border-bottom-width: ${wp(1.3)}px;
  border-bottom-color: #d3d3d3;
  border-style: dashed;
`;

const OutButton = styled.Text`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: #ff6f61;
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${fp(17.9)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding-top: ${hp(45)}px;
  padding-bottom: ${hp(45)}px;
`;

const DeleteTouch = styled.TouchableOpacity`
  padding-left: ${wp(12)}px;
  padding-right: ${wp(12)}px;
`;

const DeleteButton = styled.Text`
  text-align: center;
  margin-top: ${hp(14)}px;
  font-size: ${fp(17.9)}px;
  font-family: 'omyu pretty';
  color: white;
  background-color: #ff6f61;
  padding-top: ${hp(9.5)}px;
  padding-bottom: ${hp(9.5)}px;
  border-radius: 5px;
`;
