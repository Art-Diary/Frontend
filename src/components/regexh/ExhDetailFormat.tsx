import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {dateToString} from '~/utils/date';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
  BORDER_COLOR,
} from '~/components/common/colors';
import {FONT_NAME} from '~/components/common/style';
import {DEFAULT_IMAGE} from '@env';
import ExhDetailInfoIntro from './ExhDetailInfoIntro';
import {showToast} from '~/components/common/modal/toastConfig';
import ExhDetailHeart from './ExhDetailHeart';

interface ExhDetailData {
  exhName: string;
  gallery: string;
  exhPeriodStart: string;
  exhPeriodEnd: string;
  poster: string;
  painter: string;
  fee: number;
  url: string;
  intro: string;
  favoriteExh: boolean | null;
}

interface Props {
  data: ExhDetailData;
  state: string;
  exhId: number | null;
}

const ExhDetailFormat: React.FC<Props> = ({data, state, exhId}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();

  const checkExhState = (): string => {
    const currentDate = dateToString(new Date());

    if (currentDate > data.exhPeriodEnd) {
      // 진행상황 확인
      return '종료';
    } else if (
      currentDate >= data.exhPeriodStart &&
      currentDate <= data.exhPeriodEnd
    ) {
      return '진행중';
    } else if (currentDate < data.exhPeriodStart) {
      return '예정';
    }
    return '';
  };

  const exhToHomepage = async (url: string) => {
    // 주어진 URL을 열 수 있는지 확인합니다.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // 주어진 URL을 엽니다.
      await Linking.openURL(url);
    } else {
      showToast(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Container>
      {data && (
        <>
          <TopView>
            <BackgroundImage
              source={{uri: `${data.poster ?? DEFAULT_IMAGE}`}}
              blurRadius={40}
              resizeMode="cover"
              alt={'이미지 읽기 실패'}>
              <ForegroundImage
                source={{uri: `${data.poster ?? DEFAULT_IMAGE}`}}
                resizeMode="contain"
                alt={'이미지 읽기 실패'}
              />
            </BackgroundImage>
            {state == '전시정보' && exhId && data.favoriteExh != null && (
              <ExhDetailHeart exhId={exhId} heartState={data.favoriteExh} />
            )}
          </TopView>
          <InfoListView>
            <Title>{data.exhName}</Title>
            {state == '전시정보' && (
              <StateView>
                <StateText state={checkExhState()}>{checkExhState()}</StateText>
              </StateView>
            )}
            <InfoView>
              <InfoTitle>{'장소'}</InfoTitle>
              <Info>{data.gallery}</Info>
            </InfoView>
            <InfoView>
              <InfoTitle>{'일정'}</InfoTitle>
              <Info>{data.exhPeriodStart + ' ~ ' + data.exhPeriodEnd}</Info>
            </InfoView>
            <InfoView>
              <InfoTitle>{'작가'}</InfoTitle>
              {!data.painter ? (
                <Info>{'정보 없음'}</Info>
              ) : (
                <Info>{data.painter}</Info>
              )}
            </InfoView>
            <InfoView>
              <InfoTitle>{'관람료'}</InfoTitle>
              <Info>
                {data.fee}
                {'원'}
              </Info>
            </InfoView>
            {state == '미리보기' && (
              <InfoView>
                <InfoTitle>{'홈페이지'}</InfoTitle>
                <TouchableOpacity onPress={() => exhToHomepage(data.url)}>
                  <InfoUrl multiline={true}>{data.url}</InfoUrl>
                </TouchableOpacity>
              </InfoView>
            )}
          </InfoListView>
          {/* 소개 */}
          <ExhDetailInfoIntro intro={data.intro} />
        </>
      )}
    </Container>
  );
};

export default ExhDetailFormat;

/** style */
const ContainerScroll = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  background-color: white;
`;

const Container = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  background-color: white;
`;

const Title = styled.Text`
  font-size: ${rf(19)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  line-height: ${wp(8)}px;
`;

const TopLayer = styled.View`
  flex-direction: row;
  justify-content: space-between; // 양 끝으로 버튼 배치
  align-items: center;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
  padding-top: ${wp(2.3)}px;
  padding-bottom: ${wp(2)}px;
  width: 100%;
`;

const IconView = styled.View`
  flex-direction: row;
  gap: ${wp(2)}px;
  justify-content: center;
  align-items: center;
`;

// poster section
const TopView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const BackgroundImage = styled.ImageBackground`
  width: ${wp(100)}px;
  height: ${hp(29)}px;
`;

const ForegroundImage = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

// info section
const InfoListView = styled.View`
  flex-direction: column;
  padding: ${wp(5.2)}px;
  gap: ${wp(2)}px;
  border-style: dashed;
  border-bottom-width: ${wp(0.4)}px;
  border-bottom-color: ${LIGHT_GREY};
`;

const StateView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${wp(2.9)}px;
`;

interface StateTextProps {
  state: string;
}

const StateText = styled.Text<StateTextProps>`
  font-size: ${rf(12)}px;
  text-align: center;
  color: ${(props: StateTextProps) =>
    props.state === '진행중'
      ? `${MAIN_COLOR}`
      : props.state === '종료'
      ? `${MIDDLE_GREY}`
      : '#fee500'};
  font-family: ${FONT_NAME};
  padding-top: ${wp(1.1)}px;
  padding-bottom: ${wp(0.6)}px;
  padding-left: ${wp(1.9)}px;
  padding-right: ${wp(1.9)}px;
  border-color: ${(props: StateTextProps) =>
    props.state === '진행중'
      ? `${MAIN_COLOR}`
      : props.state === '종료'
      ? `${MIDDLE_GREY}`
      : '#fee500'};
  border-width: ${wp(0.3)}px;
  border-radius: ${wp(50)}px;
`;

const InfoView = styled.View`
  flex-direction: row;
  gap: ${wp(5)}px;
  width: ${wp(80)}px;
`;

const InfoTitle = styled.Text`
  font-size: ${rf(14.2)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const Info = styled.Text`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  font-size: ${rf(14.2)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const InfoUrl = styled.Text`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  font-size: ${rf(14.2)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-decoration: underline;
`;
