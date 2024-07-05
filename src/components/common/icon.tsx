import {
  AddMyExhButton,
  AvgRateStar,
  BackButton,
  EmptyHeart,
  EmptyStar,
  FullHeart,
  FullStar,
  GreyTag,
  LeaveGathering,
  OptionBar,
  PinkTag,
  PrivateToggle,
  ProfileUpdate,
  PublicToggle,
  SearchButton,
  WriteDiaryButton,
  WriterPencil,
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
  const height = rw(6.5);
  return <ProfileUpdate width={100 * (height / 101)} height={height} />;
};

export const PublicToggleIcon = () => {
  const height = rw(6);
  return <PublicToggle width={193 * (height / 100)} height={height} />;
};

export const PrivateToggleIcon = () => {
  const height = rw(6);
  return <PrivateToggle width={193 * (height / 100)} height={height} />;
};

export const AddMyExhButtonIcon = () => {
  const height = rw(6);
  return <AddMyExhButton width={100 * (height / 101)} height={height} />;
};

export const WriteDiaryButtonIcon = () => {
  const height = rw(5);
  return <WriteDiaryButton width={100 * (height / 100)} height={height} />;
};

export const WriterIcon = () => {
  const height = rw(3.9);
  return <WriterPencil width={100 * (height / 100)} height={height} />;
};

export const AvgRateStarIcon = () => {
  const height = rw(3);
  return <AvgRateStar width={106 * (height / 101)} height={height} />;
};

export const FullStarIcon = () => {
  const height = rw(3.5);
  return <FullStar width={106 * (height / 100)} height={height} />;
};

export const EmptyStarIcon = () => {
  const height = rw(3.5);
  return <EmptyStar width={106 * (height / 101)} height={height} />;
};

export const OptionBarIcon = () => {
  const height = rw(6);
  return <OptionBar width={100 * (height / 100)} height={height} />;
};

export const GreyNameTagIcon = () => {
  const height = rw(12.9);
  return <GreyTag width={2800 * (height / 400)} height={height} />;
};

export const PinkNameTagIcon = () => {
  const height = rw(12.9);
  return <PinkTag width={2800 * (height / 400)} height={height} />;
};

export const SearchButtonIcon = () => {
  const height = rw(4);
  return <SearchButton width={100 * (height / 100)} height={height} />;
};

export const LeaveGatheringIcon = () => {
  const height = rw(4.8);
  return <LeaveGathering width={101 * (height / 100)} height={height} />;
};
