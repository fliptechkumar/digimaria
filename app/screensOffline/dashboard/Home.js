import React, {useState, useEffect} from 'react';
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
  WarningOutlineIcon,
  Center,
  Button,
  View,
} from 'native-base';
import {
  Linking,
  Dimensions,

} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import Logo from '../../assets/logo.png'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
var RNFS = require('react-native-fs');
import { WebView } from 'react-native-webview';

import {useDetailsAll} from '../../context/detailsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {imageBaseUrl} from '../../../config.json';
import NetInfo from "@react-native-community/netinfo";
//import {openDatabase,enablePromise,DEBUG} from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-2'
import RNFetchBlob from "rn-fetch-blob";
import Video from 'react-native-video';
//DEBUG(true);
//enablePromise(false);
//import{openDatabase} from 'react-native-sqlite-storage'
//import { TouchableOpacity } from 'react-native-web';
import  {HeaderWithLogoComponent,CardGradientComponent,SuccessModalComponent,HeaderComponent}  from '../../components/component';
const db = SQLite.openDatabase('maria_app.db', '1.0', '', 1)
// const db = openDatabase({
//   name:'maria.db'})
export default function Home(props) {

  const [show, setShow] = useState(false);
  const {getBooks, booksList} = useDetailsAll();
  const [booksLocal, setBooksLocal] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [startDownload, setStartDownload] = useState(false);
  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if(!state.isConnected){
        setIsConnected(false);
      }
      else{
        setIsConnected(true);
      }
    });

    return () => {
      unsubscribe();
    };

  }, [NetInfo]);
  useEffect(() => {
    checkTableDataLocal();
     //console.log(booksList)
     // for (const [key, value] of Object.entries(booksList)) {
     //   console.log(key, value.indivdual);
     // }
     if(booksList!=null){
       //setBooksLocal(booksList);
       //createTable();
     }
   }, []);

   const createTable=()=>{
    //alert('hh')

    db.transaction(function(txn) {
      txn.executeSql('DROP TABLE IF EXISTS MyBooks', [])
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS MyBooks(id INTEGER PRIMARY KEY NOT NULL, Result TEXT)',
        []
      )
      txn.executeSql('INSERT INTO MyBooks (Result) VALUES (:Result)', [JSON.stringify(booksList)]);
      // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['Kumaravel'])
      // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['Thangaraj'])
      txn.executeSql('SELECT * FROM `MyBooks`', [], function(tx, res) {
        let data=JSON.parse(res.rows.item(0).Result);
        props.navigation.navigate('MyBookscreen');
        // console.log('data',data);
         //setBooksLocal(data);
      })
    })
    
  }

   const checkTableDataLocal=()=>{
    // db.transaction(function(txn) {
    // txn.executeSql(
    //   'CREATE TABLE IF NOT EXISTS MyBooks(id INTEGER PRIMARY KEY NOT NULL, Result TEXT)',
    //   []
    // )
    // })
  
      db.transaction(txn=>{
       // console.log('txn',txn);
        txn.executeSql('SELECT * FROM MyBooks',[],(sqlTxn,res)=>{
         // console.log('resultDb',res.rows);
          let data=JSON.parse(res.rows.item(0).Result);
         // console.log('data',data);
          setBooksLocal(data);
        }) 
  
      })
    }

  // const createTable=()=>{
  //   //alert('hh') 

  //   db.transaction(function(txn) {
  //     txn.executeSql('DROP TABLE IF EXISTS Users', [])
  //     txn.executeSql(
  //       'CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))',
  //       []
  //     )
  //     txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['Kumaravel'])
  //     txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['Thangaraj'])
  //     txn.executeSql('SELECT * FROM `users`', [], function(tx, res) {
  //       for (let i = 0; i < res.rows.length; ++i) {
  //         console.log('item:', res.rows.item(i))
  //       }
  //     })
  //   })
  //   // db.transaction(txn=>{
  //   //   txn.executeSql(`CREATE TABLE Result (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20))`),
  //   //   [],
  //   //   (sqlTxn)=>{
  //   //     console.log('table created successfully',sqlTxn);

  //   //   },
  //   //   error=>{
  //   //     console.log('error on creating table '+error);
  //   //   }

  //   // })
  // }
  
  
  useEffect(() => {
    handleGetFileList();
    //   let pathUrl = 'https://digimaria.com/chapter_videos/class1/aspen/aspen_chp8.mp4';
    //   const destinationPath = RNFetchBlob.fs.dirs.DownloadDir + '/' + 'MyApp/videos'
    //   const fileName = Date.now()
    //   const fileExtention = pathUrl.split('.').pop();
    //   const fileFullName = fileName + '.' + fileExtention
    //  // const fileFullName = fileName
    //   console.log('fileName', fileName)
    //   console.log('fileExtention', fileName)
    //   console.log('fileName', fileFullName)
    // RNFetchBlob.config({
    //   // add this option that makes response data to be stored as a file,
    //   // this is much more performant.
    //   fileCache: true,
    //   path: destinationPath + '/' + fileFullName,
    // })
    //   .fetch("GET", pathUrl, {
    //     //some headers ..
    //   })
    //   .then((res) => {
    //     // the temp file path
    //     console.log("The file saved to ", res.path());
    //   });

     }, []);
 async function loadResourcesAndDataAsync() {
      let token = await AsyncStorage.getItem('token');
      if (token) {

        if(isConnected){
            let tokenParse = JSON.parse(token);
            getBooks(tokenParse.userid);
            setStartDownload(true);
        }else{
          alert('Please check your internet connection');
        }
      }
    }
    useEffect(() => {

      if (startDownload) {
        if (booksList != null) {
          createTable();
          //createTable();
        }
      }
    }, [booksList,startDownload]);

  const onSuccess=()=>{
    setShow(false);
    props.navigation.navigate('MariaLibraryScreen');
  }
  const onpressQR=()=>{
    props.navigation.navigate('QRScan');
  }
  const onpressMyBook=()=>{
    if(booksLocal!=null){
       props.navigation.navigate('MyBookscreen');
    }
    else{
      loadResourcesAndDataAsync();
    }
  }
  const onpressProfile=()=>{
    props.navigation.navigate('Profile');
  }

  const onpressYoutube = ()=>{
    Linking.openURL('https://www.youtube.com/@MariaPublishers/videos');
  }
  
  async function handleGetFileList() {

    const path = RNFetchBlob.fs.dirs.DownloadDir + '/' + 'MyApp/videos'

    await RNFetchBlob.fs.isDir(path).then(isDir => {
      console.log('isDir', isDir)
      if (isDir == true) {
        RNFetchBlob.fs.lstat(path).then(filesList => {
          console.log('filesList', filesList)
         // setFiles(filesList)
        })
          .catch(e => {
            console.log('Unable to get files list', e)
          })
      }
    })
      .catch(e => {
        console.log('Error isDir', e)
      })
  }

  return (
    <Box flex="1" style={{backgroundColor:'#eaebed'}}>
     <HeaderWithLogoComponent logo={Logo} wrapperColor="#151218" bgColor="#fece2e" headerTitle={'Home'}
     rightContent ={false}
    //  rightContent={
    //  <View style={{}}>
    //       <IconButton
    //        onPress={() => Alert.alert(
    //          'Alert',
    //         'Are you sure want to logout?',
    //          [
    //            {
    //              text: 'Cancel',
    //              onPress: () => console.log("Cancel Pressed"),
    //              style: "cancel"
    //            },
    //            { text: 'OK', onPress: () => alertLogout() }
    //          ]
    //        )}
    //        icon={
    //          <Icon
    //            size={30}
    //            as={MaterialIcon}
    //            name="logout"
    //            color="#808080"
    //          />
    //        }
    //      />
    //      </View>
    //      }
     >
            {/* <View style={{marginTop:50}}>
                <Text style={{color:'#000',textAlign:'center',fontSize:16,fontWeight:'bold'}}>Good Morning!</Text>
            </View> */}
        {/* <Image alt="ayyappa" style={{width:width,height:height/3,resizeMode:'contain'}}
        source={{
          uri:"file:///data/user/0/com.digimaria/files/RNFetchBlobTmp_k5wpokb1yh7bptv373ynj"
            ,
        }}
      /> */}

<View style={{flex:0}}>
  {/* <Video
    source={{
      uri: "file:///storage/emulated/0/Download/MyApp/videos/1685014399243.mp4"
    }}
    style={{position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',}}
    controls={true}
    /> */}
                 {/* <WebView
                    source={{
                    uri:`file://${RNFetchBlob.fs.dirs.DownloadDir}/MyApp/1685011900393.html`
                    //uri:'https://digimaria.info/uploads/hazel_class2_term2/flipbook/mobile/index.html'
                    }}
                    originWhitelist={['*']}
                    javaScriptEnabledAndroid={true}
                    style={{ margin:10,width:'95%'}}
                /> */}
            </View>
            <HStack space={4} justifyContent={'space-between'} mt={5} m={2} >
						<CardGradientComponent
								textValue={'My Books'}
								buttonBackground={'#a97dd3'}
								onPress={onpressMyBook}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'book',iconFamily:'FontAwesome',iconColor:'#fff'}}
              />
						<CardGradientComponent
								textValue={'Maria Library'}
								buttonBackground={'#6c8aec'}
								onPress={onSuccess}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'bookshelf',iconFamily:'MaterialCommunity',iconColor:'#fff'}}
								//extraComponent={onSuccess()}	
              />
						
					</HStack>

          <HStack space={4} justifyContent={'space-between'} mt={2} m={2} >
						<CardGradientComponent
								textValue={'Scan QR Code'}
								buttonBackground={'#02b1c1'}
								onPress={onpressQR}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'qrcode',iconFamily:'FontAwesome',iconColor:'#fff'}}
              />
						<CardGradientComponent
								textValue={'Profile'}
								buttonBackground={'#86b949'}
								onPress={onpressProfile}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'user',iconFamily:'FontAwesome',iconColor:'#fff'}}
								//extraComponent={onSuccess()}	
              />
						
					</HStack>

          <HStack space={4} justifyContent={'space-between'} mt={2} m={2} >
						<CardGradientComponent
								textValue={'Downloads'}
								buttonBackground={'#f68e47'}
								onPress={onpressQR}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'download',iconFamily:'FontAwesome',iconColor:'#fff'}}
              />
						<CardGradientComponent
								textValue={'Youtube'}
								buttonBackground={'#f15e5e'}
								onPress={onpressYoutube}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'youtube-play',iconFamily:'FontAwesome',iconColor:'#fff'}}
								//extraComponent={onSuccess()}	
              />
						
					</HStack>
         
     </HeaderWithLogoComponent>
     </Box>
    
  );
}
