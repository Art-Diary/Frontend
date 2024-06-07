import React, {ReactNode, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {SearchIcon} from '~/assets/images';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface SearchExhFrameProps {
  searchKeyword: string;
  onPressSearch: () => void;
  handleSearchKeyword: (keyword: string) => void;
  children: ReactNode;
  searchMessage?: string;
}

const SearchExhFrame: React.FC<SearchExhFrameProps> = ({
  searchKeyword,
  onPressSearch,
  handleSearchKeyword,
  children,
  searchMessage,
}) => {
  const onChangeText = useCallback((text: string) => {
    handleSearchKeyword(text);
  }, []);

  return (
    <ContentsContainer>
      {/* 검색창 */}
      <SearchContainer>
        <SearchView>
          <SearchWord
            onSubmitEditing={onPressSearch}
            onChangeText={onChangeText}
            placeholder={searchMessage ?? '전시회를 검색하세요'}
            value={searchKeyword}
          />
          <TouchableOpacity onPress={onPressSearch}>
            <SearchIcon />
          </TouchableOpacity>
        </SearchView>
        <UnderLine />
      </SearchContainer>
      {/* 검색창 아래 */}
      {children}
    </ContentsContainer>
  );
};

export default SearchExhFrame;

/** style */
const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-bottom: ${hp(5)}px;
`;

const SearchContainer = styled.View`
  flex-direction: column;
  padding-top: ${hp(7)}px;
  padding-bottom: ${hp(5)}px;
  padding-left: ${wp(18)}px;
  padding-right: ${wp(18)}px;
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
