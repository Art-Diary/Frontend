import React from 'react';
import {StyleSheet, ImageBackground, Image, View} from 'react-native';

interface ThumbnailProps {
  thumbnail: string;
}

const ThumbnailInfo: React.FC<ThumbnailProps> = ({thumbnail}) => {
  return (
    <View style={contentStyles.view}>
      {/* 썸네일 */}
      <ImageBackground
        style={contentStyles.imageBackgroundView}
        source={{uri: `data:image/png;base64,${thumbnail}`}}
        height={175}
        width={200}
        blurRadius={8}
        resizeMode="cover"
        alt={'이미지 읽기 실패'}>
        <Image
          style={contentStyles.image}
          source={{uri: `data:image/png;base64,${thumbnail}`}}
          resizeMode="contain"
          alt={'이미지 읽기 실패'}
        />
      </ImageBackground>
    </View>
  );
};

export default ThumbnailInfo;

/** style */
const contentStyles = StyleSheet.create({
  view: {
    // flex: 1,
    height: '30%',
  },
  imageBackgroundView: {
    width: '100%',
    height: '100%',
    // height: 215,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // width: 190,
    // height: 215,
    alignItems: 'center',
  },
});
