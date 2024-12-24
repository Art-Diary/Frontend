import {DEFAULT_IMAGE} from '@env';
import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import CustomTouchable from '~/components/common/CustomTouchable';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {MAIN_COLOR} from '~/components/common/colors';
import {BackButtonIcon} from '~/components/common/icon';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import ExhDetailFormat from '~/components/exhibition/ExhDetailFormat';

type RegExhDataType = {
  regExhName: string;
  regGallery: string;
  regStartDate: string;
  regEndDate: string;
  regPainter: string;
  regFee: string;
  regUrl: string | undefined;
  regIntro: string | undefined;
  regPosterUri: string | undefined;
};

interface RegExhPreviewModalProps {
  onClose: () => void;
  regExhData: RegExhDataType;
  createApi: () => void;
}

const RegExhPreviewModal: React.FC<RegExhPreviewModalProps> = ({
  onClose,
  regExhData,
  createApi,
}) => {
  return (
    <Modal animationType="fade" transparent={true} onRequestClose={onClose}>
      <Container>
        <Backview>
          <CustomTouchable onPress={onClose}>
            <BackButtonIcon />
          </CustomTouchable>
        </Backview>
        <ContentView>
          <ExhDetailFormat
            data={{
              exhName: regExhData.regExhName,
              gallery: regExhData.regGallery,
              exhPeriodStart: regExhData.regStartDate,
              exhPeriodEnd: regExhData.regEndDate,
              poster: regExhData.regPosterUri ?? DEFAULT_IMAGE,
              painter: regExhData.regPainter,
              fee: Number(regExhData.regFee),
              url: regExhData.regUrl ?? '홈페이지 정보 없음.',
              intro: regExhData.regIntro ?? '전시회 소개 없음.',
              favoriteExh: null,
            }}
            state={'미리보기'}
            exhId={null}
          />
          <CustomTouchable onPress={createApi}>
            <ButtonView>
              <CompleteButton>등록</CompleteButton>
            </ButtonView>
          </CustomTouchable>
        </ContentView>
      </Container>
    </Modal>
  );
};

export default RegExhPreviewModal;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: white;
`;

const Backview = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${wp(3)}px;
  padding-bottom: ${wp(3)}px;
  padding-left: ${wp(2.5)}px;
`;

const ContentView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ButtonView = styled.View`
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
`;

const CompleteButton = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${MAIN_COLOR};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;
