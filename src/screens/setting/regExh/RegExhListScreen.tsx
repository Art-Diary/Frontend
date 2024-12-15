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
import {FONT_NAME, DASH_WIDTH} from '~/components/common/style';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {usefetchRegExhs} from '~/api/queries/regexh';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import CustomTouchable from '~/components/common/CustomTouchable';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {AddMyExhButtonIcon} from '~/components/common/icon';

type RootStackParamList = {
  RegExhList: {isAdmin: boolean};
};

type RegisterNewExhScreenProp = RouteProp<RootStackParamList, 'RegExhList'>;

interface Props {
  route: RegisterNewExhScreenProp;
}

const RegExhListScreen: React.FC<Props> = ({route}) => {
  const {isAdmin} = route.params;
  const {data, isLoading, isError, isSuccess, refetch} =
    usefetchRegExhs(isAdmin);
  const navigation = useNavigation<RootStackNavigationProp>();
  const limit = 13; // 한 페이지에 보이는 리뷰 개수
  const PAGE_GROUP_SIZE = 5; // 한 번에 보여줄 페이지 번호 개수
  const [page, setPage] = useState<number>(1); //현재 페이지
  const [offset, setOffset] = useState<number>(0); //해당 페이지의 첫번째 인덱스
  const [numPagesArr, setNumPagesArr] = useState<number[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [regExhInfoList, setRegExhInfoList] = useState<any | null>(null);

  useEffect(() => {
    if (isFocused) {
      refetch().then(res => {
        setRegExhInfoList(res.data);
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isSuccess) {
      setRegExhInfoList(data);
      // 페이지 수 감소로 현재 페이지가 초과된 경우 처리
      const totalItems = data.length;
      const newNumPages = Math.ceil(totalItems / limit);

      if (page > newNumPages) {
        setPage(newNumPages);
      }
      setNumPages(Math.ceil(data.length / limit));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    setOffset((page - 1) * limit);

    // 시작 페이지와 끝 페이지 계산
    let startPage = 1;
    let endPage = Math.min(PAGE_GROUP_SIZE, numPages);

    if (page > 3 && page <= numPages - 3) {
      startPage = page - 2;
      endPage = page + 2;
    } else if (page > numPages - 3) {
      startPage = Math.max(1, numPages - 4);
      endPage = numPages;
    }

    const tmp = [];
    for (let i = startPage; i <= endPage; i++) {
      tmp.push(i);
    }
    setNumPagesArr(tmp);
  }, [page, numPages]);

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

  const handleAddRegExh = () => {
    navigation.navigate('RegisterNewExh');
  };

  return (
    <Container>
      <BackView
        title={'전시회 등록 확인' + (isAdmin ? ' (관리자)' : '')}
        line={true}>
        {!isAdmin && (
          <CustomTouchable onPress={handleAddRegExh}>
            <AddMyExhButtonIcon />
          </CustomTouchable>
        )}
      </BackView>
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
          {!regExhInfoList || regExhInfoList.length === 0 ? (
            <ErrorMessageView message="등록한 전시회가 없습니다." />
          ) : (
            <>
              {regExhInfoList
                .slice(offset, offset + limit)
                .map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate(
                        isAdmin ? 'ConfirmRegExhByAdmin' : 'CheckRegExhByUser',
                        {regExhId: item.regExhId},
                      );
                    }}>
                    <Category>
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
                        {item.regState === '완료' ? (
                          <RExhStateTrue>{'완료'}</RExhStateTrue>
                        ) : item.regState === '대기' ? (
                          <RExhStateFalse>{'대기'}</RExhStateFalse>
                        ) : (
                          <RExhStateFalse>{'실패'}</RExhStateFalse>
                        )}
                      </CategoryNormal>
                    </Category>
                  </TouchableOpacity>
                ))}
            </>
          )}
        </ScrollView>
        {regExhInfoList && regExhInfoList.length !== 0 && (
          <PageNumberView>
            <CustomTouchable
              onPress={() => setPage(page - 1)}
              disabled={page === 1}>
              <PageNumber>{'<'}</PageNumber>
            </CustomTouchable>

            {numPagesArr.map(item => (
              <CustomTouchable key={item} onPress={() => setPage(item)}>
                {item === page ? (
                  <CurrentPageNumber>{item}</CurrentPageNumber>
                ) : (
                  <PageNumber>{item}</PageNumber>
                )}
              </CustomTouchable>
            ))}

            <CustomTouchable
              onPress={() => setPage(page + 1)}
              disabled={page === numPages}>
              <PageNumber>{'>'}</PageNumber>
            </CustomTouchable>
          </PageNumberView>
        )}
      </RegExhList>
    </Container>
  );
};

export default RegExhListScreen;

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
  padding-bottom: ${hp(1)}px;
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
