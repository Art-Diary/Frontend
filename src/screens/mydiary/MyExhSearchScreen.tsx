import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import SearchExhList from './SearchExhList';
import {showToast} from '~/components/common/modal/toastConfig';
import SearchExhFrame from '~/components/exhSearch/SearchExhFrame';

const MyExhSearchScreen = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

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
      {/* 검색창 */}
      <SearchExhFrame
        searchKeyword={searchKeyword}
        onPressSearch={onPressSearch}
        handleSearchKeyword={setSearchKeyword}>
        {/* 전시회 목록 */}
        {keyword !== '' && (
          <SearchExhList
            searchKeyword={keyword}
            changeIsPressed={onPressSearch}
          />
        )}
      </SearchExhFrame>
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
