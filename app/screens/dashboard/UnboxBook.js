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
import NurseryImg from '../../assets/images/Unbox/unbox_space_nursery.png';
import LKGImg from '../../assets/images/Unbox/unbox_space_junior_kg.png';
import UKGImg from '../../assets/images/Unbox/unbox_space_senior_kg.png';
export default function BookList(props) {

  const [id, setId] = useState(null);
  const [booksLocal, setBooksLocal] = useState(null);
  const [isDownload, setIsDownload] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [internetError, setInternetError] = useState(null);
  const [Allbooks, setAllbooks] = useState([]);
  const [books, setBooks] = useState([]);
  const {getBooks, booksList, loading,getSubjectContent,setContentType,getChapters, chapterList,setLocalSubjectContent,ResetData,subjectContent} = useDetailsAll();
  const Books=[{'title':'Nursery','image':NurseryImg,'id':'Nursery',name:"Unbox Nursery"},
               {'title':'Junior KG','image':LKGImg,'id':'LKG','name':"Unbox LKG"},
               {'title':'Senior KG','image':UKGImg,'id':'UKG','name':"Unbox UKG"}]
              
               
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
    //console.log(props.route.params.name);

  }, []);




 
 
;



 

  


const getUpdateChapters = async (subjectid) => {
 // setLoading(true);
  let resource = 'linkedchapters?';
  let filter='subjectid='+subjectid
  getMethodCall(resource, filter, ChaptersCallback, errorCallback);
}
const ChaptersCallback = async(data) => {
  if (data.errorCode==0){
    console.log('myChapters',data)
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
const OpenBooks = (item) => {
  console.log('item',item)
  props.navigation.navigate('UnboxSubjectList',{data:item.id});
}
  return (
    <Box flex="1" style={{backgroundColor: '#eaebed'}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={'Unbox Books'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {loading ? <Loader /> : false}
      {internetError && <InternetError data={internetError} />}
      <View style={{flex: 1, margin: 10}}>
        {Books && Books.length > 0 ? (
          <FlatList
            data={Books}
            renderItem={({item, index}) => (
              (props.route.params.name==item.name) &&
                <TouchableOpacity
                onPress={() => {
                  OpenBooks(item);
                }}
                style={{
                  //width: '48%',
                  marginTop: 15,
                  shadowColor: '#808080',
                  backgroundColor: '#ffffff',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  borderRadius: 10,
                  borderColor: '#c0c0c0',
                  borderWidth: 0.5,
                  elevation: 5,
                }}>
                    <View style={{paddingTop: 10,flex:1}}>
                    <Image
                        source={item.image}
                        alt={item.title}
                        size="2xl"
                        resizeMode="contain"
                        style={{width: '100%', height: 170,}}
                    />
                    </View>
                    <View style={{padding: 10,borderTopWidth:1,borderTopColor:'#ccc'}}>
                    <Text style={{fontSize: 17, fontWeight: 'bold',textAlign:'center', marginBottom: 5,color:item.title=='Nursery'?'green':'#e91e63'}}>
                      {item.title}</Text>
                   
                    </View>
                {/* <View style={{flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5, padding: 10}}>
                    <View style={{flex: 1}}>
                    <Image
                        source={item.image}
                        alt="Alternate Text"
                        size="2xl"
                        resizeMode="contain"
                        style={{width: '100%', height: 100}}
                    />
                    </View>
                    <View style={{flex: 2, marginLeft: 10}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>{item.title}</Text>
                    <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Unbox Books</Text>
                    <Text style={{fontSize: 12, fontWeight: 'bold', marginBottom: 5}}>Unbox Books</Text>
                    </View>
                </View>
             */}
            </TouchableOpacity> 
            
            )}

            />
        ) : ( <EmptyComponent message={'No Books Found'} />)}

     
     
      </View>
    </Box>
  );
}
