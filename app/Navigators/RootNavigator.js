import React, { useState,useEffect,useRef} from "react";
import {
  VStack,
  Box,
  Divider,
  NativeBaseProvider,
  Image,
  StatusBar,
  HStack,
  ScrollView,
  IconButton,
  Icon,
  Input,
	FormControl,
	WarningOutlineIcon,Center,Button,Actionsheet,Spinner, AlertDialog,
} from "native-base";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,I18nManager,Platform
} from "react-native";
import "react-native-gesture-handler";
import Logo from "../assets/maria_splash.png";
import Intro_logo_gif from "../assets/Intro_logo_gif.gif";

import Login from "../screens/auth/login";
import HomeScreen from "../screens/dashboard/Home";
import QRScan from "../screens/dashboard/QRScan";
import MyBooksDashoboard from "../screens/dashboard/MyBooks";
import MariaLibraryScreen from "../screens/dashboard/Library";
import Profile from "../screens/dashboard/Profile";
import Contactus from "../screens/dashboard/Contactus";
import Chapters from "../screens/dashboard/Chapters";
import Content from "../screens/dashboard/Content";
import SubjectContent from "../screens/dashboard/SubjectContent";
import ContentChapters from "../screens/dashboard/ContentChapters";
import VideoAsset from "../screens/dashboard/Assets/VideoAsset";
import EBookAssets from "../screens/dashboard/Assets/EBookAssets";
import SelectActivity from "../screens/dashboard/Assets/SelectActivity";
import TrueorFalse from "../screens/dashboard/Assets/TrueorFalse";
import DragAndDrop from "../screens/dashboard/Assets/DragAndDrop";
import MultipleDragAndDrop from "../screens/dashboard/Assets/MultipleDragAndDrop";
import MatchTheFollowing from "../screens/dashboard/Assets/MatchTheFollowing";
import MatchTheColor from "../screens/dashboard/Assets/MatchTheColor";
import ClickToCircle from "../screens/dashboard/Assets/ClickToCircle";
import ClickToCircleImage from "../screens/dashboard/Assets/Circletheimage";
import TickTheCorrect from "../screens/dashboard/Assets/TickTheCorrect";
import DragCorrect from "../screens/dashboard/Assets/UnBox/DragCorrect";
import ChooseTheCorrect from "../screens/dashboard/Assets/ChooseTheCorrect";

