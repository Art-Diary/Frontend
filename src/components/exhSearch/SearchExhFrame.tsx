import React, {ReactNode, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {SearchIcon} from '~/assets/images';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME} from '../common/style';
import {DEFAULT_TEXT, MAIN_COLOR} from '../common/colors';

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
            onSubmitEditing={onPressSearch} // 키보드 상에서 엔터 누르면 확인 버튼 누르는 것과 같음.
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
`;

const SearchContainer = styled.View`
  flex-direction: column;
  padding-top: ${hp(1.2)}px;
  padding-bottom: ${hp(0.8)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
`;

const UnderLine = styled.View`
  border-bottom-width: ${wp(0.3)}px;
  border-color: ${MAIN_COLOR};
`;

const SearchView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchWord = styled.TextInput`
  flex: 1;
  font-size: ${rf(15.2)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;
