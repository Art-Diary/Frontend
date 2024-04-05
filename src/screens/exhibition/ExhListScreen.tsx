import React, {useEffect, useState} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import ExhItemView from '~/components/exhibition/ExhItemView';
import {
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {CalendarIcon} from '~/assets/images/index';
import {AnotherSearchIcon} from '~/assets/images/index';
import {ClassifyButton} from '~/assets/images/index';
import {EmptyHeart} from '~/assets/images/index';
import {FullHeart} from '~/assets/images/index';
import {useQuery} from 'react-query';
import {fetchAddLike, fetchAllExh} from '~/api/exhibition';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useAddLike, useDeleteLike} from '~/api/queries/exhibition';
import {showToast} from '~/components/common/modal/toastConfig';
import ExhSearchModal from './ExhSearchModal';

interface Exhibition {
  exhId: number;
  exhName: string;
  gallery: string;
  exhPeriodStart: Date;
  exhPeriodEnd: Date;
  poster: string;
  favoriteExh: boolean;
}
const ExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {data, isLoading, isError, isSuccess, refetch} = useQuery(
    'AllExhList',
    fetchAllExh,
    {
      onSuccess: data =>
        console.log('[MyExhListScreen] success fetch AllExhLists'),
      onError: error => console.error('Error fetching data:', error),
      select: (res: any) => res.data,
    },
  );

  const [hearts, setHearts] = useState<Exhibition[]>([]);
  const [favExhId, setfavExhId] = useState<number>(0); //누른 전시회 exhId
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [like, setLike] = useState<boolean>(false); //좋아요를 누르면 true
  const [dislike, setDislike] = useState<boolean>(false); //삭제할때 true
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //post
  const {
    mutate: addLike,
    isLoading: isLoadingLike,
    isError: isErrorLike,
    isSuccess: isSuccessLike,
  } = useAddLike(favExhId);

  const {
    mutate: DeleteLike,
    isLoading: isLoadingDislike,
    isError: isErrorDislike,
    isSuccess: isSuccessDislike,
  } = useDeleteLike(deleteList);

  useEffect(() => {
    if (isSuccess) {
      setHearts(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (like) {
      addLike();
      setLike(false);
    }
  }, [like]);

  useEffect(() => {
    if (dislike) {
      DeleteLike();
      setDislike(false);
    }
  }, [dislike]);

  useEffect(() => {
    if (isErrorLike) {
      //showToast('좋아요 실패했습니다.');
      console.log('좋아요 실패');
    }
    if (isLoadingLike) {
      // setIsLoadingOpen(true);
      console.log('좋아요 로딩중');
    }
    if (isSuccessLike) {
      console.log(favExhId);
      console.log('좋아요 성공');
    }

    if (isErrorDislike) {
      showToast('좋아요 삭제 실패했습니다.');
      //console.log('좋아요 실패');
    }
    if (isLoadingDislike) {
      // setIsLoadingOpen(true);
      console.log('좋아요 삭제 로딩중');
    }
    if (isSuccessDislike) {
      console.log(favExhId);
      console.log('좋아요 삭제');
    }
  }, [
    isErrorLike,
    isLoadingLike,
    isSuccessLike,
    isErrorDislike,
    isLoadingDislike,
    isSuccessDislike,
  ]);

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'로딩 중 :)'} />;
  }

  const onPressSearchOption = () => {
    setIsModalOpen(true);
  };

  const onPressHeart = (exhId: number, index: number) => {
    const tmp: number[] = [];
    setfavExhId(exhId);

    if (!hearts[index].favoriteExh) {
      setLike(true);
    } else {
      tmp.push(exhId);
      setDeleteList(tmp);
      setDislike(true);
    }
    const updatedItems = hearts.map((item: any) =>
      item.exhId === exhId ? {...item, favoriteExh: !item.favoriteExh} : item,
    );

    setHearts(updatedItems);
  };

  return (
    <Container>
      {/* header */}
      <Header title={'전시회'}>
        <IconsView>
          <TouchableOpacity onPress={() => onPressSearchOption()}>
            <ClassifyButton />
            {isModalOpen && (
              <ExhSearchModal title={'전시 분류 카테고리'} x={'X'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
          /* onPress={() => navigation.navigate('MyExhibitionSearch')}*/
          >
            <AnotherSearchIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <CalendarIcon />
          </TouchableOpacity>
        </IconsView>
      </Header>

      {/* body */}

      <ScrollView style={{flex: 1}} scrollEventThrottle={200}>
        {data.map((item: any, index: number) => (
          <Contents key={item.exhId}>
            <TouchableOpacity>
              <ExhItemView {...item}></ExhItemView>
            </TouchableOpacity>
            <EmptyHeartContent>
              <HeartContent>
                <TouchableOpacity
                  onPress={() => onPressHeart(item.exhId, index)}>
                  {hearts.length !== 0 && hearts[index].favoriteExh ? (
                    <FullHeart />
                  ) : (
                    <EmptyHeart />
                  )}
                </TouchableOpacity>
              </HeartContent>
            </EmptyHeartContent>
          </Contents>
        ))}
      </ScrollView>
    </Container>
  );
};

export default ExhListScreen;

/** style */
const Container = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const HeartContent = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const IconsView = styled.View`
  // flex: 1;
  flex-direction: row;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 동일한 폭의 열을 만듦 */
  gap: ${wp(15)}px;
  /* display: flex;
  justify-content: space-between;*/
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: ${wp(15)}px;
  margin-right: ${wp(15)}px;
  background-color: #f6f6f6;
`;

const EmptyHeartContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: ${wp(30)}px;
  margin-left: ${wp(0)}px;
  margin-right: ${wp(0)}px;
  border-bottom-width: ${hp(0.5)}px;
  border-bottom-color: #d3d3d3;
`;
