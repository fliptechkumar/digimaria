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
  const Books = {
    
    Nursery: {
      id: 20,
      subjects: [
        {id: 76, name: 'Literacy',assets:'https://digimaria.com/flipbook/unbox_space_nursery_literacy/mobile/index.html'},
        {id: 77, name: 'Numeracy',assets:'https://digimaria.com/flipbook/unbox_space_nursery_numeracy/mobile/index.html'},
       // {id: 66, name: 'Phonics'},
        {id: 78, name: 'General Awareness',assets:'https://digimaria.com/flipbook/unbox_space_nursery_general_awareness/mobile/index.html'},
        {id: 3, name: 'Rhymes'},
        {id: 5, name: 'Stories'},
        {id: 'Nursery', name: 'Slideshow'},
        {id: 'Nursery', name: 'Flash Cards'},
        
      ],
    },
    UKG: {
      id: 19,
      subjects: [
        {id: 63, name: 'Literacy',assets:'https://digimaria.com/flipbook/unbox_space_senior_kg_literacy/mobile/index.html'},
        {id: 64, name: 'Numeracy',assets:'https://digimaria.com/flipbook/unbox_space_senior_kg_numeracy/mobile/index.html'},
        {id: 70, name: 'Phonics',assets:'https://digimaria.com/flipbook/unbox_space_senior_phonics/mobile/index.html'},
        {id: 65, name: 'General Awareness',assets:'https://digimaria.com/flipbook/unbox_space_ukg_general_awareness/mobile/index.html'},
        {id: 9, name: 'Rhymes'},
        {id: 11, name: 'Stories'},
        {id: 'UKG', name: 'Slideshow'},
        {id: 'UKG', name: 'Flash Cards'},
      ],
    },
    LKG: {
      id: 18,
      subjects: [
        {id: 60, name: 'Literacy',assets:'https://digimaria.com/flipbook/Unbox_Junior_kg_Literacy/mobile/index.html'},
        {id: 61, name: 'Numeracy',assets:'https://digimaria.com/flipbook/Unbox_Junior_numeracy/mobile/index.html'},
        {id: 66, name: 'Phonics',assets:'https://digimaria.com/flipbook/unbox_space_junior_kg_Phonics/mobile/index.html'},
        {id: 62, name: 'General Awareness',assets:'https://digimaria.com/flipbook/Unbox_Junior_General_Awareness/mobile/index.html'},
        {id: 15, name: 'Rhymes'},
        {id: 17, name: 'Stories'},
        {id: 'LKG', name: 'Slideshow'},
        {id: 'LKG', name: 'Flash Cards'},
       
      ],
    },
  };

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
    console.log('item', item);
    SetSelectedChapter(item);
    if (item.name == 'Rhymes' || item.name == 'Stories') {
      props.navigation.navigate('RymsStories', {
        id: subjectId,
        name: item.name,
        type: item.name == 'Rhymes' ? 2 : 1,
      });
    } else if (item.name == 'Slideshow') {
      props.navigation.navigate('SlideShow', {
        id: subjectId,
        data: item,
      });
    }else if (item.name == 'Flash Cards') {
     alert('Flash Cards are not available for this class')
      // props.navigation.navigate('FlashCards', {
      //   id: subjectId,
      //   data: item,
      // });
    }
    
    else {
        if(item.assets){
          setShowContent(true);
        }else{ 
          props.navigation.navigate('Chapters', {
            id: item.id,
            name: item.name,
          });
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
        headerTitle={props.route.params.data}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {loading ? <Loader /> : false}
      {internetError && <InternetError data={internetError} />}
      <View style={{flex: 1, margin: 10}}>
        {Books[props.route.params.data].subjects.length > 0 ? (
          <FlatList
            data={Books[props.route.params.data].subjects}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index+'_books'}
                onPress={() => {
                  OpenBooks(item, Books[props.route.params.data].id);
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
                title:selectedChapter.name
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
