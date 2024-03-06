import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

/**
 * {justify-content}: 콘텐츠 항목 사이와 주위에 공간을 분배하느 방법 정의
 * https://velog.io/@cherry_eong/CSS-justify-content-%EC%86%8D%EC%84%B1%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90
 * "flex-direction: row;" 가로 배치
 * "flex-direction: column;" 세로 배치
 *
 * {flex: 1; 의미} https://velog.io/@mooongs/flex1%EC%9D%98-%EC%9D%98%EB%AF%B8
 */
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d3d3d3',
    // justify-content: start;
    // align-items: center;
  },
  text: {
    fontSize: 22,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
    // margin-bottom: 50px;
  },
  button: {
    backgroundColor: '#FF6F61',
    borderRadius: 4,
    padding: 12,
  },
});

const MyDiaryScreen = () => {
  return (
    <View style={commonStyles.container}>
      {/* header */}
      <Text style={commonStyles.text}>내 기록</Text>
      <TouchableOpacity style={commonStyles.button}>
        <Text style={[commonStyles.text, {color: '#FFFFFF'}]}>Press me!</Text>
      </TouchableOpacity>
      {/* footer */}
    </View>
  );
};

export default MyDiaryScreen;
