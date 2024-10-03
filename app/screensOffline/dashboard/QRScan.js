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
  useToast,
} from 'native-base';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  I18nManager,
  Dimensions,
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useDetailsAll } from '../../context/detailsProvider';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {CardGradientComponent,HeaderComponent,SuccessModalComponent}  from '../../components/component';
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase('maria_app.db', '1.0', '', 1);
import NetInfo from "@react-native-community/netinfo";
export default function Home(props) {

  const [userId, setUserId] = useState(null);
  const [ showQrCode, setShowQrCode ] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [startDownload, setStartDownload] = useState(false);
  const {linkBook,setSuccess,setError,
		error,
		success,getBooks,booksList} = useDetailsAll();
    const toast = useToast();
  useEffect(() => {
		loadResourcesAndDataAsync();
	}, []);
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
	async function loadResourcesAndDataAsync() {
		let token = await AsyncStorage.getItem('token');
		if (token) {
      let tokenParse=JSON.parse(token);
      setUserId(tokenParse.userid)
		}
	}
  const onSuccess = (data) => {
		setShowQrCode(false);
		linkBook(userId,data.data);
    getCurrentBooks();
	};

  const getCurrentBooks= async()=>{
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
 
  const linkedSuccess=()=>{
    setSuccess(null);
    props.navigation.navigate('MyBookscreen');
  
    //props.navigation.reset({ routes: [{ name: 'MyBookscreen' }] });
  }
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
        setStartDownload(false);
        props.navigation.navigate('MyBookscreen');
        // console.log('data',data);
         //setBooksLocal(data);
      })
    })
    
  }

  useEffect(() => {
    if(error){
      setError(false);
      setShowQrCode(true);
    }
		
	}, [error]);
  return (
<Box flex="1" >	
     <HeaderComponent wrapperColor="#151218" bgColor="#fece2e" headerTitle={'Scan QRCode'} nav={props.navigation}
				LeftContent={'goback'}/>
           
           {showQrCode ? (
					<QRCodeScanner
						onRead={onSuccess}
						topViewStyle={{ backgroundColor: '#000' }}
            bottomViewStyle={{ backgroundColor: '#000' }}
						showMarker={true}
						markerStyle={{
							borderColor: '#273897',
							borderRadius: 30,
							borderWidth: 3
						}}
					/>
				) : null}
         <SuccessModalComponent
			title={'Success'}
			subTitle={'Book Linked Successfully'}
			type={'Success'}
			isVisible={success?true:false}
			okText={'Go To My Books'}
			onPressOk={() => {
				linkedSuccess();
			}}
		/>
     </Box>
    
  );
}
