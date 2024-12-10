import React, {ReactNode, useCallback} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME} from '../common/style';
import {DEFAULT_TEXT, MAIN_COLOR} from '../common/colors';
import {SearchButtonIcon, DeleteButtonIcon} from '../common/icon';
//import CustomTouchable from '~/components/common/CustomTouchable';

interface SearchExhFrameProps {
  searchKeyword: string;
  onPressSearch: () => void;
  handleSearchKeyword: (keyword: string) => void;
  children: ReactNode;
  searchMessage?: string;
  deleteButton?: boolean;
  handleCurrentPage?: (currentPage: boolean) => void; //deleteButton이 true일 때만, 즉 전시회탭에서 검색어로 전시회를 조회할 때만
}

const SearchExhFrame: React.FC<SearchExhFrameProps> = ({
  searchKeyword,
  onPressSearch,
  handleSearchKeyword,
  children,
  searchMessage,
  deleteButton,
  handleCurrentPage,
}) => {
  const onChangeText = useCallback((text: string) => {
    handleSearchKeyword(text);
  }, []);

  const onPressDelete = () => {
    if (handleCurrentPage) {
      handleCurrentPage(false);
    }
    handleSearchKeyword('');
  };
  return (
    <ContentsContainer>
      {/* 검색창 */}
      <SearchContainer>
        <SearchView>
          <WordContent>
            <SearchWord
              onSubmitEditing={onPressSearch} // 키보드 상에서 엔터 누르면 확인 버튼 누르는 것과 같음.
              onChangeText={onChangeText}
              placeholder={!searchKeyword ? searchMessage : ''}
              value={searchKeyword}
            />
            {searchKeyword && (
              <DeleteIconTouch onPress={onPressDelete}>
                <DeleteButtonIcon />
              </DeleteIconTouch>
            )}
          </WordContent>
          <SearchIconTouch activeOpacity={0.6} onPress={onPressSearch}>
            <SearchButtonIcon />
          </SearchIconTouch>
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
  padding-top: ${wp(2.2)}px;
  padding-bottom: ${hp(0.8)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  width: 100%;
`;

const UnderLine = styled.View`
  border-bottom-width: ${wp(0.3)}px;
  border-color: ${MAIN_COLOR};
`;

const SearchView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: ${wp(1)}px;
`;

const SearchIconTouch = styled.TouchableOpacity`
  padding-top: ${hp(2.4)}px;
  width: 95%;
`;

const DeleteIconTouch = styled.TouchableOpacity`
  align-self: center;
`;

const SearchWord = styled.TextInput`
  font-size: ${rf(15.2)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-right: 0%;
  width: 95%;
`;

const WordContent = styled.View`
  flex-direction: row;
`;
