import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import SearchExhList from './SearchExhList';
import {showToast} from '~/components/common/modal/toastConfig';
import SearchExhFrame from '~/components/exhSearch/SearchExhFrame';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';

const MyExhSearchScreen = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const onPressSearch = () => {
    if (checkBlankInKeyword(searchKeyword)) {
      showToast('다시 검색해 주세요');
    } else {
      setKeyword(searchKeyword);
    }
    Keyboard.dismiss();
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
