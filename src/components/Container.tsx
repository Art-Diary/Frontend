import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import BottomNav from './BottomNav';

/**
 * {justify-content}: 콘텐츠 항목 사이와 주위에 공간을 분배하느 방법 정의
 * https://velog.io/@cherry_eong/CSS-justify-content-%EC%86%8D%EC%84%B1%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90
 * "flex-direction: row;" 가로 배치
 * "flex-direction: column;" 세로 배치
 *
 * {flex: 1; 의미} https://velog.io/@mooongs/flex1%EC%9D%98-%EC%9D%98%EB%AF%B8
 */
const commonStyles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
  },
});

const Container = () => {
  return (
    <SafeAreaView style={commonStyles.view}>
      {/* Bottom Navigation */}
      <BottomNav />
    </SafeAreaView>
  );
};

export default Container;
