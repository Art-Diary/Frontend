import {Dimensions} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export function widthPercentage(width: number): number {
  const percentage = (width / 360) * 100;

  return responsiveScreenWidth(percentage);
}

export function heightPercentage(height: number): number {
  const percentage = (height / 640) * 100;

  return responsiveScreenHeight(percentage);
}

export function fontPercentage(size: number): number {
  const percentage = size * 0.135;

  return responsiveFontSize(percentage);
}

// ---------------------

export function responseDash(size: number) {
  return wp(size);
}

export const sizePercentage = (size: number, minSize: number = 1): number => {
  const calculatedSize = wp(size - 11);

  return size >= 11 ? calculatedSize : wp(minSize);
};

export function responseFont(size: number) {
  return wp(size - 15);
}

// const {width, height} = Dimensions.get('window');
// const FIGMA_WINDOW = {
//   width: 906,
//   height: 1028,
// };
// const SCREEN_RATIO =
//   (width + height) / (FIGMA_WINDOW.width + FIGMA_WINDOW.height);

// const RATIO = {
//   width: width / FIGMA_WINDOW.width,
//   height: height / FIGMA_WINDOW.height,
// };

// export function responseDash(size: number) {
//   const newSize = size * SCREEN_RATIO;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 1;
// }

// export function responseFont(size: number) {
//   const newSize = size * SCREEN_RATIO;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 10;
// }

// 기준 휴대폰 화면 크기 설정 (예: iPhone 6/7/8)
// const guidelineBaseWidth = 360;
// const guidelineBaseHeight = 640;

// 기준을 사용하여 크기를 계산하는 함수
// export const sizePercentage = (size: number) =>
//   wp((size / guidelineBaseWidth) * 100 + '%');
