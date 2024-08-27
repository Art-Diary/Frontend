import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
  BORDER_COLOR,
} from '~/components/common/colors';
import {FONT_NAME, BACK_FONT_SIZE, DASH_WIDTH} from '~/components/common/style';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {usefetchRegExhs} from '~/api/queries/regexh';
//import GreyNameTag from '~/components/common/GreyNameTag';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import CustomTouchable from '~/components/common/CustomTouchable';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {RouteProp, useNavigation} from '@react-navigation/native';
//import {BACK_COLOR,  DEFAULT_TEXT} from './colors';

type RootStackParamList = {
  RegisterNewExhScreen: {isAdmin: boolean};
};

type RegisterNewExhScreenProp = RouteProp<
  RootStackParamList,
  'RegisterNewExhScreen'
>;

interface Props {
  route: RegisterNewExhScreenProp;
}

const RegisterNewExhScreen: React.FC<Props> = ({route}) => {
  const {isAdmin} = route.params;
  const {data, isLoading, isError, isSuccess, refetch} =
    usefetchRegExhs(isAdmin);
  const navigation = useNavigation<RootStackNavigationProp>();
  const limit = 5; // 한 페이지에 보이는 리뷰 개수 -[변경 예정]
  const [page, setPage] = useState<number>(1); //현재 페이지
  const offset = (page - 1) * limit; //해당 페이지의 첫번째 인덱스
  const [numPagesArr, setNumPagesArr] = useState<number[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setNumPages(Math.ceil(data.length / limit));
    }
  }, [data]);

  useEffect(() => {
    //numPage 변경 후, 변경
    let tmp = new Array(numPages).fill(0);
    setNumPagesArr(tmp);
  }, [numPages]);

  useEffect(() => {
    if (refreshing) {
      handleRefetch();
    }
  }, [refreshing]);

  const handleRefetch = async () => {
    await refetch().then(() => {
      setRefreshing(false);
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'로딩 중 :)'} />;
  }

  return (
    <Container>
      <BackView title={'전시회 등록 확인'} line={true}></BackView>
      <RegExhList>
        <Category>
          <CategoryNormal>
            <CategoryName>{'no.'}</CategoryName>
          </CategoryNormal>
          <CategoryExhName>
            <CategoryName>{'제목'}</CategoryName>
          </CategoryExhName>
          <CategoryExhDate>
            <CategoryName>{'등록일'}</CategoryName>
          </CategoryExhDate>
          <CategoryNormal>
            <CategoryName>{'등록현황'}</CategoryName>
          </CategoryNormal>
        </Category>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          {data &&
            data
              .slice(offset, offset + limit)
              .map((item: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    isAdmin
                      ? navigation.navigate('ConfirmRegExhScreen', {
                          rExhId: item.regExhId,
                        })
                      : navigation.navigate('PreviewRegExh', {
                          rExhId: item.regExhId,
                        });
                  }}>
                  <Category key={index}>
                    <CategoryNormal>
                      <RExhNumber>{item.no}</RExhNumber>
                    </CategoryNormal>
                    <CategoryExhName>
                      <RExhName numberOfLines={1}>{item.regExhName}</RExhName>
                    </CategoryExhName>
                    <CategoryExhDate>
                      <RExhDate>{item.regDate}</RExhDate>
                    </CategoryExhDate>
                    <CategoryNormal>
                      {item.regState ? (
                        <RExhStateTrue>{'완료'}</RExhStateTrue>
                      ) : (
                        <RExhStateFalse>{'대기'}</RExhStateFalse>
                      )}
                    </CategoryNormal>
                  </Category>
                </TouchableOpacity>
              ))}
        </ScrollView>

        <PageNumberView>
          <CustomTouchable
            onPress={() => setPage(page - 1)}
            disabled={page === 1}>
            <PageNumber>{'<'}</PageNumber>
          </CustomTouchable>

          {numPagesArr.map((item, index) => (
            <CustomTouchable key={index + 1} onPress={() => setPage(index + 1)}>
              {index + 1 == page ? (
                <CurrentPageNumber>{index + 1}</CurrentPageNumber>
              ) : (
                <PageNumber>{index + 1}</PageNumber>
              )}
            </CustomTouchable>
          ))}

          <CustomTouchable
            onPress={() => setPage(page + 1)}
            disabled={page === numPages}>
            <PageNumber>{'>'}</PageNumber>
          </CustomTouchable>
        </PageNumberView>
      </RegExhList>
    </Container>
  );
};

export default RegisterNewExhScreen;

/** style */

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  width: 100%;
`;

const CategoryName = styled.Text`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

const CategoryNormal = styled.View`
  flex-direction: row;
  background-color: #f6f6f6;
  justify-content: center;
`;

const CategoryExhName = styled.View`
  width: ${wp(35)}px;
  flex-direction: row;
  background-color: #f6f6f6;
  justify-content: center;
`;

const CategoryExhDate = styled.View`
  width: ${wp(27)}px;
  flex-direction: row;
  background-color: #f6f6f6;
  justify-content: center;
`;

const Category = styled.View`
  flex-direction: row;
  background-color: #f6f6f6;
  justify-content: space-between;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
  padding-top: ${wp(3)}px;
  padding-bottom: ${wp(3)}px;
  gap: ${wp(3)}px;
  align-items: center;
  border-color: ${BORDER_COLOR};
  border-bottom-width: ${DASH_WIDTH}px;
  border-bottom-color: ${LIGHT_GREY};
`;

const RegExhList = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  width: 100%;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
`;

const RExhNumber = styled.Text`
  font-size: ${rf(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

const RExhName = styled.Text`
  font-size: ${rf(15)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

const RExhDate = styled.Text`
  font-size: ${rf(12)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

const RExhStateTrue = styled.Text`
  font-size: ${rf(16)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

const RExhStateFalse = styled.Text`
  font-size: ${rf(16)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

// page
const PageNumberView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

const PageNumber = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
`;

const CurrentPageNumber = styled.Text`
  font-size: ${rf(17)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
`;
