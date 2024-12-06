import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '../../common/style';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '../../common/colors';
import {showToast} from '../../common/modal/toastConfig';
import {ExhInfoForList} from '~/types';
import InfoModal from '../../common/modal/InfoModal';
import {changeDotToHyphen} from '~/utils/date';
import {useFetchSearchExh} from '~/api/queries/exhibition';
import {useAddMyExhVisitDate} from '~/api/queries/mydiary';
import CustomTouchable from '~/components/common/CustomTouchable';
import {FlatList} from 'react-native';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {InfoButtonIcon} from '~/components/common/icon';

type SelectedDateInfo = {
  selectedDate: string;
  year: number;
  month: number;
};

interface ModalProps {
  visitedExhIdList: number[];
  selectedDateInfo: SelectedDateInfo;
  handleCloseModal: () => void;
  message: string;
}

const AddVisitExhToCalModal: React.FC<ModalProps> = ({
  visitedExhIdList,
  selectedDateInfo,
  handleCloseModal,
  message,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [exhInfo, setExhInfo] = useState<ExhInfoForList>();
  const [showExhList, setShowExhList] = useState<ExhInfoForList[]>([]);
  const {
    data: exhList,
    isLoading,
    isError,
    isSuccess,
  } = useFetchSearchExh(
    null,
    null,
    null,
    null,
    changeDotToHyphen(selectedDateInfo.selectedDate),
  );
  const {
    mutate: addMyExhVisitDate,
    isError: isAddError,
    isSuccess: isAddSuccess,
  } = useAddMyExhVisitDate(
    exhInfo?.exhId ?? 0,
    selectedDateInfo.year,
    selectedDateInfo.month,
  );

  useEffect(() => {
    if (isError) {
      showToast('전시회 목록 조회를 실패했습니다.');
    }
  }, [isError]);

  useEffect(() => {
    if (isAddError) {
      showToast('개인 전시 방문 날짜 추가를 실패했습니다.');
    }
    if (isAddSuccess) {
      handleCloseModal();
    }
  }, [isAddError, isAddSuccess]);

  useEffect(() => {
    if (exhList) {
      var list: ExhInfoForList[] = [];
      for (let i = 0; i < exhList.length; i++) {
        let check: boolean = false;
        for (let j = 0; j < visitedExhIdList.length; j++) {
          if (exhList[i].exhId === visitedExhIdList[j]) {
            check = true;
            break;
          }
        }
        if (!check) {
          list.push(exhList[i]);
        }
      }
      setShowExhList(list);
    }
  }, [exhList]);

  const onClickNextButton = () => {
    if (exhInfo) {
      addMyExhVisitDate({
        exhId: exhInfo.exhId,
        visitDate: changeDotToHyphen(selectedDateInfo.selectedDate),
      });
    }
  };

  //   const alreadyVisited = () => {
  //     for (var i = 0; i < visitedExhIdList.length; i++) {
  //       if (visitedExhIdList[i] === exhInfo?.exhId) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   };

  const onPressExh = (item: ExhInfoForList) => {
    setExhInfo(item);
  };

  const moveToExhDetail = (exhId: number) => {
    handleCloseModal();
    navigation.navigate('ExhDetailInfo', {exhId, modalOpen: true});
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <Message>{message}</Message>
      {!showExhList || showExhList.length === 0 ? (
        <SelectMsgView>
          <SelectMsgText>
            {selectedDateInfo.selectedDate}에 진행하는 전시회가 없습니다.
          </SelectMsgText>
        </SelectMsgView>
      ) : (
        <FlatList
          data={showExhList}
          renderItem={({item, index}) => (
            <ItemWrapper isClicked={item.exhId === exhInfo?.exhId}>
              <ExhItemView
                exhInfo={{...item}}
                notTouchable={false}
                noLine={index === showExhList.length - 1 ? true : false}
                onTouch={() => onPressExh(item)}>
                {/* 상세보기 이동 */}
                <InfoWrapper>
                  <CustomTouchable onPress={() => moveToExhDetail(item.exhId)}>
                    <InfoButtonView>
                      <InfoButtonIcon />
                    </InfoButtonView>
                  </CustomTouchable>
                </InfoWrapper>
              </ExhItemView>
            </ItemWrapper>
          )}
        />
      )}

      <NextButtonWrapper>
        <CustomTouchable onPress={onClickNextButton}>
          <NextButton isAlready={false}>완료</NextButton>
        </CustomTouchable>
        {/* {alreadyVisited() ? (
          <NextButton isAlready={true}>이미 저장된 전시회입니다</NextButton>
        ) : (
          <CustomTouchable onPress={onClickNextButton}>
            <NextButton isAlready={false}>완료</NextButton>
          </CustomTouchable>
        )} */}
      </NextButtonWrapper>
    </InfoModal>
  );
};

export default AddVisitExhToCalModal;

/** style */
const Message = styled.Text`
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-top: ${hp(1)}px;
  padding-left: ${wp(4)}px;
  padding-right: ${wp(4)}px;
  padding-bottom: ${hp(1)}px;
`;

interface NextButtonProps {
  isAlready: boolean;
}

interface ItemProps {
  isClicked: boolean;
}

const ItemWrapper = styled.View<ItemProps>`
  justify-content: center;
  border-left-color: ${MAIN_COLOR};
  border-left-width: ${(props: ItemProps) =>
    props.isClicked ? `${wp(3)}px` : `0px`};
`;

const InfoWrapper = styled.View`
  justify-content: center;
`;

const InfoButtonView = styled.View`
  justify-content: center;
  padding: ${wp(3)}px;
`;

const NextButtonWrapper = styled.View`
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
`;

const NextButton = styled.Text<NextButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.isAlready ? `${LIGHT_GREY}` : `${MAIN_COLOR}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const SelectMsgView = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  margin-top: ${hp(5)}px;
`;

const SelectMsgText = styled.Text`
  font-size: ${rf(16)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
