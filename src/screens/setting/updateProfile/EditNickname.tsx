import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';

interface EditNicknameProps {
  getNickname: string;
  setNickname: (nickname: string) => void;
}

const EditNickname: React.FC<EditNicknameProps> = ({
  getNickname,
  setNickname,
}) => {
  const onChangeNickname = useCallback((text: string) => {
    setNickname(text);
  }, []);

  return (
    <ContentColumn>
      <SectionName>닉네임</SectionName>
      <ContentRow>
        <Nickname
          placeholderTextColor="#D3D3D3"
          placeholder={getNickname}
          onChangeText={onChangeNickname}
          value={getNickname}
        />
        <CheckButton>중복확인</CheckButton>
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
`;

const SectionName = styled.Text`
  font-size: ${fp(19)}px;
  color: #3c4045;
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
`;

const CheckButton = styled.Text`
  padding-top: ${hp(11)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  border-radius: 10px;
  text-align: center;
  background-color: #ff6f61;
  color: white;
  font-size: ${fp(18)}px;
  font-family: 'omyu pretty';
`;
