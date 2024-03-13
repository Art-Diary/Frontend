import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface SayingProps {
  saying: number;
  exhName: string;
}

const SayingInfo: React.FC<SayingProps> = ({saying, exhName}) => {
  return (
    <View style={contentStyles.view}>
      {/* 한마디 */}
      <Text style={contentStyles.sayingText}>한마디</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={contentStyles.quoteText}>"</Text>
        <Text style={contentStyles.sayingContentText} numberOfLines={8}>
          {saying}
        </Text>
        <Text style={contentStyles.quoteText}>"</Text>
      </View>

      {/* 전시회 제목 */}
      <Text style={contentStyles.sayingContentText}>{exhName}</Text>
    </View>
  );
};

export default SayingInfo;

/** style */
const contentStyles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 17,
    borderStyle: 'dashed',
    borderColor: '#D3D3D3',
    borderTopWidth: 1.5,
    width: '100%',
  },
  sayingText: {
    fontSize: 26,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  sayingContentText: {
    fontSize: 21,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  quoteText: {
    fontSize: 29,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
});
