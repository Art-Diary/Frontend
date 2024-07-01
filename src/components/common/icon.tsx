import {
  BackButton,
  EmptyHeart,
  FullHeart,
  ProfileUpdate,
} from '~/assets/images';
import {responsiveScreenWidth as rw} from 'react-native-responsive-dimensions';
import ProfileTag from '~/assets/name_tag/profile_tag.svg';

export const FullHeartIcon = () => {
  const heartIconHeight = rw(4.9);
  return (
    <FullHeart width={109 * (heartIconHeight / 101)} height={heartIconHeight} />
  );
};

export const EmptyHeartIcon = () => {
  const heartIconHeight = rw(4.9);
  return (
    <EmptyHeart
      width={114 * (heartIconHeight / 100)}
      height={heartIconHeight}
    />
  );
};

export const BackButtonIcon = () => {
  const arrowIconHeight = rw(7);
  return (
    <BackButton
      width={100 * (arrowIconHeight / 101)}
      height={arrowIconHeight}
    />
  );
};

export const ProfileTagIcon = () => {
  const height = rw(16.5);
  return (
    <ProfileTag
      width={2800 * (height / 500)} // Adjust width according to height ratio
      height={height}
    />
  );
};

export const ProfileUpdateIcon = () => {
  const updateIconHeight = rw(6.5);
  return (
    <ProfileUpdate
      width={100 * (updateIconHeight / 101)}
      height={updateIconHeight}
    />
  );
};
