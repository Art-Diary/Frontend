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

  return (
    <Container>
      <BackView line={false} children={null} />
      <SearchExhFrame
        searchKeyword={searchKeyword}
        onPressSearch={() => onPressSearch(searchKeyword)}
        handleSearchKeyword={setSearchKeyword}
        children={null}></SearchExhFrame>
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
