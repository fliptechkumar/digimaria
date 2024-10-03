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
export default function Home(props) {
  const [showContent, setShowContent] = useState(false);
  const [showType, setShowType] = useState(null);
  const [showTermOrSem, setShowTermOrSem] = useState(false);
  const [id, setId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [show, setShow] = useState(true);
  const [booksLocal, setBooksLocal] = useState(null);
  const [isDownload, setIsDownload] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [internetError, setInternetError] = useState(null);
  const [Allbooks, setAllbooks] = useState([]);
  const [books, setBooks] = useState([]);
  const {getBooks, booksList, loading,getSubjectContent,setContentType,getChapters, chapterList,setLocalSubjectContent,ResetData,subjectContent} = useDetailsAll();
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
    loadResourcesAndDataAsync();
    // db.transaction(function (txn) {
    //   txn.executeSql('DROP TABLE IF EXISTS Chapters', [])
    // })
    // db.transaction(function (txn) {
    //   txn.executeSql('DROP TABLE IF EXISTS Content', [])
    // })
  }, []);
  async function loadResourcesAndDataAsync() {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      let tokenParse = JSON.parse(token);
      getBooks(tokenParse.userid);
    }
  }
  useEffect(() => {
   //checkTableDataLocal();

    //console.log(booksList)
    // for (const [key, value] of Object.entries(booksList)) {
    //   console.log(key, value.indivdual);
    // }
    if(booksList!=null){
      setBooksLocal(booksList);
      //createTable();
    }
  }, [booksList]);

  useEffect(() => {
    if(booksLocal!=null){
      mergeSubobject();
    }
  }, [booksLocal]);

  const mergeSubobject = () => {
    let tempArray=[];
   Object.entries(booksLocal).map(procedure => {
      const [key, value] = procedure;
     // console.log('key',value)
      value.indivdual && value.indivdual.length > 0 ? value.indivdual.map((item, index) => {
        tempArray.push(item);
      }) : null;
      value.term && value.term.length > 0 ? value.term.map((item, index) => {
        tempArray.push(item);
      }) : null;
      value.semester && value.semester.length > 0 ? value.semester.map((item, index) => {
        tempArray.push(item);
      }) : null;
     
    });
    setAllbooks(tempArray);
   // console.log('allBooks',allBooks)
   //initaily 10 books only
    let tempArray1=tempArray.slice(0,10);
    setBooks(tempArray1);
  }
  const loadMore = () => {
    let tempArray1=Allbooks.slice(0,books.length+10);
    setBooks(tempArray1);
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
        console.log('LocalBook',JSON.stringify(data));
        setBooksLocal(data);
        //if subject array is empty then call api
        if(data==null){
          //getCurrentBooks();
        }
      }) 

    })
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
        for (let i = 0; i < res.rows.length; ++i) {
         // console.log('item:', res.rows.item(i))
        }
      })
    })
    // db.transaction(txn=>{
    //   txn.executeSql(`CREATE TABLE Result (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20))`),
    //   [],
    //   (sqlTxn)=>{
    //     console.log('table created successfully',sqlTxn);

    //   },
    //   error=>{
    //     console.log('error on creating table '+error);
    //   }

    // })
  }

  const createChapterTable = (data) => {
		//alert('hh')

		db.transaction(function (txn) {
		// txn.executeSql('DROP TABLE IF EXISTS Chapters', [])
			txn.executeSql(
			  'CREATE TABLE IF NOT EXISTS Chapters (id INTEGER PRIMARY KEY NOT NULL,classid INTEGER NOT NULL,chapterid INTEGER,video TEXT,chapter VARCHAR(70),subjectid INTEGER NOT NULL,term VARCHAR(30),semester VARCHAR(30),active INTEGER,localvideo TEXT)',
			  []
			)
      //demo entry
     // txn.executeSql('INSERT INTO Chapters (id,classid,chapterid,video,name,subjectid,term,semester,isactive) VALUES (:id,:classid,:chapterid,:video,:name,:subjectid,:term,:semester,:isactive)', [1,1,1,'https://www.youtube.com/watch?v=1j4gR9pd2VU','Chapter 1','1','1','1','1'])
      chapterList.map((item,index)=>{
        console.log('item',item)
        txn.executeSql('INSERT INTO Chapters (id,classid,chapterid,video,chapter,subjectid,term,semester,active,localvideo) VALUES (:id,:classid,:chapterid,:video,:chapter,:subjectid,:term,:semester,:active,:localvideo)', [item.id,item.classid,item.id,item.video,item.chapter,item.subjectid,item.term,item.semester,item.active,null])
      })
      setTimeout(() => {
        setShowDownload(false);
        checkChapterTable(id);
      }, 3000);

			//txn.executeSql('INSERT INTO Chapters (name,classid,subject,chapterid) VALUES (:name,:classid,:subject,:chapterid)', [data.chapter,1,data.subject,data.id])
			//txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['Thangaraj'])
			
		})
	}
  const checkChapterTable = (data) => {
   // alert(data.id)
    let chapterData = [];
    setIsDownload(false);
    db.transaction(function (txn) {
          txn.executeSql('SELECT * FROM `Chapters` WHERE subjectid = '+data.id, [], function (tx, res) {
            console.log('Chapters:', tx)
            for (let i = 0; i < res.rows.length; ++i) {
              console.log('Chapters:', res.rows.item(i))
              chapterData.push(i);
              setIsDownload(true);
              setShowDownload(false);
            }
          })
     })
  }
  const checkContentTable = (data) => {
   //alert(data.id)
    ResetData();
    let chapterData = [];
    setIsDownload(false);
    db.transaction(function (txn) {
          txn.executeSql('SELECT * FROM `Content` WHERE subjectid = '+data.id, [], function (tx, res) {
            console.log('ContentList:', res)
            // for (let i = 0; i < res.rows.length; ++i) {
            //   console.log('Content:', res.rows.item(i))
            //   chapterData.push(i);
            //   setIsDownload(true);
            //   setShowDownload(false);
            // }
            if(res.rows.length>0){
              setIsDownload(true);
              setShowDownload(false);
              setLocalSubjectContent(JSON.parse(res.rows.item(0).data));
            }else{
             // alert('ayyappa')
              setIsDownload(false);
              setShowDownload(false);
            }
          })
     })
  }
    //alert(data.id)


  useEffect(() => {
    //console.log('chapterList',chapterList)
    if(isDownload){
      //alert('Downloaded Successfully');
    }
  }, [isDownload]);

  const OpenModel = (type, item) => {
    //alert(JSON.stringify(item))
    //return;
    if (type == 'ebook') {
      //props.navigation.navigate('Chapters',{id:item.id,name:item.subject_name})
      //internet check
      if(isConnected){
          if (item.ebook) {
            props.navigation.navigate('EBookAssets', {
              assets: item.ebook,
              title: 'E- Book',
            });
          } else {
           // alert('Coming Soon!');
           Alert.alert('Coming Soon!');
          }
          setShowContent(false);
          setShowTermOrSem(false);
    }else{
        alert('Offline unavailable. Use only online version');
    }

    } else {
    
      props.navigation.navigate('Chapters', {
        id: item.id,
        name: item.subject_name,
      });
    }
   
  };

