import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import BackView from '~/components/common/BackView';
import {
  useDeleteGathering,
  useFetchGatheringInfo,
} from '~/api/queries/gathering';
import LoadingModal from '~/components/common/modal/LoadingModal';
import NameList from '~/components/mate/NameList';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {FlatList, Modal, Pressable, TouchableOpacity} from 'react-native';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {useGatheringListParamsActions} from '~/zustand/gathering/gathering';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';
import {
  AddMyExhButtonIcon,
  LeaveGatheringIcon,
  OptionBarIcon,
} from '~/components/common/icon';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  DASH_WIDTH,
  FONT_NAME,
} from '~/components/common/style';
import {Shadow} from 'react-native-shadow-2';
import {useDateFromExhActions} from '~/zustand/calendar/dateFromExh';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOptionBarOpen, setIsOptionBarOpen] = useState(false);
  const {
    data: gatheringInfo,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchGatheringInfo(enterGatheringInfo.gatherId);
  const {
    mutate: deleteGathering,
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useDeleteGathering(enterGatheringInfo.gatherId);
  const {updateDate} = useDateFromExhActions();

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'gathering') {
        updateTab('gathering');
        updateDate(null);
      }
      refetch();
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
    showToast('모임 정보 조회 실패:(');
  }

  if (isLoading) {
    return <LoadingModal message="모임 정보 조회 중:)" />;
  }

  const pressNewExhMate = () => {
    // 모임에 새로운 전시 메이트 추가
    navigation.navigate('GatheringRoutes', {
      screen: 'AddNewMateInGathering',
      params: undefined,
    });
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

  // const pressGetOut = () => {
  //   // 나가기 모달 열기
  //   setIsDeleteModalOpen(true);
  // };

  const handleCloseModal = () => {
    // 나가기 모달 닫기
    setIsDeleteModalOpen(false);
  };

  const handleDeleteGathering = () => {
    // 모임 나가기 api
    deleteGathering();
  };

  const handleOpenOptionBar = (open: boolean) => {
    setIsOptionBarOpen(open);
  };

  const handleClickDeleteOption = () => {
    handleOpenOptionBar(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <Container>
      {/* header */}
      <BackView
        title={
          enterGatheringInfo.gatherName === ''
            ? '이전 페이지로 이동해주세요.'
            : enterGatheringInfo.gatherName
        }
        line={true}>
        <TouchableOpacity onPress={() => handleOpenOptionBar(!isOptionBarOpen)}>
          <OptionBarIcon />
          <Modal
            animationType="fade"
            transparent={true}
            visible={isOptionBarOpen}
            onRequestClose={() => handleOpenOptionBar(false)}>
            <Pressable
              // style={{borderWidth: 1}}backgroundColor: 'rgba(0, 0, 0, 0.3)'
              style={{flex: 1}}
              onPress={() => handleOpenOptionBar(false)}>
              <OptionWrapper>
                <Shadow distance={8}>
                  <TouchableOpacity onPress={handleClickDeleteOption}>
                    <OptionContent>
                      <LeaveGatheringIcon />
                      <OptionContentText>모임 나가기</OptionContentText>
                    </OptionContent>
                  </TouchableOpacity>
                </Shadow>
              </OptionWrapper>
            </Pressable>
          </Modal>
        </TouchableOpacity>
      </BackView>
      {/* body */}
      <Contents>
        <ExhMates>
          <ContentText>전시 메이트</ContentText>
          <RowView>
            <AddNewItem
              onPress={pressNewExhMate}
              disabled={enterGatheringInfo.gatherName === ''}>
              <NameText isAdd={true}>+</NameText>
            </AddNewItem>
            <NameList
              itemList={gatheringInfo ? gatheringInfo.mates : []}
              handleClickItem={null}
            />
          </RowView>
        </ExhMates>
        <Dot />
        <ExhListWrapper>
          <ExhListTitle>
            <ContentText>함께 한 전시 리스트</ContentText>
            <TouchableOpacity
              onPress={pressNewExh}
              disabled={enterGatheringInfo.gatherName === ''}>
              <AddMyExhButtonIcon />
            </TouchableOpacity>
          </ExhListTitle>
          {/* 모임이 방문한 전시회 리스트 */}
          <FlatList
            data={gatheringInfo ? gatheringInfo.exhibitions : []}
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
      </Contents>
      {/* 모임 나가기 버튼 */}
      {/* <DeleteTouch
        onPress={pressGetOut}
        disabled={enterGatheringInfo.gatherName === ''}>
        <OutButton>모임 나가기</OutButton>
      </DeleteTouch> */}

      {isDeleteModalOpen && (
        <ConfirmationModal handleCloseModal={handleCloseModal}>
          <Message>모임을 나가겠습니까?</Message>
          <TouchableOpacity onPress={handleDeleteGathering}>
            <DeleteButton>나가기</DeleteButton>
          </TouchableOpacity>
        </ConfirmationModal>
      )}
    </Container>
  );
};

export default GatheringInfoScreen;

/** style */
const Container = styled.View`
  flex: 1;
  /* padding-bottom: ${wp(3)}px; */
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
  padding-top: ${wp(3.3)}px;
  gap: ${wp(3.3)}px;
`;

const ExhMates = styled.View`
  flex-direction: column;
  padding-left: ${wp(3.3)}px;
  padding-right: ${wp(3.3)}px;
  gap: ${wp(3.3)}px;
`;

const ExhListWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ExhListTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-left: ${wp(3.3)}px;
  padding-right: ${wp(3.3)}px;
`;

const ContentText = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const Dot = styled.View`
  width: 100%;
  border-bottom-width: ${DASH_WIDTH}px;
  border-bottom-color: ${LIGHT_GREY};
  border-style: dashed;
`;

const RowView = styled.View`
  flex-direction: row;
  padding-bottom: ${hp(0.5)}px;
  gap: ${wp(2.3)}px;
`;

const AddNewItem = styled.TouchableOpacity`
  border-top-left-radius: ${BUTTON_RADIUS}px;
  border-top-right-radius: ${BUTTON_RADIUS}px;
  border-width: ${wp(0.3)}px;
  border-color: ${MIDDLE_GREY};
  padding-left: ${wp(4.2)}px;
  padding-right: ${wp(4.2)}px;
  height: ${wp(11.2)}px;
  align-items: center;
  justify-content: center;
`;

interface NameProps {
  isAdd: boolean;
}

const NameText = styled.Text<NameProps>`
  font-size: ${rf(18)}px;
  color: ${(props: NameProps) => (props.isAdd ? `${MIDDLE_GREY}` : 'white')};
  font-family: ${FONT_NAME};
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding: ${hp(8)}px;
`;

const DeleteButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const OptionWrapper = styled.View`
  /* flex: 1; */
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: ${wp(12)}px;
  margin-right: ${wp(5)}px;
`;

const OptionContent = styled.View`
  flex-direction: row;
  background-color: ${BACK_COLOR};
  align-items: center;
  gap: ${wp(3.3)}px;
  padding: ${wp(3.3)}px;
`;

const OptionContentText = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

// const OutButton = styled.Text`
//   padding: ${BUTTON_PADDING}px;
//   border-radius: ${BUTTON_RADIUS}px;
//   text-align: center;
//   background-color: ${MAIN_COLOR};
//   color: white;
//   font-size: ${BUTTON_FONT_SIZE}px;
//   font-family: ${FONT_NAME};
// `;

// const DeleteTouch = styled.TouchableOpacity`
//   padding-left: ${wdp(3.3)}px;
//   padding-right: ${wdp(3.3)}px;
// `;
