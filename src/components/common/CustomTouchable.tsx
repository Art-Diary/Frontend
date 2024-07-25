import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

interface CustomButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle> | undefined;
  activeOpacity?: number;
  disabled?: boolean;
  children?: ReactNode;
}

const CustomTouchable: React.FC<CustomButtonProps> = ({
  onPress,
  style,
  activeOpacity = 0.6,
  disabled = false,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      activeOpacity={activeOpacity}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

export default CustomTouchable;
