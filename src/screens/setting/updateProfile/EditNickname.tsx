import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useVerifyNickname} from '~/api/queries/auth';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useUserInfo} from '~/zustand/auth/auth';

interface EditNicknameProps {
  getNickname: string;
  setNickname: (nickname: string) => void;
}

const EditNickname: React.FC<EditNicknameProps> = ({
  getNickname,
  setNickname,
}) => {
  const userInfo = useUserInfo();
  const {
    mutate: verifyNickname,
    isLoading,
    isError,
    isSuccess,
  } = useVerifyNickname(getNickname);

  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string>('');

  const onChangeNickname = useCallback((text: string) => {
    setNickname(text);
  }, []);

  useEffect(() => {
    if (isError) {
      if (userInfo.nickname === getNickname) {
        setMessage(' 사용 가능한 닉네임입니다.');
        setMessageColor('#34A853');
      } else {
        setMessage(' 이미 사용하고 있는 닉네임입니다.');
        setMessageColor('#FF6F61');
      }
    }
    if (isLoading) {
    }
    if (isSuccess) {
      setMessage(' 사용 가능한 닉네임입니다.');
      setMessageColor('#34A853');
    }
  }, [isError, isLoading, isSuccess]);

  const onPressVerify = () => {
    verifyNickname();
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
          placeholder={getNickname}
          onChangeText={onChangeNickname}
          value={getNickname}
        />
        <CheckButton onPress={onPressVerify}>
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
  gap: ${hp(10)}px;
`;

const ContentRow = styled.View`
  flex-direction: row;
  width: 100%;
  gap: ${hp(5)}px;
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
    props.main ? `${fp(19)}px` : `${fp(13)}px`};
  color: ${(props: SectionNameProps) => props.color};
  font-family: 'omyu pretty';
`;

const Nickname = styled.TextInput`
  flex: 1;
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 10px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  width: 100%;
`;

const CheckButton = styled.TouchableOpacity`
  padding-top: ${hp(11)}px;
  padding-bottom: ${hp(11)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  border-radius: 10px;
  background-color: #ff6f61;
`;

const CheckText = styled.Text`
  text-align: center;
  color: white;
  font-size: ${fp(18)}px;
  font-family: 'omyu pretty';
`;
