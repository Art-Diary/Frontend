import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {WriterIcon} from '~/assets/images/index';
import {FillStarIcon} from '~/assets/images/index';
import {EmptyStarIcon} from '~/assets/images/index';

interface WriterRateProps {
  nickname: string;
  rate: string;
}

const WriterRateInfo: React.FC<WriterRateProps> = ({nickname, rate}) => {
  const renderingRate = (rate: string) => {
    const result = [];
    const rateInt = parseInt(rate);
    let num = 0;
    for (let i = 0; i < rateInt; i++) {
      result.push(<FillStarIcon key={`${num++}`} />);
    }
    for (let i = 0; i < 5 - rateInt; i++) {
      result.push(<EmptyStarIcon key={`${num++}`} />);
    }
    return result;
  };

  return (
    <View style={contentStyles.view}>
      {/* 닉네임 */}
      <View style={{flexDirection: 'row', gap: 7}}>
        <WriterIcon width={16} />
        <Text style={contentStyles.nicknameText}>{nickname}</Text>
      </View>
      {/* 별점 */}
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <Text style={contentStyles.rateText}>별점</Text>
        <View style={{flexDirection: 'row'}}>{renderingRate(rate)}</View>
      </View>
    </View>
  );
};

export default WriterRateInfo;

/** style */
const contentStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 37,
  },
  nicknameText: {
    fontSize: 18,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  rateText: {
    fontSize: 17,
    color: '#979797',
    fontFamily: 'omyu pretty',
  },
});
