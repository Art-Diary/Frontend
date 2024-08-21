import {
  AddMyExhButton,
  AnotherSearch,
  AvgRateStar,
  BackButton,
  CalendarShare,
  CameraButton,
  CenterDiary,
  ClassifyButton,
  EmptyHeart,
  EmptyStar,
  ExhPlus,
  ExhShareButton,
  FullHeart,
  FullStar,
  GoogleLogo,
  GreyTag,
  Homepage,
  KakaoLogo,
  LeaveGathering,
  MoreContents,
  NaverLogo,
  OffCalendar,
  OffExhibition,
  OffMate,
  OffSetting,
  OnCalendar,
  OnExhibition,
  OnMate,
  OnSetting,
  OptionBar,
  PinkTag,
  PrivateToggle,
  ProfileUpdate,
  PublicToggle,
  ReduceContents,
  SearchButton,
  SearchDateCalendar,
  WriteDiaryButton,
  WriterPencil,
} from '~/assets/images';
import {responsiveScreenWidth as rw} from 'react-native-responsive-dimensions';
import {
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
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

export const FullStarIcon = ({customHeight = 3.5}) => {
  const height = rw(customHeight);
  return <FullStar width={106 * (height / 100)} height={height} />;
};

export const EmptyStarIcon = ({customHeight = 3.5}) => {
  const height = rw(customHeight);
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

export const AnotherSearchIcon = () => {
  const height = rw(4.8);
  return <AnotherSearch width={101 * (height / 100)} height={height} />;
};

export const SearchDateCalendarIcon = () => {
  const height = rw(6);
  return <SearchDateCalendar width={100 * (height / 100)} height={height} />;
};

export const LeaveGatheringIcon = () => {
  const height = rw(4.8);
  return <LeaveGathering width={101 * (height / 100)} height={height} />;
};

export const ClassifyButtonIcon = () => {
  const height = rw(6);
  return <ClassifyButton width={172 * (height / 79)} height={height} />;
};

export const MoreContentsIcon = () => {
  const height = rw(2.7);
  return <MoreContents width={259 * (height / 126)} height={height} />;
};

export const ReduceContentsIcon = () => {
  const height = rw(2.7);
  return <ReduceContents width={259 * (height / 126)} height={height} />;
};

export const CalendarShareIcon = () => {
  const height = rw(5.4);
  return <CalendarShare width={100 * (height / 100)} height={height} />;
};

export const ExhShareButtonIcon = () => {
  const height = rw(5.3);
  return <ExhShareButton width={101 * (height / 100)} height={height} />;
};

export const HomepageIcon = () => {
  const height = rw(6.3);
  return <Homepage width={100 * (height / 100)} height={height} />;
};

export const CameraButtonIcon = () => {
  const height = rw(5.5);
  return <CameraButton width={100 * (height / 100)} height={height} />;
};

export const ExhPlusIcon = () => {
  const height = rw(13);
  return <ExhPlus width={100 * (height / 100)} height={height} />;
};

/** bottom nav */
export const OffCalendarIcon = () => {
  const height = hp(5);
  return <OffCalendar width={100 * (height / 153)} height={height} />;
};

export const OnCalendarIcon = () => {
  const height = hp(5);
  return <OnCalendar width={101 * (height / 153)} height={height} />;
};

export const OffMateIcon = () => {
  const height = hp(5);
  return <OffMate width={167 * (height / 153)} height={height} />;
};

export const OnMateIcon = () => {
  const height = hp(5);
  return <OnMate width={167 * (height / 153)} height={height} />;
};

export const OffSettingIcon = () => {
  const height = hp(5);
  return <OffSetting width={100 * (height / 153)} height={height} />;
};

export const OnSettingIcon = () => {
  const height = hp(5);
  return <OnSetting width={103 * (height / 153)} height={height} />;
};

export const OffExhibitionIcon = () => {
  const height = hp(5);
  return <OffExhibition width={105 * (height / 153)} height={height} />;
};

export const OnExhibitionIcon = () => {
  const height = hp(5);
  return <OnExhibition width={110 * (height / 153)} height={height} />;
};

export const CenterDiaryIcon = () => {
  const height = hp(7.8);
  return <CenterDiary width={100 * (height / 133)} height={height} />;
};

// social login logo
export const GoogleLogoIcon = ({customHeight = 3.5}) => {
  const height = hp(customHeight);
  return <GoogleLogo width={100 * (height / 100)} height={height} />;
};

export const NaverLogoIcon = ({customHeight = 3.5}) => {
  const height = hp(customHeight);
  return <NaverLogo width={100 * (height / 100)} height={height} />;
};

export const KakaoLogoIcon = ({customHeight = 3.5}) => {
  const height = hp(customHeight);
  return <KakaoLogo width={100 * (height / 100)} height={height} />;
};
