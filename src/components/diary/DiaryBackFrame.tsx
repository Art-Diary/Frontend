import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {Shadow} from 'react-native-shadow-2';
import ContentsInfo from '~/components/diary/ContentsInfo';
import {
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useDiaryBackInfo} from '~/zustand/common/diaryBack';
import LoadingModal from '../common/modal/LoadingModal';

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
        <LoadingModal message="로딩 중.." />
      ) : (
        <Container>
          <BackView line={false} children={null} />
          <ContentsContainer>
            <Shadow distance={5}>
              <Contents>
                <ContentsInfo
                  contents={backInfo.contents}
                  writeDate={backInfo.writeDate}
                />
              </Contents>
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
  padding-bottom: ${hp(5)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  background-color: white;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(20)}px;
`;
