import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {PrivateToggle} from '~/assets/images/index';
import {PublicToggle} from '~/assets/images/index';

interface OtherProps {
  userExhId: number;
  gatherName: string;
  visitDate: number[];
  diaryPrivate: boolean;
}

const OtherInfo: React.FC<OtherProps> = ({
  userExhId,
  gatherName,
  visitDate,
  diaryPrivate,
}) => {
  return (
    <View style={contentStyles.view}>
      {/* 누구와 */}
      <View style={contentStyles.withView}>
        <Text style={contentStyles.categoryText}>with</Text>
        <Text style={contentStyles.withText}>
          {userExhId === null ? gatherName : '나'}
        </Text>
      </View>
      <View style={contentStyles.lineView} />
      {/* 관람 날짜 */}
      <View style={contentStyles.withView}>
        <Text style={contentStyles.categoryText}>관람 날짜</Text>
        <Text style={contentStyles.visitText}>
          {visitDate[0]}.{visitDate[1] < 10 ? 0 : ''}
          {visitDate[1]}.{visitDate[2] < 10 ? 0 : ''}
          {visitDate[2]}
        </Text>
      </View>
      <View style={contentStyles.lineView} />
      {/* 공개여부 */}
      <View style={contentStyles.withView}>
        <Text style={contentStyles.categoryText}>비공개/공개</Text>
        {diaryPrivate === false ? <PrivateToggle /> : <PublicToggle />}
      </View>
    </View>
  );
};

export default OtherInfo;

/** style */
const contentStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '20%',
    paddingBottom: 37,
  },
  withView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  categoryText: {
    fontSize: 18,
    color: '#979797',
    fontFamily: 'omyu pretty',
  },
  withText: {
    fontSize: 21.5,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  lineView: {
    width: 0.7,
    height: '100%',
    backgroundColor: '#D3D3D3',
  },
  visitText: {
    fontSize: 21,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
});
