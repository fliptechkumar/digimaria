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
  InternetError,
} from '../../components/component';
import Logo from '../../assets/sub1.jpg';
import {useDetailsAll} from '../../context/detailsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {imageBaseUrl} from '../../../config.json';
import NetInfo from '@react-native-community/netinfo';
import {getImageDynamically} from './utils';
import SQLite from 'react-native-sqlite-2';
import {getMethodCall, PostDataCall, Uploadfiles} from '../../api/apiService';
const db = SQLite.openDatabase('maria_app.db', '1.0', '', 1);
export default function BookList(props) {
  const [id, setId] = useState(null);
  const [internetError, setInternetError] = useState(null);
  const {getBooks, booksList, loading} = useDetailsAll();
  const [showContent, setShowContent] = useState(false);
  const [selectedChapter, SetSelectedChapter] = useState(null);
  const [showDownload, setShowDownload] = useState(false);
  const Books = [{id: 63, name: 'Subjects'},
  {id: 9, name: 'Rhymes'},
  {id: 11, name: 'Stories'}];
  
  

  useEffect(() => {}, []);

  const getUpdateChapters = async subjectid => {
    // setLoading(true);
    let resource = 'linkedchapters?';
    let filter = 'subjectid=' + subjectid;
    getMethodCall(resource, filter, ChaptersCallback, errorCallback);
  };
  const ChaptersCallback = async data => {
    if (data.errorCode == 0) {
      console.log('myChapters', data);
    }
  };
  const errorCallback = async error => {};

  const OpenBooks = (item, subjectId) => {
   // console.log('item', subjectId);
    SetSelectedChapter(item);
    if (item.name == 'Rhymes' || item.name == 'Stories') {
      props.navigation.navigate('RymsStories', {
        id: subjectId,
        name: item.name,
        type: item.name == 'Rhymes' ? 2 : 1,
      });
    } else {
        if(item.assets){
          setShowContent(true);
        }else{ 
            props.navigation.navigate('ClassBooks',
               {classId:props.route.params.classId,
                title:props.route.params.title,
                classname:props.route.params.classname});
        }
    }
    
  };
  const onCancel = () => {
    setShowContent(false);
  }
  return (
    <Box flex="1" style={{backgroundColor: '#eaebed'}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={props.route.params.title}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {loading ? <Loader /> : false}
      {internetError && <InternetError data={internetError} />}
      <View style={{flex: 1, margin: 10}}>
        { Books.length > 0 ? (
          <FlatList
            data={Books}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  OpenBooks(item, props.route.params.classId);
                }}
                style={{marginTop: 5}}>
                <Box
                  style={[
                    {
                      //pink color code: #fece2e
                      backgroundColor: '#e91e63',
                      // width: '70%',
                      borderRadius: 10,
                      // borderBottomRightRadius: 20,
                      padding: 20,
                      flexDirection: 'row',
                    },
                  ]}>
                  <View style={{flex: 3}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        fontSize="md"
                        style={{color: '#fff', flex: 0.4, width: 5}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          {index + 1}.
                        </Text>
                      </Text>
                      <Text
                        fontSize="md"
                        style={{
                          color: '#fff',
                          flex: 3,
                          justifyContent: 'flex-start',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Text>
                      </Text>
                    </View>
                    {/* <Text style={{color: '#fff', paddingTop: 10}}>
                    <Text style={{fontSize: 16}}>{item.class_name}</Text>
                  </Text> */}
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <MyIcon
                      name="chevron-right"
                      style={{color: '#fff'}}
                      size={28}
                      fontWeight="bold"
                    />
                  </View>
                </Box>
              </TouchableOpacity>
            )}
          />
        ) : (
          <EmptyComponent message={'No Books Found'} />
        )}
      </View>
      <Actionsheet isOpen={showContent} onClose={onCancel}>
				<Actionsheet.Content style={{ backgroundColor: '#f1e8c7' }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', alignSelf: 'flex-start', paddingLeft: 10 }}>CONTENTS</Text>
					<View style={{ width: '100%', marginTop: 10 }} >
						{selectedChapter && selectedChapter.assets ? (
            <TouchableOpacity onPress={() => {
							props.navigation.navigate('EBookAssets', {
                assets: selectedChapter.assets,
                title: 'E- Book',
              });
						
						}}
							style={[
								{
									backgroundColor: '#f58345',
									borderRadius: 10,
									// borderBottomRightRadius: 20,
									padding: 15,
								},
							]}>
							<View style={{ justifyContent: 'center', flexDirection: 'row',justifyContent:'space-between' }}>
								<Text fontSize="md" style={{ color: '#fff' }}>
									<Text
										style={{
											fontSize: 16,
											color: '#fff',
											fontWeight: 'bold',
										}}>
										 E - BOOK
									</Text>
								</Text>
                <MyIcon name="book" style={{ color: '#fff' }} size={25} />

							</View>
						</TouchableOpacity>

            ) : false}
						<TouchableOpacity onPress={() => { 
							 props.navigation.navigate('Chapters', { id: selectedChapter.id, name: selectedChapter.name })
							// if(TaskDownloaded){
						    //    props.navigation.navigate('Content', { title: title, data: selectedChapter });
							//    setShowContent(false); 
							// }
							// else{
							// 	if(isConnected){
							// 	   setShowTaskDownload(true);
							// 	   getContents(selectedChapter.id);
							// 	   //createTaskTable(selectedChapter.id);
							//     }else{
							// 	   alert('Please check your internet connection')
							//     }
							// }
					     }}
							style={[
								{
									backgroundColor: '#f58345',
									borderRadius: 10,
									marginTop: 10,
									padding: 15,
								},
							]}>
							<View style={{ justifyContent: 'center' , flexDirection: 'row',justifyContent:'space-between' }}>
								<Text fontSize="md" style={{ color: '#fff' }}>
									<Text
										style={{
											fontSize: 16,
											color: '#fff',
											fontWeight: 'bold',
										}}>
										Chapters
									</Text>
								</Text>
								<MyIcon name='chevron-right' style={{ color: '#fff' }} size={25} /> 



							</View>
						</TouchableOpacity>
					</View>
				</Actionsheet.Content>
			</Actionsheet>
    </Box>
  );
}
