// import {useNavigation} from '@react-navigation/native';
// import React, {ReactNode} from 'react';
// import {
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import SvgIcon from '~/components/SvgIcon';
// // import {createNativeStackNavigator} from '@react-navigation/native-stack';

// interface ContainerProps {
//   bottom: string;
//   children: ReactNode;
// }
// // onPress={() => navigation.navigate('exhitiion')}
// //onPress={() => navigation.navigate('artdiary')}
// const Container: React.FC<ContainerProps> = ({bottom, children}) => {
//   const navigation = useNavigation();
//   return (
//     <SafeAreaView style={commonStyles.view}>
//       <View style={commonStyles.contentView}>{children}</View>

//       <View style={commonStyles.footerView}>
//         <TouchableOpacity>
//           <SvgIcon
//             name={
//               bottom === 'Exhibition'
//                 ? 'OnExhibitionButton'
//                 : 'OffExhibitionButton'
//             }
//             onPress={() => navigation.navigate('exhibition')}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <SvgIcon
//             name={
//               bottom === 'Calender' ? 'OnCalenderButton' : 'OffCalenderButton'
//             }
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <SvgIcon name={'OffDiaryButton'} />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <SvgIcon
//             name={bottom === 'Friend' ? 'OnFriendButton' : 'OffFriendButton'}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <SvgIcon
//             name={bottom === 'Setting' ? 'OnSettingButton' : 'OffSettingButton'}
//           />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Container;

// const commonStyles = StyleSheet.create({
//   view: {
//     flex: 1,
//     flexDirection: 'column',
//   },
//   contentView: {
//     flex: 1,
//     height: '100%',
//     flexDirection: 'column',
//     backgroundColor: '#F6F6F6',
//   },
//   footerView: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     paddingTop: 8,
//     height: 57,
//     borderStyle: 'dashed',
//     borderColor: '#D3D3D3',
//     borderTopWidth: 1.5, // 테두리 너비
//     backgroundColor: '#F6F6F6',
//   },
// });
