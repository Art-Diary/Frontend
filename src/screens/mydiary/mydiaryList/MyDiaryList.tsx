import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import InfoView from '~/components/InfoView';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useMyExhExhId} from '~/zustand/mydiary/myexhs';
import LoadingView from '~/components/LoadingView';
import {useFetchMyDiaryList} from '~/api/queries/mydiary';
import SvgIcon from '~/components/SvgIcon';
import DeleteModal from '~/components/modal/DeleteModal';

const MyDiaryList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const myExhId = useMyExhExhId();
  const {data: myDiaryList, isLoading, isError} = useFetchMyDiaryList(myExhId);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onPressModalOpen = () => {
    console.log('팝업을 여는 중입니다.');
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
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

  const onPressDelete = () => {
    onPressModalOpen();
    // updateExhId(exhId);
    // navigation.navigate('delete-my-diary');
    // return <DeleteModal></DeleteModal>;
  };

  /**
   * 기록 추가
   * 수정|삭제
   * 닉네임 아이콘
   * 별점
   * 폰 별 사이즈 적용
   */
  return (
    <View style={myDiaryStyles.wrapView}>
      <View style={myDiaryStyles.shadowView}>
        {/* 썸네일 */}
        <ImageBackground
          style={contentStyles.imageBackgroundView}
          source={{uri: `data:image/png;base64,${myDiaryList[0].thumbnail}`}}
          height={175}
          blurRadius={8}
          resizeMode="cover"
          alt={'이미지 읽기 실패'}>
          <Image
            source={{
              uri: `data:image/png;base64,${myDiaryList[0].thumbnail}`,
            }}
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
            <Text style={contentStyles.titleText}>{myDiaryList[0].title}</Text>
            {/* 수정 | 삭제 */}
            <View style={{flexDirection: 'row', gap: 4}}>
              <TouchableOpacity>
                <Text style={contentStyles.eventText}>수정</Text>
              </TouchableOpacity>
              <Text style={contentStyles.eventText}>|</Text>
              <TouchableOpacity onPress={onPressDelete}>
                <Text style={contentStyles.eventText}>삭제</Text>
                {isModalVisible && (
                  <DeleteModal
                    onClose={onPressModalClose}
                    message="기록을 삭제하겠습니까?"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={contentStyles.contentView2}>
            {/* 닉네임 */}
            <View style={{flexDirection: 'row', gap: 10}}>
              <SvgIcon name="WriterIcon" />
              <Text style={contentStyles.nicknameText}>
                {myDiaryList[0].nickname}
              </Text>
            </View>
            {/* 별점 */}
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Text style={contentStyles.rateText}>별점</Text>
              <View style={{flexDirection: 'row'}}>
                <SvgIcon name={'FillStarIcon'} />
                <SvgIcon name={'FillStarIcon'} />
                <SvgIcon name={'FillStarIcon'} />
                <SvgIcon name={'EmptyStarIcon'} />
                <SvgIcon name={'EmptyStarIcon'} />
              </View>
            </View>
          </View>
          <View style={contentStyles.contentView3}>
            {/* 누구와 */}
            <View style={contentStyles.withView}>
              <Text style={contentStyles.categoryText}>with</Text>
              <Text style={contentStyles.withText}>
                {myDiaryList[0].userExhId === null
                  ? myDiaryList[0].gatherName
                  : '나'}
              </Text>
            </View>
            <View style={contentStyles.lineView} />
            {/* 관람 날짜 */}
            <View style={contentStyles.withView}>
              <Text style={contentStyles.categoryText}>관람 날짜</Text>
              <Text style={contentStyles.visitText}>
                {myDiaryList[0].visitDate[0]}.
                {myDiaryList[0].visitDate[1] < 10 ? 0 : ''}
                {myDiaryList[0].visitDate[1]}.
                {myDiaryList[0].visitDate[2] < 10 ? 0 : ''}
                {myDiaryList[0].visitDate[2]}
              </Text>
            </View>
            <View style={contentStyles.lineView} />
            {/* 공개여부 */}
            <View style={contentStyles.withView}>
              <Text style={contentStyles.categoryText}>비공개/공개</Text>
              {myDiaryList[0].diaryPrivate === false ? (
                <SvgIcon name="PrivateToggle" />
              ) : (
                <SvgIcon name="PublicToggle" />
              )}
            </View>
          </View>
          <View style={contentStyles.contentView4}>
            {/* 한마디 */}
            <Text style={contentStyles.sayingText}>한마디</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={contentStyles.quoteText}>"</Text>
              <Text style={contentStyles.sayingContentText}>
                {myDiaryList[0].saying}
              </Text>
              <Text style={contentStyles.quoteText}>"</Text>
            </View>

            {/* 전시회 제목 */}
            <Text style={contentStyles.sayingContentText}>
              {myDiaryList[0].exhName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyDiaryList;

/** style */
const myDiaryStyles = StyleSheet.create({
  wrapView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 43.5,
  },
  shadowView: {
    width: '100%',
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
