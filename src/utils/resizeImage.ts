import ImageResizer from '@bam.tech/react-native-image-resizer';

export const changeImageSize = async (imageUri: string) => {
  const resizedImage = await ImageResizer.createResizedImage(
    imageUri ?? '', // path
    640, // width
    640, // height
    'JPEG', // format
    100, // quality
    undefined, // rotation
    // uploadFileName, // outputPath
    undefined, // keepMeta,
    undefined, // options => object
  );
  const uri = resizedImage.uri;
  const filename = uri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename || '');
  const type = match ? `image/${match[1]}` : `image`;

  return {
    name: filename,
    type: type,
    uri: uri,
  };
};
