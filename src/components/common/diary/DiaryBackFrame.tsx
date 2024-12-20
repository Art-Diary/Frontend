import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {Shadow} from 'react-native-shadow-2';
import ContentsInfo from '~/components/common/diary/ContentsInfo';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {useDiaryBackInfo} from '~/zustand/common/diaryBack';
import {FONT_NAME} from '../style';
import {LIGHT_GREY} from '../colors';
import LoadingModal from '../modal/LoadingModal';

const DiaryBackFrame = () => {
  const {backInfo} = useDiaryBackInfo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingModal isLoading={loading} />
      ) : (
        <Container>
          <BackView line={false} children={null} />
          <ContentsContainer>
            <Shadow distance={5}>
              <Contents>
                <ContentsInfo contents={backInfo.contents} />
              </Contents>
              {/* 작성 날짜 */}
              <WriteDateView>
                <WriteDateText>작성날짜</WriteDateText>
                <WriteDateText>{backInfo.writeDate}</WriteDateText>
              </WriteDateView>
            </Shadow>
          </ContentsContainer>
        </Container>
      )}
    </>
  );
};

export default DiaryBackFrame;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-bottom: ${hp(0.9)}px;
  padding-left: ${wp(1.5)}px;
  padding-right: ${wp(1.5)}px;
  background-color: white;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const WriteDateView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: ${wp(7)}px;
  padding-right: ${wp(7)}px;
  padding-top: ${hp(1.3)}px;
  padding-bottom: ${hp(1.3)}px;
`;

const WriteDateText = styled.Text`
  font-size: ${rf(15.8)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;
