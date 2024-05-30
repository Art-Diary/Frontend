import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {showToast} from '~/components/common/modal/toastConfig';
import SearchExhFrame from '~/components/exhSearch/SearchExhFrame';
import SearchExhList from '~/screens/mydiary/SearchExhList';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';

const SearchAddVisitExhInGatheringScreen = () => {
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
      <BackView
        line={true}
        children={null}
        title={'모임에 추가할 전시회 검색'}
      />
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
            forGathering={true}
          />
        )}
      </SearchExhFrame>
    </Container>
  );
};

export default SearchAddVisitExhInGatheringScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
`;
