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
  Actionsheet,
  Spinner,
  
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
import { WebView } from 'react-native-webview';
import MyIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  HeaderComponent,
  Loader,
  EmptyComponent,
  InternetError
} from '../../components/component';
import Logo from '../../assets/sub1.jpg';
import {useDetailsAll} from '../../context/detailsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {imageBaseUrl} from '../../../config.json';
import NetInfo from "@react-native-community/netinfo";
import {getImageDynamically} from "./utils"
import SQLite from 'react-native-sqlite-2';
import { getMethodCall, PostDataCall, Uploadfiles } from '../../api/apiService';
const db = SQLite.openDatabase('maria_app.db', '1.0', '', 1);
import noimage from '../../assets/noimage.png';
export default function BookList(props) {

  const [id, setId] = useState(null);
  const [booksLocal, setBooksLocal] = useState(null);
  const [isDownload, setIsDownload] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [internetError, setInternetError] = useState(null);
  const [Allbooks, setAllbooks] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const {getBooks, booksList, loading,getSubjectContent,setContentType,getChapters, chapterList,setLocalSubjectContent,ResetData,subjectContent} = useDetailsAll();
 
   



  // const linkBook = async (userId,QRValues) => {
	// 	//setLoading(true);
	// 	let resource = 'assignedlinknew?';
	// 	let filter='userid='+userId+'&link='+QRValues
	// 	getMethodCall(resource, filter,linkCallback, errorCallback);
	// }

	// const linkCallback = async(data) => {
	// 	if (data.errorCode==0){
	// 		console.log('token',data)
	// 		//setSuccess(true);
	// 	} else {
	// 		//alert(data.Message);
	// 		setError(true);
	// 	}
	// //	setLoading(false);
	// };
  // const errorCallback = async(error) => {
  // }
  
  useEffect(() => {
    getVideos(props.route.params.id,props.route.params.type);

  }, []);



const getVideos = async (classid,type) => {
 // setLoading(true);
  let resource = 'storieslist?';
  let filter='classid='+classid+'&type='+type
  getMethodCall(resource, filter, ChaptersCallback, errorCallback);
}
const ChaptersCallback = async(data) => {
  if (data.errorCode==0){
    console.log('myChapters',data);
    setVideoList(data.result);
  }
}
const errorCallback = async(error) => {

}


// const DeleteTask = (data) => {
//   db.transaction(function (txn) {
//     txn.executeSql('DELETE FROM `Tasks` WHERE chapterid = '+data, [], function (tx, res) {
//      console.log('Tasks Deleted:', tx)
//      // console.log('Chapters:', res)
//       //checkContentTable(id);
//     })  
//   })
// }
const OpenVideo = (item) => {
    setSelectedVideo(item);
 
}
  return (
    <Box flex="1" style={{backgroundColor: '#eaebed'}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={props.route.params.type==1?'Stories':'Rhymes'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {loading ? <Loader /> : false}
      {selectedVideo ? (
          <View style={{ height: 270, width: "100%" }}>
            <WebView
              style={{ height: 270, width: "100%", borderRadius: 10 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsFullscreenVideo={true}
              source={{
                uri:
                   selectedVideo.link+"?rel=1&autoplay=1&showinfo=1",
              }}   
            />
          </View>
        ) : (
          false
        )}
      {internetError && <InternetError data={internetError} />}
      <View style={{flex: 1, margin: 10}}>
        <FlatList
          data={videoList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => OpenVideo(item)}
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                margin: 5,
               // padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
            <View style={{ flexDirection: "row", padding: 10 }}>
                {item && item.image ?
            <Image
              source={{
                uri:
                  'https://digimaria.com/digimaria'+item.image
              }}
              style={{ flex: 1, width: "100%", height: 80, borderRadius: 5 }}
              resizeMode="cover"
              alt={'https://digimaria.com/digimaria'+item.image}
            />:
            <Image
              source={noimage}
              style={{ flex: 1, width: "100%", height: 80, borderRadius: 5 }}
              resizeMode="cover"
              alt={'https://digimaria.com/digimaria'+item.image}
            />
            }
            <Box px="2" mt={1} style={{ flex: 3 }}>
              <Text
                numberOfLines={1}
                style={{
                  //fontFamily: "Montserrat-Bold",
                  fontSize: 16,
                  color: "#000",
                }}
              >
                 {item && item.title}
              </Text>
              {item && item.class_name && (
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <View style={{ }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        //fontFamily: "Montserrat-Regular",
                        fontSize: 13,
                        color: "#000",
                      }}
                    >
                      {item.class_name}
                    </Text>
                  </View>
                </View>
              )}
            
              
             
            </Box>
          </View>
            </TouchableOpacity>
            // <TouchableOpacity
            //   onPress={() => OpenVideo(item)}
            //   style={{
            //     backgroundColor: '#fff',
            //     borderRadius: 10,
            //     margin: 5,
            //     padding: 10,
            //     flexDirection: 'row',
            //     alignItems: 'center',
            //   }}>
            //   {/* <Image
            //     source={{uri: getImageDynamically(item.image)}}
            //     alt="Alternate Text"
            //     size="xl"
            //     resizeMode="cover"
            //     style={{width: 100, height: 100, borderRadius: 10}}
            //   /> */}
            //   <View style={{marginLeft: 10, flex: 1}}>
            //     <Text style={{fontSize: 18, fontWeight: 'bold',color:'#000'}}>
            //       {item.class_name}
            //     </Text>
            //     <Text style={{fontSize: 16,color:'#000'}}>{item.title}</Text>
            //   </View>
            // </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <EmptyComponent message={'No Data Found'} />
          )}
        />
       
     
      </View>
    </Box>
  );
}