import BookList from "../screens/dashboard/BookList";
import UnboxBook from "../screens/dashboard/UnboxBook";
import UnboxSubjectList from "../screens/dashboard/UnboxSubjectList";
import RymsStories from "../screens/dashboard/RymsStories";
import ClassBooks from "../screens/dashboard/ClassBooks";
import LkgContent from "../screens/dashboard/LkgContent";
import SlideShow from "../screens/dashboard/Assets/Slideshow";
import Alphabets from "../screens/dashboard/Assets/SlideShow/Alphabets";
import NumeracySlide from "../screens/dashboard/Assets/SlideShow/Numeracy";
import Vowels from "../screens/dashboard/Assets/SlideShow/Vowels";
import Shapes from "../screens/dashboard/Assets/SlideShow/Shapes";
import BodyParts from "../screens/dashboard/Assets/SlideShow/BodyParts";
import Phonics from "../screens/dashboard/Assets/SlideShow/Phonics";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProvideDetail, useDetail, authProvider } from '../context/authProvider';
import { AllDetail} from '../context/detailsProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LinearGradient from 'react-native-linear-gradient';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TRANSITIONS = [ 'fade', 'slide', 'none' ];
const STYLES = [ 'default', 'dark-content', 'light-content' ];
function DashboardNavigator(){
  const [ baseRoot, setBaseRoot ] = useState('Splash');
	const [ loading, setLoading ] = useState(true);
  return (
    <Stack.Navigator initialRouteName={HomeScreen}>
     
    <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="QRScan"
        component={QRScan}
        options={{
          headerShown: false,
        }}
      />
      
       <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
     
      
        <Stack.Screen
        name="MariaLibraryScreen"
        component={MariaLibraryScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="MyBookscreen"
        component={MyBooksDashoboard}
        options={{
          headerShown: false,
        }}
      />
         <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Content"
        component={Content}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubjectContent"
        component={SubjectContent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContentChapters"
        component={ContentChapters}
        options={{
          headerShown: false,
        }}
      />
      
       <Stack.Screen
        name="EBookAssets"
        component={EBookAssets}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="VideoAsset"
        component={VideoAsset}
        options={{
          headerShown: false,
        }}
      />
      
       <Stack.Screen
        name="SelectActivity"
        component={SelectActivity}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TrueorFalse"
        component={TrueorFalse}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DragAndDrop"
        component={DragAndDrop}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="MultipleDragAndDrop"
        component={MultipleDragAndDrop}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="MatchTheFollowing"
        component={MatchTheFollowing}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="MatchTheColor"
        component={MatchTheColor}
        options={{
          headerShown: false,
        }}
      />
      
       <Stack.Screen
        name="ClickToCircle"
        component={ClickToCircle}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="ClickToCircleImage"
        component={ClickToCircleImage}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="TickTheCorrect"
        component={TickTheCorrect}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="BookList"
        component={BookList}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="UnboxBook"
        component={UnboxBook}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="UnboxSubjectList"
        component={UnboxSubjectList}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="RymsStories"
        component={RymsStories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ClassBooks"
        component={ClassBooks}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="LkgContent"
        component={LkgContent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SlideShow"
        component={SlideShow}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Vowels"
        component={Vowels}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Alphabets"
        component={Alphabets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NumeracySlide"
        component={NumeracySlide}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Shapes"
        component={Shapes}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="BodyParts"
        component={BodyParts}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="Phonics"
        component={Phonics}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="ChooseTheCorrect"
        component={ChooseTheCorrect}
        options={{
          headerShown: false,
        }}
      />
      
      
    </Stack.Navigator>
  )
 
     
}
function BooksNavigator(){
  const [ baseRoot, setBaseRoot ] = useState('Splash');
	const [ loading, setLoading ] = useState(true);
 
 
  return (
    <Stack.Navigator initialRouteName={MyBooksDashoboard}>
       <Stack.Screen
        name="MyBooksDashoboard"
        component={MyBooksDashoboard}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Content"
        component={Content}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubjectContent"
        component={SubjectContent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContentChapters"
        component={ContentChapters}
        options={{
          headerShown: false,
        }}
      />
      
       <Stack.Screen
        name="EBookAssets"
        component={EBookAssets}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="VideoAsset"
        component={VideoAsset}
        options={{
          headerShown: false,
        }}
      />
      
       <Stack.Screen
        name="SelectActivity"
        component={SelectActivity}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TrueorFalse"
        component={TrueorFalse}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DragAndDrop"
        component={DragAndDrop}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="MultipleDragAndDrop"
        component={MultipleDragAndDrop}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="MatchTheFollowing"
        component={MatchTheFollowing}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="ClickToCircle"
        component={ClickToCircle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TickTheCorrect"
        component={TickTheCorrect}
        options={{
          headerShown: false,
        }}
      />
     
      
      
    </Stack.Navigator>
  )
 
     
}

function Home(props) {
	const [ showActionSheet, setShowActionSheet ] = useState(false);
	const onPressEmployeeList = () => {
		setShowActionSheet(true);
	};

	const ComingSoon = () => {
    Alert.alert('Coming Soon!');
	};

	return (
		<Tab.Navigator
			initialRouteName="DashboardNavigator"
			screenOptions={{
				tabBarActiveTintColor: '#e91e63',
				tabBarInactiveTintColor: '#000000',
				tabBarStyle: {
					backgroundColor: '#fff',
					paddingVertical: 6
				}
			}}
		>
			<Tab.Screen
				name="DashboardNavigator"
				component={DashboardNavigator}
				options={{
					headerShown: false,
					gestureEnabled: false,
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={30} />
				}}
			/>
			
			<Tab.Screen
				name="MyBooks"
				component={MariaLibraryScreen}
				options={{
					headerShown: false,
          lazy:false,
					tabBarLabel: 'Books',
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcons name="book" color={color} size={30} />
					)
				}}
			/>
      	<Tab.Screen
				name="profile"
				component={Profile}
				options={{
					headerShown: false,
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcons name="user" color={color} size={30} />
					)
				}}
			/>
			<Tab.Screen
				name="settings"
				component={Contactus}
				options={{
					headerShown: false,
					tabBarLabel: 'Support',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account-tie-voice-outline" color={color} size={30} />
					)
				}}
			/>
		</Tab.Navigator>
	);
}

  function MyStack(){
  const [ baseRoot, setBaseRoot ] = useState('Splash');
	const [ loading, setLoading ] = useState(true);
  
 
  return (
    <Stack.Navigator initialRouteName={'Splash'}>
       <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      /> 
    <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      {/*  <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  )
 
     
}

 export default function App() {
  const [ statusBarTransition, setStatusBarTransition ] = useState(TRANSITIONS[1]);
  const [ hidden, setHidden ] = useState(false);
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <ProvideDetail>
         <AllDetail>
            <SafeAreaView style={styles.container}>
                 <StatusBar
									animated={true}
									backgroundColor="#fece2e"
									barStyle={Platform.OS === 'ios' ? STYLES[2] : STYLES[2]}
									showHideTransition={statusBarTransition}
									hidden={hidden}
								/>
                 <MyStack />
              </SafeAreaView>
          </AllDetail>
      </ProvideDetail>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}


const  Splash=(props)=>{
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
		loadResourcesAndDataAsync();
	}, []);

	 const loadResourcesAndDataAsync= async()=>{
		let token = await AsyncStorage.getItem('token');
    
       // Alert.alert(JSON.parse(token))
	  if (token) {
     // let tokenParse=JSON.parse(token);
            setTimeout(()=>{
                props.navigation.reset({ routes: [ { name: 'Home' } ] });
            },4000)
			
		}else{
            setTimeout(()=>{
                props.navigation.reset({ routes: [ { name: 'Login' } ] });
            },4000)               
			setLoading(false);
		}
		
	}
 

  return (
              <Image
                  resizeMode="cover"
                  source={Intro_logo_gif}
                  style={{ width: '100%',flex:1}}
                  alt="Intro_logo_gif"
                />
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fece2e'
	}
});
