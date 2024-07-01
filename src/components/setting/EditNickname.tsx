import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useVerifyNickname} from '~/api/queries/auth';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';
import {useUserInfo} from '~/zustand/auth/auth';
import {FONT_NAME} from '../common/style';
import {DEFAULT_TEXT, LIGHT_GREY, MAIN_COLOR} from '../common/colors';

interface EditNicknameProps {
  getNickname: string;
  setNickname: (nickname: string) => void;
  setIsVerified: (isVerified: boolean) => void;
  isVerified: boolean;
}

const EditNickname: React.FC<EditNicknameProps> = ({
  getNickname,
  setNickname,
  setIsVerified,
  isVerified,
}) => {
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
    setNickname(text);
    setIsVerified(false);
    setMessage(null);
  }, []);

  useEffect(() => {
    if (isError) {
      const statusCode = error?.response?.status;

      if (statusCode === 409) {
        // 상태 코드를 체크 (예: 409 Conflict)
        if (userInfo.authInfo.nickname === getNickname) {
          setMessage(' 사용 가능한 닉네임입니다.');
          setMessageColor('#34A853');
          setIsVerified(true);
        } else {
          setMessage(' 이미 사용하고 있는 닉네임입니다.');
          setMessageColor('#FF6F61');
        }
      } else {
        setMessage(' 닉네임 확인 중 오류가 발생했습니다.');
        setMessageColor('#FF6F61');
      }
    }
    if (isSuccess) {
      setMessage(' 사용 가능한 닉네임입니다.');
      setMessageColor('#34A853');
      setIsVerified(true);
    }
  }, [isError, isLoading, isSuccess]);

  const onPressVerify = () => {
    // check nickname
    if (checkBlankInKeyword(getNickname)) {
      setMessage(' 닉네임을 작성해주세요.');
      setMessageColor('#FF6F61');
    } else {
      verifyNickname();
    }
  };

  return (
    <ContentColumn>
      <SectionView>
        <SectionName main={true} color={'#3c4045'}>
          닉네임
        </SectionName>
        {message !== null && (
          <SectionName color={messageColor}>{message}</SectionName>
        )}
      </SectionView>
      <ContentRow>
        <Nickname
          placeholderTextColor="#D3D3D3"
          placeholder={
            getNickname === '' ? '닉네임을 입력해주세요.' : getNickname
          }
          onChangeText={onChangeNickname}
          value={getNickname}
        />
        <CheckButton
          isVerified={isVerified}
          disabled={isVerified}
          onPress={onPressVerify}>
          <CheckText>중복확인</CheckText>
        </CheckButton>
      </ContentRow>
    </ContentColumn>
  );
};

export default EditNickname;

const ContentColumn = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${hp(1.7)}px;
`;

const ContentRow = styled.View`
  flex-direction: row;
  width: 100%;
  gap: ${wp(1.7)}px;
  align-items: center;
`;

const SectionView = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface SectionNameProps {
  main: boolean;
  color: string;
}

const SectionName = styled.Text<SectionNameProps>`
  font-size: ${(props: SectionNameProps) =>
    props.main ? `${rf(20.3)}px` : `${rf(18.6)}px`};
  color: ${(props: SectionNameProps) => props.color};
  font-family: ${FONT_NAME};
`;

const Nickname = styled.TextInput`
  flex: 1;
  font-size: ${rf(20)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  border-width: ${wp(0.3)}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${wp(2)}px;
  padding-left: ${wp(2.8)}px;
  padding-right: ${wp(2.8)}px;
  width: 100%;
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
  font-size: ${rf(20)}px;
  font-family: ${FONT_NAME};
`;
