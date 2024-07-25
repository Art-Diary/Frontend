import React from 'react';
import {Share} from 'react-native';
import {createDynamicLink} from './Link';
import {ExhShareButtonIcon} from '~/components/common/icon';
import CustomTouchable from '~/components/common/CustomTouchable';

interface ExhShareProps {
  poster: string;
  exhId: number;
  exhName: string;
}

const ExhShare: React.FC<ExhShareProps> = ({poster, exhId, exhName}) => {
  const handleShare = async () => {
    try {
      const dynamicLink = await createDynamicLink(poster, exhId, exhName);
      await Share.share({
        message: `${dynamicLink}`,
      });
    } catch (error) {
      console.error('Error sharing link:', error);
    }
  };

  return (
    <CustomTouchable onPress={handleShare}>
      <ExhShareButtonIcon />
    </CustomTouchable>
  );
};

export default ExhShare;
