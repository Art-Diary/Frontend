import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {showToast} from '~/components/common/modal/toastConfig';
import {useUpdateRegExhByAdmin} from '~/api/queries/regexh';
import RegExhFormFrame from '~/components/regexh/RegExhFormFrame';
import {
  AREA_FONT_SIZE,
  BUTTON_RADIUS,
  FONT_NAME,
  ITEM_BORDER_WIDTH,
} from '~/components/common/style';
import {DEFAULT_TEXT, LIGHT_GREY} from '~/components/common/colors';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';

type RootStackParamList = {
  ConfirmRegExhScreen: {rExhId: number};
};

type ConfirmRegExhScreenProp = RouteProp<
  RootStackParamList,
  'ConfirmRegExhScreen'
>;

interface Props {
  route: ConfirmRegExhScreenProp;
}

const ConfirmRegExhScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  // fetch api

  const [regExhName, setRegExhName] = useState<string>('');
  const [regGallery, setRegGallery] = useState<string>('');
  const [regStartDate, setRegStartDate] = useState<string>('');
  const [regEndDate, setRegEndDate] = useState<string>('');
  const [regPainter, setRegPainter] = useState<string>('');
  const [regFee, setRegFee] = useState<string>('');
  const [regUrl, setRegUrl] = useState<string | undefined>(undefined);
  const [regIntro, setRegIntro] = useState<string | undefined>(undefined);
  const [regPosterUri, setRegPosterUri] = useState<string | undefined>(
    undefined,
  );
  const [regComment, setRegComment] = useState<string | undefined>(undefined);

  const [regExhFormdata, setRegExhFormdata] = useState<FormData | null>(null);

  // update by admin api
  const {
    mutate: updateRegExh,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
  } = useUpdateRegExhByAdmin();

  useEffect(() => {
    if (isError) {
      showToast('전시회 등록 작성을 실패했습니다.');
    }
    if (isSuccess) {
      // 설정 페이지의 등록한 전시회 페이지로 이동
    }
  }, [isError, isSuccess]);

  const onChangeComment = useCallback((text: string) => {
    setRegComment(text);
  }, []);

  return (
    <RegExhFormFrame
      formState={'updateByAdmin'}
      regExhData={{
        regExhName,
        setRegExhName,
        regGallery,
        setRegGallery,
        regStartDate,
        setRegStartDate,
        regEndDate,
        setRegEndDate,
        regPainter,
        setRegPainter,
        regFee,
        setRegFee,
        regUrl,
        setRegUrl,
        regIntro,
        setRegIntro,
        regPosterUri,
        setRegPosterUri,
        regComment,
      }}
      requestData={{
        isLoading: isLoading,
      }}>
      <ColSectionWrapper>
        <SectionView>
          <SectionName>코멘트</SectionName>
          <SectionName color={'grey'}>(선택)</SectionName>
        </SectionView>
        <RowSectionWrapper>
          <WriteInfo
            textAlignVertical={'top'}
            multiline={true}
            placeholderTextColor={LIGHT_GREY}
            placeholder={'코멘트 작성'}
            value={regComment}
            onChangeText={onChangeComment}
          />
        </RowSectionWrapper>
      </ColSectionWrapper>
    </RegExhFormFrame>
  );
};

export default ConfirmRegExhScreen;

/** style */
const RowSectionWrapper = styled.View`
  flex-direction: row;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  align-items: center;
  justify-content: space-between;
  padding-left: ${wp(2.8)}px;
  padding-right: ${wp(2.8)}px;
`;

const ColSectionWrapper = styled.View`
  flex-direction: column;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  width: 100%;
  padding: ${wp(2.9)}px;
  gap: ${hp(1.6)}px;
`;

const SectionView = styled.View`
  flex-direction: row;
  gap: ${hp(0.3)}px;
`;

interface SectionProps {
  color: string;
}

const SectionName = styled.Text<SectionProps>`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  color: ${(props: SectionProps) =>
    props.color === 'grey' ? `${LIGHT_GREY}` : `${DEFAULT_TEXT}`};
`;

const WriteInfo = styled.TextInput`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-right: 0%;
  min-height: ${hp(25)}px;
`;
