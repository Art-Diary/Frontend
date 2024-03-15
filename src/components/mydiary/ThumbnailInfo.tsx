import React from 'react';
import styled from 'styled-components/native';

interface ThumbnailProps {
  thumbnail: string;
}

const ThumbnailInfo: React.FC<ThumbnailProps> = ({thumbnail}) => {
  return (
    <Container>
      {/* 썸네일 */}
      <ThumbnailBackground
        source={{uri: `data:image/png;base64,${thumbnail}`}}
        blurRadius={8}
        resizeMode="cover"
        alt={'이미지 읽기 실패'}>
        <Thumbnail
          source={{uri: `data:image/png;base64,${thumbnail}`}}
          resizeMode="contain"
          alt={'이미지 읽기 실패'}
        />
      </ThumbnailBackground>
    </Container>
  );
};

export default ThumbnailInfo;

/** style */
const Container = styled.View`
  height: 30%;
`;

const ThumbnailBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Thumbnail = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;
