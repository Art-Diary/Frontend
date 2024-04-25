import React, {useCallback, useState} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {SearchIcon} from '~/assets/images';
import BackView from '~/components/common/BackView';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import SearchExhFrame from '../../components/exhSearch/SearchExhFrame';
import {showToast} from '~/components/common/modal/toastConfig';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import useSearchName from '~/zustand/exhibition/exhibition';

const ExhSearchName = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const {name, updateSearchName} = useSearchName();
  const examples: string[] = ['요시다유니', '장욱진', '덕수궁']; //search_list에서 가져올 것.

  const onPressSearch = (name: string) => {
    if (checkKeyword(searchKeyword)) {
      showToast('다시 검색해 주세요');
    } else {
      setKeyword(searchKeyword);
      updateSearchName(searchKeyword);
      console.log('지금 써치 네임은', name, ',');
      //navigation.navigate('Exhibition');
      navigation.goBack();
    }
    Keyboard.dismiss();
  };

  const checkKeyword = (text: string): boolean => {
    var blank = false;
    if (text === '') {
      blank = true;
    }
    if (text.trim() === '') {
      blank = true;
    }
    return blank;
  };

  const onPressPreSearch = (text: string) => {
    setKeyword(text);
    updateSearchName(text);
    navigation.goBack();
  };

  const onPresDelete = (text: string) => {
    //searchList에서 삭제
  };

  return (
    <Container>
      <BackView line={false} children={null} />

      <SearchExhFrame
        searchKeyword={searchKeyword}
        onPressSearch={() => onPressSearch(searchKeyword)}
        handleSearchKeyword={setSearchKeyword}>
        {/* children={null}> */}
        <PreSearch>{'최근검색기록'}</PreSearch>

        {/*테두리 있는 것
        <PreSearchView>
          <PreSearchList>
            {'요시다유니'}
            {' x'}
          </PreSearchList>
        </PreSearchView>
        <PreSearchView>
          <PreSearchList>{'덕수궁'}</PreSearchList>
        </PreSearchView>
        <PreSearchView>
          <PreSearchList>{'대구'}</PreSearchList>
        </PreSearchView> */}

        {/* <PreSearchView>
          <TouchableOpacity onPress={() => onPressPreSearch('요시다유니')}>
            <PreSearchList>{'요시다유니'}</PreSearchList>
          </TouchableOpacity>
          <TouchableOpacity onPress=onPressDelete>
            <PreSearchList>{'X'}</PreSearchList>
          </TouchableOpacity>
        </PreSearchView> */}

        {examples.map((item: any) => (
          <PreSearchView>
            <TouchableOpacity onPress={() => onPressPreSearch(item)}>
              <PreSearchList>{item}</PreSearchList>
            </TouchableOpacity>
            <TouchableOpacity /*onPress=onPressDelete*/>
              <PreSearchList>{'X'}</PreSearchList>
            </TouchableOpacity>
          </PreSearchView>
        ))}
      </SearchExhFrame>
    </Container>
  );
};

export default ExhSearchName;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
`;

const PreSearchView = styled.View`
  //flex: 1;
  flex-direction: row;
  // padding: ${wp(10)}px;
  // text-align: center;
  padding-bottom: ${wp(2)}px;
  padding-top: ${wp(5)}px;
  padding-left: ${wp(7)}px;
  padding-right: ${wp(10)}px;
`;

const PreSearch = styled.Text`
  // flex: 1;
  flex-direction: column;
  font-size: ${fp(17)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
  padding-top: ${wp(18)}px;
  padding-bottom: ${wp(5)}px;
  padding-left: ${wp(10)}px;
`;

const PreSearchList = styled.Text`
  //flex: 1;
  flex-direction: row;
  font-size: ${fp(15)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
  padding-right: ${wp(10)}px;
  padding-bottom: ${wp(5)}px;
  padding-top: ${wp(5)}px;
  padding-left: ${wp(15)}px;
  /* border-color: #d3d3d3;
  border-width: ${wp(1.3)}px;
  border-radius: ${wp(20)}px; */
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
`;

const SearchContainer = styled.View`
  flex-direction: column;
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
`;

const UnderLine = styled.View`
  border-bottom-width: 1px;
  border-color: #ff6f61;
`;

const SearchView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchWord = styled.TextInput`
  flex: 1;
  font-size: ${fp(16)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;
