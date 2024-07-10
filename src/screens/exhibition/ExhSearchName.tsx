import React, {useState} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import SearchExhFrame from '../../components/exhSearch/SearchExhFrame';
import {showToast} from '~/components/common/modal/toastConfig';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useSearchNameActions} from '~/zustand/exhibition/exhibition';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';
import {BACK_COLOR, LIGHT_GREY, MIDDLE_GREY} from '~/components/common/colors';
import {AREA_FONT_SIZE, DASH_WIDTH, FONT_NAME} from '~/components/common/style';

const ExhSearchName = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  // const {name, updateSearchName} = useSearchName();
  const {updateSearchName} = useSearchNameActions();
  const examples: string[] = ['요시다유니', '장욱진', '덕수궁']; //search_list에서 가져올 것.

  const onPressSearch = (name: string) => {
    if (checkBlankInKeyword(searchKeyword)) {
      showToast('다시 검색해 주세요.');
    } else {
      setKeyword(searchKeyword);
      updateSearchName(searchKeyword);
      console.log('지금 써치 네임은', name, ',');
      //navigation.navigate('Exhibition');
      navigation.goBack();
    }
    Keyboard.dismiss();
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
        <PreSearch>{'최근검색기록'}</PreSearch>

        {/* 테두리 있는 것 */}
        {/* <PreSearchView>
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

        {examples.map((item: any, index: number) => (
          <PreSearchView key={index}>
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
  background-color: ${BACK_COLOR};
`;

const PreSearchView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${wp(1.8)}px;
  padding-bottom: ${wp(1.8)}px;
  padding-left: ${wp(8.3)}px;
  gap: ${wp(6)}px;
`;

const PreSearch = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${wp(4.5)}px;
  padding-bottom: ${wp(1.5)}px;
  padding-left: ${wp(5.5)}px;
  padding-right: ${wp(5.5)}px;
`;

const PreSearchList = styled.Text`
  color: ${LIGHT_GREY};
  font-size: ${AREA_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  text-align: center;

  /* 테두리 있는 것 */
  /* padding: ${wp(2)}px;
  border-color: ${LIGHT_GREY};
  border-width: ${DASH_WIDTH}px;
  border-radius: ${wp(50)}px; */
`;
