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
import SearchExhList from '../../components/exhSearch/SearchExhList';
import {showToast} from '~/components/common/modal/toastConfig';

const MyExhSearchScreen = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const onChangeText = useCallback((text: string) => {
    setSearchKeyword(text);
  }, []);

  const onPressSearch = () => {
    if (checkKeyword(searchKeyword)) {
      showToast('다시 검색해 주세요');
    } else {
      setKeyword(searchKeyword);
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
      <ContentsContainer>
        {/* 검색창 */}
        <SearchContainer>
          <SearchView>
            <SearchWord
              onSubmitEditing={onPressSearch}
              onChangeText={onChangeText}
              placeholder={'전시회를 검색하세요'}
              value={searchKeyword}
            />
            <TouchableOpacity onPress={onPressSearch}>
              <SearchIcon />
            </TouchableOpacity>
          </SearchView>
          <UnderLine />
        </SearchContainer>
        {/* 전시회 목록 */}
        {keyword !== '' && (
          <SearchExhList
            searchKeyword={keyword}
            changeIsPressed={onPressSearch}
          />
        )}
      </ContentsContainer>
    </Container>
  );
};

export default MyExhSearchScreen;

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
