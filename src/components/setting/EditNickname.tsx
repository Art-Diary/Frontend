import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useVerifyNickname} from '~/api/queries/auth';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {checkBlankInKeyword, removeControlCharacter} from '~/utils/keyword';
import {useUserInfo} from '~/zustand/auth/auth';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_RADIUS,
  FONT_NAME,
} from '../common/style';
import {
  DARK_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '../common/colors';
import LoadingModal from '../common/modal/LoadingModal';
import {showToast} from '../common/modal/toastConfig';

interface EditNicknameProps {
  getNickname: string;
  setNickname: (nickname: string) => void;
  setIsVerified: (isVerified: boolean) => void;
  isVerified: boolean;
}

// [WORD_LIMIT]
const EditNickname: React.FC<EditNicknameProps> = ({
  getNickname,
  setNickname,
  setIsVerified,
  isVerified,
}) => {
  const originalName = getNickname;
  const maxInputLength = 10;
  const userInfo = useUserInfo();
  const {
    mutate: verifyNickname,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useVerifyNickname(getNickname);

  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string>('');

  const onChangeNickname = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    setNickname(cleaned);
    if (cleaned === originalName) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
    setMessage(null);
  }, []);

  useEffect(() => {
    if (isError) {
      const statusCode = error?.response?.status;

      if (statusCode === 409) {
        // 상태 코드를 체크 (예: 409 Conflict)
        if (userInfo.authInfo.nickname === getNickname) {
          setMessage(' 사용 가능한 닉네임입니다.');
          setMessageColor('green');
          setIsVerified(true);
        } else {
          setMessage(' 이미 사용 중인 닉네임입니다.');
          setMessageColor('red');
        }
      } else {
        showToast('다시 시도해주세요.');
      }
    }
    if (isSuccess) {
      setMessage(' 사용 가능한 닉네임입니다.');
      setMessageColor('green');
      setIsVerified(true);
    }
  }, [isError, isSuccess]);

  const onPressVerify = () => {
    // check nickname
    const nickname = getNickname.replace(/(\s*)/g, '');

    if (checkBlankInKeyword(getNickname)) {
      setMessage(' 닉네임을 작성해주세요.');
      setMessageColor('red');
    } else if (
      nickname.includes('전시메이트') ||
      nickname.includes('kakao_') ||
      nickname.includes('google_') ||
      nickname.includes('naver_')
    ) {
      setMessage(' 이미 사용 중인 닉네임입니다.');
      setMessageColor('red');
    } else {
      verifyNickname();
    }
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <CountWrapper>
        <SectionWapper>
          <SectionStar>*</SectionStar>
          <SectionName main={true} color={DARK_GREY}>
            닉네임
          </SectionName>
        </SectionWapper>
        <CountText>
          ( {getNickname ? getNickname.length : 0} / {maxInputLength} )
        </CountText>
        {message !== null && (
          <SectionName color={messageColor}>{message}</SectionName>
        )}
      </CountWrapper>
      {/* section 내용 */}
      <ContentRow>
        <BodyWrapper>
          <TextInputView
            maxLength={maxInputLength}
            placeholderTextColor={MIDDLE_GREY}
            placeholder={
              getNickname === '' ? '닉네임을 입력해주세요.' : getNickname
            }
            value={getNickname}
            onChangeText={onChangeNickname}
          />
        </BodyWrapper>
        <CheckButton
          activeOpacity={0.6}
          isVerified={isVerified}
          disabled={isVerified}
          onPress={onPressVerify}>
          <CheckText>중복확인</CheckText>
        </CheckButton>
      </ContentRow>
    </Container>
  );
};

export default EditNickname;

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${hp(1.3)}px;
`;

const ContentRow = styled.View`
  flex-direction: row;
  width: 100%;
  gap: ${wp(1.7)}px;
  align-items: center;
  justify-content: space-between;
`;

interface SectionNameProps {
  main: boolean;
  color: string;
}

const SectionName = styled.Text<SectionNameProps>`
  font-size: ${(props: SectionNameProps) =>
    props.main ? `${AREA_FONT_SIZE}px` : `${rf(13)}px`};
  color: ${(props: SectionNameProps) => props.color};
  font-family: ${FONT_NAME};
`;

const CountText = styled.Text`
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: ${MIDDLE_GREY};
  text-align: center;
`;

interface CheckButtonProps {
  isVerified: boolean;
}

const CheckButton = styled.TouchableOpacity<CheckButtonProps>`
  padding-top: ${hp(1.9)}px;
  padding-bottom: ${hp(1.9)}px;
  padding-left: ${wp(1.5)}px;
  padding-right: ${wp(1.5)}px;
  border-radius: ${wp(2)}px;
  background-color: ${MAIN_COLOR};
  background-color: ${(props: CheckButtonProps) =>
    props.isVerified ? `${LIGHT_GREY}` : `${MAIN_COLOR}`};
`;

const CheckText = styled.Text`
  text-align: center;
  color: white;
  font-size: ${rf(15)}px;
  font-family: ${FONT_NAME};
`;

const CountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(1)}px;
`;

const SectionWapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${wp(1)}px;
`;

const SectionStar = styled.Text`
  font-size: ${rf(16)}px;
  font-family: ${FONT_NAME};
  color: ${MAIN_COLOR};
  text-align: center;
`;

const BodyWrapper = styled.View`
  flex-direction: column;
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${BUTTON_RADIUS}px;
  width: 81%;
  padding: ${wp(2.9)}px;
`;

const TextInputView = styled.TextInput`
  font-size: ${rf(16)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-right: 0%;
  padding-top: 0%;
  padding-bottom: 0%;
  max-width: 81%;
`;
