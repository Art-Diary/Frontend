import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {
  BACK_COLOR,
  DARK_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {FONT_NAME, DASH_WIDTH} from '~/components/common/style';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import InfoMessageView from '~/components/common/InfoMessageView';
import CustomTouchable from '~/components/common/CustomTouchable';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {WriteDiaryButtonIcon} from '~/components/common/icon';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';
import {RootStackParamList} from '~/utils/stackTypes';
import {useFetchQnaList} from '~/api/queries/qna';

type QnaListScreenProp = RouteProp<RootStackParamList, 'QnaList'>;

interface Props {
  route: QnaListScreenProp;
}

const QnaListScreen: React.FC<Props> = ({route}) => {
  const limit = 13; // 한 페이지에 보이는 리뷰 개수
  const PAGE_GROUP_SIZE = 5; // 한 번에 보여줄 페이지 번호 개수
  // Hooks
  const {isAdmin} = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation<RootStackNavigationProp>();

  // State Management
  const [page, setPage] = useState<number>(1); //현재 페이지
  const [offset, setOffset] = useState<number>(0); //해당 페이지의 첫번째 인덱스
  const [numPagesArr, setNumPagesArr] = useState<number[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const [qnaList, setQnaList] = useState([]);

  // API Hooks
  const {
    data: qnaInfoList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchQnaList(isAdmin);

  // Effects
  useEffect(() => {
    if (qnaInfoList) {
      setQnaList(qnaInfoList);
    }
  }, [qnaInfoList]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    if (qnaList.length > 0) {
      // 페이지 수 감소로 현재 페이지가 초과된 경우 처리
      const totalItems = qnaList.length;
      const newNumPages = Math.ceil(totalItems / limit);

      if (page > newNumPages) {
        setPage(newNumPages);
      }
      setNumPages(Math.ceil(qnaList.length / limit));
    }
  }, [qnaList]);

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

  // Handlers
  const handleRefetch = async () => {
    await refetch().then(() => {
      setRefreshing(false);
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  const handleAddQna = () => {
    navigation.navigate('CreateQna');
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      <BackView title={'Q&A' + (isAdmin ? ' (관리자)' : '')} line={true}>
        {!isAdmin && (
          <CustomTouchable
            onPress={handleAddQna}
            style={{paddingRight: 10, paddingVertical: 3}}>
            <WriteDiaryButtonIcon />
          </CustomTouchable>
        )}
      </BackView>
      <QnaList>
        <Category>
          <CategoryNum>
            <CategoryName>{'no.'}</CategoryName>
          </CategoryNum>
          <CategoryTitle>
            <CategoryName>{'제목'}</CategoryName>
          </CategoryTitle>
          <CategoryNormal>
            <CategoryName>{'등록일'}</CategoryName>
          </CategoryNormal>
          <CategoryNormal>
            <CategoryName>{'답변현황'}</CategoryName>
          </CategoryNormal>
        </Category>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          {!qnaList || qnaList.length === 0 ? (
            <InfoMessageView message="문의 내역이 없습니다." />
          ) : (
            <>
              {qnaList
                .slice(offset, offset + limit)
                .map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('QnaDetail', {
                        isAdmin,
                        qnaId: item.qnaId,
                      });
                    }}>
                    <Category>
                      <CategoryNum>
                        <QnaNumber>{index + 1}</QnaNumber>
                      </CategoryNum>
                      <CategoryTitle>
                        <QnaTitle numberOfLines={1}>{item.title}</QnaTitle>
                      </CategoryTitle>
                      <CategoryNormal>
                        <QnaWriteDate>{item.writeDate}</QnaWriteDate>
                      </CategoryNormal>
                      <CategoryNormal>
                        <QnaStateText state={item.state}>
                          {item.state ? '완료' : '대기'}
                        </QnaStateText>
                      </CategoryNormal>
                    </Category>
                  </TouchableOpacity>
                ))}
            </>
          )}
        </ScrollView>
        {qnaList && qnaList.length !== 0 && (
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
      </QnaList>
    </Container>
  );
};

export default QnaListScreen;

/** style */

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
  width: 100%;
`;

const QnaList = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
`;

const Category = styled.View`
  flex-direction: row;
  padding-left: ${wp(3)}px;
  padding-right: ${wp(3)}px;
  padding-top: ${hp(1.5)}px;
  padding-bottom: ${hp(1.5)}px;
  border-bottom-width: ${DASH_WIDTH}px;
  border-bottom-color: ${LIGHT_GREY};
  gap: ${wp(3)}px;
`;

const CategoryNum = styled.View`
  width: ${wp(10)}px;
`;

const CategoryTitle = styled.View`
  width: ${wp(37)}px;
`;

const CategoryNormal = styled.View`
  width: ${wp(17)}px;
  align-items: center;
`;

const CategoryName = styled.Text`
  font-size: ${rf(16)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

const QnaNumber = styled.Text`
  font-size: ${rf(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

const QnaTitle = styled.Text`
  font-size: ${rf(15)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

const QnaWriteDate = styled.Text`
  font-size: ${rf(12)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  line-height: ${wp(6)}px;
`;

interface QnaStateProps {
  state: boolean;
}

const QnaStateText = styled.Text<QnaStateProps>`
  text-align: center;
  font-size: ${rf(16)}px;
  color: ${MIDDLE_GREY};
  color: ${(props: QnaStateProps) =>
    props.state ? `${MAIN_COLOR}` : `${MIDDLE_GREY}`};
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
  color: ${DARK_GREY};
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
