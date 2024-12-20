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
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

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
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();

  // State Management
  const [exhInfo, setExhInfo] = useState<ExhInfoForList>();
  const [showExhList, setShowExhList] = useState<ExhInfoForList[]>([]);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // API Hooks
  const {
    data: exhList,
    isLoading,
    isError,
    isSuccess,
    refetch,
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
    isLoading: isAddLoading,
    error,
  } = useAddMyExhVisitDate(
    exhInfo?.exhId ?? 0,
    selectedDateInfo.year,
    selectedDateInfo.month,
  );

  // Effects
  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    if (isAddError) {
      const statusCode = error?.response?.status;

      if (statusCode === 409) {
        showToast('이미 저장된 전시회입니다.');
      } else if (statusCode === 403) {
        showToast('해당 날짜에 방문할 수 없는 전시회입니다.');
      } else {
        showToast('다시 시도해주세요.');
      }
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

  // Handlers
  const onClickNextButton = () => {
    if (exhInfo) {
      addMyExhVisitDate({
        exhId: exhInfo.exhId,
        visitDate: changeDotToHyphen(selectedDateInfo.selectedDate),
      });
    }
  };

  const onPressExh = (item: ExhInfoForList) => {
    setExhInfo(item);
  };

  const moveToExhDetail = (exhId: number) => {
    handleCloseModal();
    navigation.navigate('ExhDetailInfo', {exhId, modalOpen: true});
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isLoading || isAddLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
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