useEffect(() => {
  if(showDownload && chapterList.length>0){
    createChapterTable(id);
  }
}, [showDownload,chapterList]);

  const onCancel = () => {
    setShowContent(false);
  };
  const onCancelSub = () => {
    setShowTermOrSem(false);
  }
  const OpenTypeBased = item => {
    console.log('item',item)
    setId(item);
    setSelectedSubject(item);
    ResetData();
    if(item.type=='individual'){
      checkChapterTable(item);
      setShowContent(true);
      setShowType(item.type);
    }else if (item.type=='term'){
      checkContentTable(item);
      setShowTermOrSem(true);
      setContentType({type:'term',value:item.typevalue})
    }else if (item.type=='semester'){
      checkContentTable(item);
      setShowTermOrSem(true);
      setContentType({type:'semester',value:item.typevalue})
    }

  };
  

  const OpenContent = async (classId) => {
   // alert(JSON.stringify(id))
    
    //  if (isDownload){
    //  setShowTermOrSem(false);
    //  setShowContent(false);
    //  props.navigation.navigate('SubjectContent',{id:id.class_id})
    //   }else{
        if(isConnected){
        //  setShowDownload(true);
        //  ResetData();
          getSubjectContent(id.class_id);
          props.navigation.navigate('SubjectContent',{id:id.class_id})
        }else{
            setInternetError('Please Check Your Internet');
            setTimeout(() => {
                setInternetError(null);
                setShowDownload(false);
              }
              , 4000);
          }
        //}
  }
  useEffect(() => {
    //alert('internetError',subjectContent)
    if(showDownload && subjectContent.length>0){
      alert('Downloaded Successfully');
      createContentTable(id);
    }
  }, [showDownload,subjectContent]);

  const createContentTable = (data) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Content (id INTEGER PRIMARY KEY NOT NULL,classid INTEGER NOT NULL,data TEXT,subjectid INTEGER NOT NULL)',
        [] 
      )
      txn.executeSql('INSERT INTO Content (id,classid,data,subjectid) VALUES (:id,:classid,:data,:subjectid)', [data.id,data.class_id,JSON.stringify(subjectContent),data.id]);
      setTimeout(() => {
        setShowDownload(false);
        checkContentTable(id);
      }, 3000);
    })
  }

    
    

  const DataBooks = (data) => {
   // alert(JSON.stringify(data))
   if(data){
     // for(const [key, value] of Object.entries(data)) {
      const allData=Object.entries(data).map(procedure => {
        const [key, value] = procedure;
         return(
          <View style={{flex: 1}}>
           
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}>
                {key}
              </Text>
               <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {value.indivdual.length>0 && value.indivdual.map((item, index) => {
                      return (
                          <View style={{width: '50%', padding: 5}}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            OpenTypeBased(item);
                                          }}
                                          style={{
                                            //width: '50%',
                                          // marginTop: 15,
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
                                          <View style={{paddingTop: 10}}>
                                            <Image
                                              loadingIndicatorSource={<Loader />}
                                              alt="books"
                                              //source={{uri: imageBaseUrl + item.coverimage}}
                                              source={getImageDynamically(key,'Individual',item.subject_name)}
                                              style={{height: 200, left: 0, right: 0}}
                                              resizeMode="contain"
                                            />
                                          </View>
                                          <View style={{padding: 10}}>
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                fontSize: 15,
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                              }}>
                                              {item.subject_name}
                                            </Text>
                                            <Text
                                              style={{
                                                fontSize: 13,
                                                color: '#808080',
                                                textAlign: 'center',
                                              }}>
                                              {item.class_name}
                                            </Text>
                                          </View>
                                        </TouchableOpacity>
                                  </View>
                            
                    
                      );
                    })}
                 </View>

                 

              {value.term && value.term.length > 0 ? (
                  <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000',padding:10}}>Term Books</Text>
                ) : null}

               <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {value.term.length>0 && value.term.map((item, index) => {
                 return (
                    <View style={{width: '50%', padding: 5}}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      OpenTypeBased(item);
                                    }}
                                    style={{
                                      //width: '50%',
                                     // marginTop: 15,
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
                                    <View style={{paddingTop: 10}}>
                                      <Image
                                        loadingIndicatorSource={<Loader />}
                                        alt="books"
                                        //source={{uri: imageBaseUrl + item.coverimage}}
                                        source={getImageDynamically(key,'term',item.typevalue)}
                                        style={{height: 200, left: 0, right: 0}}
                                        resizeMode="contain"
                                      />
                                    </View>
                                    <View style={{padding: 10}}>
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          fontSize: 15,
                                          color: '#000000',
                                          fontWeight: 'bold',
                                          textAlign: 'center',
                                        }}>
                                        {item.subject_name}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 13,
                                          color: '#808080',
                                          textAlign: 'center',
                                        }}>
                                        {item.class_name}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                             </View>
                       
              
                );
              })}
                </View>

                {value.semester && value.semester.length > 0 ? (
                  <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000',padding:10}}>Semester Books</Text>
                ) : null}

               <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {value.semester.length > 0 && value.semester.map((item, index) => {
                 return (
                    <View style={{width: '50%', padding: 5}}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      OpenTypeBased(item);
                                    }}
                                    style={{
                                      //width: '50%',
                                     // marginTop: 15,
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
                                    <View style={{paddingTop: 10}}>
                                      <Image
                                        //loadingIndicatorSource={<Loader />}
                                        alt="books"
                                        //source={{uri: imageBaseUrl + item.coverimage}}
                                        source={getImageDynamically(key,'semester',item.typevalue)}
                                        style={{height: 200, left: 0, right: 0}}
                                        resizeMode="contain"
                                      />
                                    </View>
                                    <View style={{padding: 10}}>
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          fontSize: 15,
                                          color: '#000000',
                                          fontWeight: 'bold',
                                          textAlign: 'center',
                                        }}>
                                        {item.subject_name}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 13,
                                          color: '#808080',
                                          textAlign: 'center',
                                        }}>
                                        {item.class_name}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                             </View>
                       
              
                );
              })}
                </View>
             

             <View style={{flex: 1, height:50}} />
             {/** no internet connection message */}
              {internetError && <View style={{top:0,left:0,right:0,bottom:0,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#808080'}}>
                  {internetError}
                </Text>
              </View>}
             </View>
        )
            } ) 

            return (
              <View style={{flex: 1}}>
                <ScrollView>
              {allData}
              </ScrollView>
              </View>)
             

       // }
    }else{
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>
            No Books Found
          </Text>
          <TouchableOpacity onPress={()=>loadResourcesAndDataAsync()} style={{marginTop: 10,backgroundColor:'#f15972',padding:10,borderRadius:10}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

  }

  const UpdateChapters = (data) => {
    Alert.alert(
      'Delete',
      'Are you sure want to Update?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {text: 'OK', onPress: () => confirmUpdate(data)},
      ],
      {cancelable: false},
    );
  
  }


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
const confirmUpdate= (data) => {
  console.log('Update',data)
  let bookId=data.id;
  let chapterData = [];
  ///Update thier chapters by chapterid
  getUpdateChapters(bookId);


  //Delete thier tasks by chapterid
  // db.transaction(function (txn) {
  //   txn.executeSql('DELETE FROM `Chapters` WHERE subjectid = '+bookId, [], function (tx, res) {
  //    //console.log('Chapters:', tx)
  //    // console.log('Chapters:', res)
  //     checkChapterTable(id);
  //    // DeleteTask(bookId);
  //     //Delete thier tasks by chapterid



  //   })
  // })
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
  return (
    <Box flex="1" style={{backgroundColor: '#eaebed'}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={'MY BOOKS'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {loading ? <Loader /> : false}
      {internetError && <InternetError data={internetError} />}
      <View style={{flex: 1, margin: 10}}>
        {/* {DataBooks(booksLocal)} */}

        <FlatList
          data={books}
          showsVerticalScrollIndicator={false}
          //style={{marginTop:10}}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          ListEmptyComponent={() => (
            <EmptyComponent data={'No Books Found'} />
          )}
          renderItem={({item, index}) =>
            books.length > 0 ? (
              <TouchableOpacity
              onPress={() => {
                OpenTypeBased(item);
              }}
              style={{
                width: '48%',
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
              <View style={{paddingTop: 10}}>
                {item.type =='individual'?
                <Image
                  loadingIndicatorSource={<Loader />}
                  alt={item.type}
                 // source={{uri: imageBaseUrl + item.coverimage}}
                  source={getImageDynamically(item.class_name,item.type,item.subject_name)}
                  style={{height: 200, left: 0, right: 0}}
                  resizeMode="contain"
                />:
                <Image
                loadingIndicatorSource={<Loader />}
                alt={item.type}
               // source={{uri: imageBaseUrl + item.coverimage}}
                source={getImageDynamically(item.class_name,item.type,item.typevalue)}
                style={{height: 200, left: 0, right: 0}}
                resizeMode="contain"
              />}
              </View>
              <View style={{padding: 10}}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 15,
                    color: '#000000',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {item.subject_name}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#808080',
                    textAlign: 'center',
                  }}>
                  {item.class_name}
                </Text>
              </View>
            </TouchableOpacity>
            ) : (
              false
            )
          }
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={info => {
           loadMore(info.distanceFromEnd)
          }}
        />
        {/* <DataBooks data={booksList} /> */}
     
        {/* <FlatList
          data={booksList}
          showsVerticalScrollIndicator={false}
          //style={{marginTop:10}}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          ListEmptyComponent={() => (
            <EmptyComponent data={'No Books Found'} />
          )}
          renderItem={({item, index}) =>
            booksList.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  OpenTypeBased(item);
                }}
                style={{
                  width: '48%',
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
                <View style={{paddingTop: 10}}>
                  <Image
                    loadingIndicatorSource={<Loader />}
                    alt="books"
                    source={{uri: imageBaseUrl + item.coverimage}}
                    style={{height: 200, left: 0, right: 0}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{padding: 10}}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 15,
                      color: '#000000',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {item.subject_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#808080',
                      textAlign: 'center',
                    }}>
                    {item.class_name}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              false
            )
          }
          keyExtractor={(item, index) => index.toString()}
        /> */}

        <Actionsheet isOpen={showContent} onClose={onCancel}>
          <Actionsheet.Content style={{backgroundColor: showType=='term'?'#f8db67':showType=='individual'?'#f9bdb8':'#8ed7f8'}}>
            {showType == 'individual' ? (
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#000',
                    alignSelf: 'flex-start',
                    paddingLeft: 10,
                  }}>
                   {selectedSubject && selectedSubject.subject_name} ( {selectedSubject && selectedSubject.class_name})
                </Text>
                <View style={{width: '100%', marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => OpenModel('ebook', id)}
                    style={[
                      {
                        backgroundColor: '#f15972',
                        borderRadius: 10,
                        // borderBottomRightRadius: 20,
                        padding: 15,
                      },
                    ]}>
                    <View style={{justifyContent: 'center'}}>
                      <Text fontSize="md" style={{color: '#fff'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          E - BOOK
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{flexDirection:'row',justifyContent:'space-between', backgroundColor: '#f15972',
                        borderRadius: 10,
                        marginTop: 10,
                        padding: 15,}}>
           
                       
                        <TouchableOpacity style={ {
                       flex:3
                      }}
                            onPress={() => OpenModel('chapters', id)}>
                          <Text fontSize="md" style={{color: '#fff'}}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: '#fff',
                                fontWeight: 'bold',
                              }}>
                              CHAPTERS
                            </Text>
                          </Text>
                          </TouchableOpacity>
                          {/* <MyIcon name="right-arrow" size={20} color="#fff" style={{flex:1}} /> */}
                  </View>

               
                </View>
              </View>
            ) : (
              false
            )}

     {showType == 'semester' ? (
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#000',
                    alignSelf: 'flex-start',
                    paddingLeft: 10,
                  }}>
                  SELECT SEMESTER
                </Text>
                <View style={{width: '100%', marginTop: 10}}>
                  <TouchableOpacity
                     onPress={() =>  {setShowTermOrSem(true); setContentType({type:'semester',value:1})}}
                    style={[
                      {
                        backgroundColor: '#0095d9',
                        borderRadius: 10,
                        // borderBottomRightRadius: 20,
                        padding: 15,
                      },
                    ]}>
                    <View style={{justifyContent: 'center'}}>
                      <Text fontSize="md" style={{color: '#fff'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                         SEMESTER 1
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>  {setShowTermOrSem(true); setContentType({type:'semester',value:2})}}
                    style={[
                      {
                        backgroundColor: '#0095d9',
                        borderRadius: 10,
                        marginTop: 10,
                        padding: 15,
                      },
                    ]}>
                    <View style={{justifyContent: 'center'}}>
                      <Text fontSize="md" style={{color: '#fff'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          SEMESTER 2
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              false
            )}


{showType == 'term' ? (
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#000',
                    alignSelf: 'flex-start',
                    paddingLeft: 10,
                  }}>
                  SELECT TERM
                </Text>
                <View style={{width: '100%', marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => {setShowTermOrSem(true); setContentType({type:'term',value:1})}}
                    style={[
                      {
                        backgroundColor: '#f58345',
                        borderRadius: 10,
                        // borderBottomRightRadius: 20,
                        padding: 15,
                      },
                    ]}>
                    <View style={{justifyContent: 'center'}}>
                      <Text fontSize="md" style={{color: '#fff'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                         TERM 1
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>  {setShowTermOrSem(true); setContentType({type:'term',value:2})}}
                    style={[
                      {
                        backgroundColor: '#f58345',
                        borderRadius: 10,
                        marginTop: 10,
                        padding: 15,
                      },
                    ]}>
                    <View style={{justifyContent: 'center'}}>
                      <Text fontSize="md" style={{color: '#fff'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          TERM 2
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>  {setShowTermOrSem(true); setContentType({type:'term',value:3})}}
                    style={[
                      {
                        backgroundColor: '#f58345',
                        borderRadius: 10,
                        marginTop: 10,
                        padding: 15,
                      },
                    ]}>
                    <View style={{justifyContent: 'center'}}>
                      <Text fontSize="md" style={{color: '#fff'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          TERM 3
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              false
            )}
          </Actionsheet.Content>
        </Actionsheet>

        <Actionsheet isOpen={showTermOrSem} onClose={onCancelSub}>
          <Actionsheet.Content style={{backgroundColor: '#f9bdb8'}}>
         
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#000',
                    alignSelf: 'flex-start',
                    paddingLeft: 10,
                  }}>
                  {selectedSubject && selectedSubject.subject_name} ( {selectedSubject && selectedSubject.class_name} )
                </Text>
                <View style={{width: '100%', marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => OpenModel('ebook', id)}
                    style={[
                      {
                        backgroundColor: '#f15972',
                        borderRadius: 10,
                        // borderBottomRightRadius: 20,
                        padding: 15,
                      },
                    ]}>
                    <View style={{justifyContent: 'center'}}>
                      <Text fontSize="md" style={{color: '#fff'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          E - BOOK
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => OpenContent(1)}
                    style={[
                      {
                        backgroundColor: '#f15972',
                        borderRadius: 10,
                        marginTop: 10,
                        padding: 15,
                      },
                    ]}>
                    <View style={{justifyContent: 'center',flexDirection:'row',justifyContent:'space-between'}}>
                      <Text fontSize="md" style={{color: '#fff'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          CHAPTERS
                        </Text>
                      </Text>
                     <MyIcon name="arrow-forward-ios" size={20} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
           

    
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </Box>
  );
}
