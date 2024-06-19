import React from 'react';
import {Share, TouchableOpacity} from 'react-native';
import {createDynamicLink} from './Link';
import {Share as ShareIcon} from '~/assets/images/index';

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
    <TouchableOpacity onPress={handleShare}>
      <ShareIcon />
    </TouchableOpacity>
  );
};

export default ExhShare;
