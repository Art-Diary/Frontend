import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchSearchExh} from '~/api/queries/exhibition';
import InfoMessage from '~/components/common/InfoMessage';
import Loading from '~/components/common/Loading';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {JoinDateWithDot, getDateDay} from '~/utils/Date';
import {useMySoloActions} from '~/zustand/mydiary/mySoloStoredDates';

interface SearchExhListProps {
  searchKeyword: string;
  changeIsPressed: () => void;
}

const SearchExhList: React.FC<SearchExhListProps> = ({
  searchKeyword,
  changeIsPressed,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    data: exhList,
    isLoading,
    isError,
    isSuccess,
  } = useFetchSearchExh(searchKeyword);
  const {updateSoloExhId} = useMySoloActions();

  useEffect(() => {
    if (isSuccess) {
      changeIsPressed();
    }
  }, [isSuccess]);

  if (isError) {
    return <InfoMessage message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <Loading message={'로딩 중 :)'} />;
  }

  const onPressExh = (exhId: number) => {
    updateSoloExhId(exhId);
    navigation.navigate('AddMyVisitDateRoutes');
  };

  const changeExhDateFormat = (
    exhPeriodStart: number[],
    exhPeriodEnd: number[],
  ): string => {
    const start = JoinDateWithDot(exhPeriodStart);
    const end = JoinDateWithDot(exhPeriodEnd);
    const startDay = getDateDay(exhPeriodStart);
    const endDay = getDateDay(exhPeriodEnd);
    return start + ' (' + startDay + ')' + ' ~ ' + end + ' (' + endDay + ')';
  };

  return (
    <ExhListView>
      <FlatList
        data={exhList}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => onPressExh(item.exhId)}>
            <ExhView>
              <Poster
                source={{uri: `data:image/png;base64,${item.poster}`}}
                resizeMode="contain"
                alt={'이미지 읽기 실패'}
              />
              <ExhInfo>
                <ExhName>{item.exhName}</ExhName>
                <ExhGallery>{item.gallery}</ExhGallery>
                <ExhDate>
                  {changeExhDateFormat(item.exhPeriodStart, item.exhPeriodEnd)}
                </ExhDate>
              </ExhInfo>
            </ExhView>
          </TouchableOpacity>
        )}
      />
    </ExhListView>
  );
};

export default SearchExhList;

const ExhListView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ExhView = styled.View`
  flex-direction: row;
  padding: ${wp(10)}px;
  gap: ${wp(10)}px;
  border-bottom-width: ${hp(0.5)}px;
  border-bottom-color: #d3d3d3;
`;

const ExhInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  gap: ${hp(7)}px;
`;

const ExhName = styled.Text`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const ExhGallery = styled.Text`
  font-size: ${fp(15)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const ExhDate = styled.Text`
  font-size: ${fp(13)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const Poster = styled.Image`
  width: ${wp(70)}px;
  height: ${hp(70)}px;
  align-items: center;
`;
