/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {LogBox} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import BottomRoutes from './routes/BottomRoutes';
import MyExhAddScreen from './screens/mydiary/MyExhAddScreen';
import MyDiaryRoutes from './routes/MyDiary/MyDiaryRoutes';

type RootStackParamList = {
  Main: undefined;
  MyAddExhibition: undefined;
  MyDiaries: undefined;
  MyDiaryBack: undefined;
  MyDiaryList: undefined;
  // MyDiaries : {
  //     id: number;
  // };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RecoilRoot>
          <Stack.Navigator
            initialRouteName={'Main'}
            screenOptions={{headerShown: false}}>
            {/* 홈 화면 = 내 기록 */}
            <Stack.Screen name="Main" component={BottomRoutes} />
            {/* <Stack.Screen name="mydiary" component={MyDiaryRoutes} /> */}
            {/* [내 기록] 전시회 추가 화면 */}
            <Stack.Screen name="MyAddExhibition" component={MyExhAddScreen} />
            {/* [내 기록] 한 전시회의 기록 목록 화면 */}
            <Stack.Screen name="MyDiaries" component={MyDiaryRoutes} />
            {/* [전시회] 전시회 상세 정보 */}
            {/* <Stack.Screen name="exhibition" component={ExhibitionRoutes} /> */}
            {/* 로그인 회원가입 */}
            {/* 캘린더 화면 */}
            {/* 전시 메이트 화면 */}
            {/* 설정 화면 */}
          </Stack.Navigator>
        </RecoilRoot>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
