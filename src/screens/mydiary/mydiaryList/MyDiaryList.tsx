import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import InfoView from '~/components/InfoView';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useMyDiaryActions, useMyDiaryExhId} from '~/zustand/mydiary/mydiary';
import LoadingView from '~/components/LoadingView';
import {useFetchMyDiaryList} from '~/api/queries/mydiary';
import DeleteModal from '~/components/modal/DeleteModal';
import ConfirmationMessage from '~/components/modal/ConfirmationMessage';
import {WriterIcon} from '~/assets/images/index';
import {FillStarIcon} from '~/assets/images/index';
import {EmptyStarIcon} from '~/assets/images/index';
import {PrivateToggle} from '~/assets/images/index';
import {PublicToggle} from '~/assets/images/index';

const {width: screenWidth} = Dimensions.get('window');
const ITEM_WIDTH = screenWidth; // 아이템의 너비: 화면 너비의 80%
const ITEM_MARGIN = (screenWidth - ITEM_WIDTH) / 2; // 아이템 간의 여백

const MyDiaryList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const myExhId = useMyDiaryExhId();
  const {updateDiaryId, updateIsSolo} = useMyDiaryActions();
  const {data: myDiaryList, isLoading, isError} = useFetchMyDiaryList(myExhId);
  const [isDeletePressed, setIsDeletePressed] = useState<boolean>(false);
  const [getDeleteMessage, setGetDeleteMessage] = useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<string>('');

  const deleteModalOpen = (diaryId: number, solo: boolean) => {
    console.log('[MyDiaryDeleteModal] Opening my diary delete modal');
    updateDiaryId(diaryId);
    updateIsSolo(solo);
    setIsDeletePressed(true);
  };

  const deleteModalClose = (isDeleted: number) => {
    if (isDeleted === 1) {
      setDeleteMessage('기록을 삭제했습니다.');
      setGetDeleteMessage(true);
    } else if (isDeleted === 2) {
      setDeleteMessage('에러 발생 ;(');
    }
    setIsDeletePressed(false);
  };

  if (isError) {
    return <InfoView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingView message={'로딩 중 :)'} />;
  }

  if (myDiaryList.length === 0) {
    return <InfoView message={'아직 전시회에 대한 기록이 없습니다 >_<'} />;
  }

  const onPressUpdate = (exhId: number) => {
    // updateExhId(exhId);
    // navigation.navigate('');
  };

  const renderingRate = (rate: string) => {
    const result = [];
    const rateInt = parseInt(rate);
    let num = 0;
    for (let i = 0; i < rateInt; i++) {
      result.push(<FillStarIcon key={`${num++}`} />);
    }
    for (let i = 0; i < 5 - rateInt; i++) {
      result.push(<EmptyStarIcon key={`${num++}`} />);
    }
    return result;
  };
  /**
   * 화살표
   * 기종마다 비율 같게
   *
   * 기록 추가, 수정
   */
  return (
    <FlatList
      data={myDiaryList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH} // 스크롤 간격 설정 (아이템 너비)
      snapToAlignment="center"
      decelerationRate="fast" // 스크롤 속도 설정
      contentContainerStyle={{paddingBottom: 10}}
      renderItem={({item}) => (
        <View style={myDiaryStyles.wrapView}>
          <View style={myDiaryStyles.shadowView}>
            {/* 썸네일 */}
            <ImageBackground
              style={contentStyles.imageBackgroundView}
              source={{uri: `data:image/png;base64,${item.thumbnail}`}}
              height={175}
              blurRadius={8}
              resizeMode="cover"
              alt={'이미지 읽기 실패'}>
              <Image
                source={{uri: `data:image/png;base64,${item.thumbnail}`}}
                width={190}
                height={215}
                resizeMode="contain"
                alt={'이미지 읽기 실패'}
              />
            </ImageBackground>

            {/* 세부 내용 */}
            <View style={contentStyles.infoView}>
              <View style={contentStyles.contentView1}>
                {/* 기록 제목 */}
                <Text style={contentStyles.titleText}>{item.title}</Text>
                {/* 수정 | 삭제 */}
                <View style={{flexDirection: 'row', gap: 4}}>
                  <TouchableOpacity>
                    <Text style={contentStyles.eventText}>수정</Text>
                  </TouchableOpacity>
                  <Text style={contentStyles.eventText}>|</Text>
                  <TouchableOpacity
                    onPress={() => deleteModalOpen(item.diaryId, true)}>
                    <Text style={contentStyles.eventText}>삭제</Text>
                    {isDeletePressed && (
                      <DeleteModal
                        onClose={deleteModalClose}
                        message="기록을 삭제하겠습니까?"
                      />
                    )}
                    {getDeleteMessage && (
                      <ConfirmationMessage
                        message={deleteMessage}
                        onClose={setGetDeleteMessage}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={contentStyles.contentView2}>
                {/* 닉네임 */}
                <View style={{flexDirection: 'row', gap: 7}}>
                  <WriterIcon width={16} />
                  <Text style={contentStyles.nicknameText}>
                    {item.nickname}
                  </Text>
                </View>
                {/* 별점 */}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <Text style={contentStyles.rateText}>별점</Text>
                  <View style={{flexDirection: 'row'}}>
                    {renderingRate(item.rate)}
                  </View>
                </View>
              </View>
              <View style={contentStyles.contentView3}>
                {/* 누구와 */}
                <View style={contentStyles.withView}>
                  <Text style={contentStyles.categoryText}>with</Text>
                  <Text style={contentStyles.withText}>
                    {item.userExhId === null ? item.gatherName : '나'}
                  </Text>
                </View>
                <View style={contentStyles.lineView} />
                {/* 관람 날짜 */}
                <View style={contentStyles.withView}>
                  <Text style={contentStyles.categoryText}>관람 날짜</Text>
                  <Text style={contentStyles.visitText}>
                    {item.visitDate[0]}.{item.visitDate[1] < 10 ? 0 : ''}
                    {item.visitDate[1]}.{item.visitDate[2] < 10 ? 0 : ''}
                    {item.visitDate[2]}
                  </Text>
                </View>
                <View style={contentStyles.lineView} />
                {/* 공개여부 */}
                <View style={contentStyles.withView}>
                  <Text style={contentStyles.categoryText}>비공개/공개</Text>
                  {item.diaryPrivate === false ? (
                    <PrivateToggle />
                  ) : (
                    <PublicToggle />
                  )}
                </View>
              </View>
              <View style={contentStyles.contentView4}>
                {/* 한마디 */}
                <Text style={contentStyles.sayingText}>한마디</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={contentStyles.quoteText}>"</Text>
                  <Text style={contentStyles.sayingContentText}>
                    {item.saying}
                  </Text>
                  <Text style={contentStyles.quoteText}>"</Text>
                </View>

                {/* 전시회 제목 */}
                <Text style={contentStyles.sayingContentText}>
                  {item.exhName}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default MyDiaryList;
/** style */
const myDiaryStyles = StyleSheet.create({
  wrapView: {
    flex: 1,
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_MARGIN,
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },
  shadowView: {
    width: '93%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 3.5,
    paddingTop: 4.3,
    borderColor: '#D3D3D3',
    borderBottomWidth: 0.1, // 테두리 너비
    ...Platform.select({
      android: {
        elevation: 2.5,
      },
    }),
  },
});

const contentStyles = StyleSheet.create({
  imageBackgroundView: {
    width: '100%',
    height: 215,
    alignItems: 'center',
  },
  infoView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  contentView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 37,
  },
  contentView3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 37,
  },
  contentView4: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingVertical: 17,
    borderStyle: 'dashed',
    borderColor: '#D3D3D3',
    borderTopWidth: 1.5,
  },
  withView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  titleText: {
    fontSize: 28,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  eventText: {
    fontSize: 16,
    color: '#979797',
    fontFamily: 'omyu pretty',
  },
  nicknameText: {
    fontSize: 18,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  rateText: {
    fontSize: 16,
    color: '#979797',
    fontFamily: 'omyu pretty',
  },
  categoryText: {
    fontSize: 18,
    color: '#979797',
    fontFamily: 'omyu pretty',
  },
  withText: {
    fontSize: 21.5,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  visitText: {
    fontSize: 21,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  lineView: {
    width: 0.7,
    height: '100%',
    backgroundColor: '#D3D3D3',
  },
  sayingText: {
    fontSize: 26,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  sayingContentText: {
    fontSize: 21,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  quoteText: {
    fontSize: 29,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
});
