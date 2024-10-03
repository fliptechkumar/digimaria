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
  Actionsheet
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
import MyIcon from 'react-native-vector-icons/FontAwesome';
import {
  CardGradientComponent,
  HeaderComponent,
  EmptyComponent,
  Loader
} from '../../components/component';
import Logo from '../../assets/sub1.jpg';
import {useDetailsAll} from '../../context/detailsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {imageBaseUrl} from '../../../config.json';
import { getMethodCall, PostDataCall, Uploadfiles } from '../../api/apiService';
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase('maria_app.db', '1.0', '', 1);
export default function Home(props) {
  const [showActivities, SetshowActivities] = useState(false);
  const {getChapters,chapterList} = useDetailsAll();
  const [ loading, setLoading ] = useState(false);
  const [ contentsList, setContents ] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [selectedChapter, SetSelectedChapter] = useState(null);
  const [selectedType, SetSelectedType] = useState(null);
  useEffect(() => {
    getContents(props.route.params.data.id);
    //getTaskLocally(props.route.params.data.id);
  }, []);
  
const onCancel =()=>{
  setShowContent(false);
}
const getTaskLocally = async (id) => {
	//alert(id)
	db.transaction(function (txn) {
		txn.executeSql('SELECT * FROM `Tasks` WHERE chapterid = '+id, [], function (tx, res) {
			let data = [];
      //console.log('subjectidsss:', res.rows.item(0).asset);
      setContents(JSON.parse(res.rows.item(0).asset));
		})
	}
	)

}

const getContents = async (chapterid) => {
  setLoading(true);
  let resource = 'chapteractivities?';
  let filter='chapterid='+chapterid
  getMethodCall(resource, filter, ContentsCallback, errorCallback);
}
const errorCallback = (data) => {
  setLoading(false);
  console.log('errorCallback',data);

};
const ContentsCallback = async(data) => {
  if (data.errorCode==0){
    //console.log('contentsdata',data.)
    setContents(data.result);
  } else {
    setContents([])
  }
  setLoading(false);
};
const CheckAssets=(type,data)=>{
  if(data.assets==null){
    showActivity(type,data)
  }else{
    SetSelectedChapter(data);
    SetSelectedType(type);
    setShowContent(true);
  }
}
const showActivity=(type,data)=>{
 // alert(type);
  //props.navigation.navigate('TickTheCorrect',{assets:data.asset,title:data.title})
  //return;
   if(type=='fillintheblanks'){
        props.navigation.navigate('SelectActivity',{assets:data,title:data.title})
    }
    else if(type=='trueorfalse'){
        props.navigation.navigate('TrueorFalse',{assets:data,title:data.title})
    }
    else if(type=='circletheanswer'){
      props.navigation.navigate('ClickToCircle',{assets:data,title:data.title})
   } else if(type=='circletheimage'){
      props.navigation.navigate('ClickToCircleImage',{assets:data,title:data.title})
    }
    else if(type=='draganddrop'){
      props.navigation.navigate('DragAndDrop',{assets:data,title:data.title})
    }
    else if(type=='multipledraganddrop'){
      props.navigation.navigate('MultipleDragAndDrop',{assets:data,title:data.title})
    }
    else if(type=='matchtherows'){
      // console.log('matchtherows',JSON.stringify(data))
      props.navigation.navigate('MatchTheFollowing',{assets:data,title:data.title})
    }
    else if(type=='matchtherowsColour'){
      props.navigation.navigate('MatchTheColor',{assets:data,title:data.title})
    }
    else if(type=='ticktheanswer'){
      props.navigation.navigate('TickTheCorrect',{assets:data,title:data.title})
    }
    else if(type=='choosetheCorrect'){
      props.navigation.navigate('ChooseTheCorrect',{assets:data,title:data.title})
    }
    

}
  return (
    <Box flex="1">
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle='CONTENTS'
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {loading ? <Loader /> : false}
      <View style={{margin: 10,flex:1}}>
      <Box  style={[
										{
											backgroundColor: '#3b8476',
											 width: '100%',
											borderTopRightRadius: 30,
											borderBottomRightRadius: 30,
											borderTopLeftRadius:5,
											borderBottomLeftRadius:5,
											height: 50,
											padding: 10,
											flexDirection: 'row'
										},
									]}>
						<View style={{flexDirection:'row',flex:1}}>
              <View style={{flex:3}}>
							<Text numberOfLines={1} style={{ fontSize: 18, fontWeight: 'bold', color: '#fff'}}>{props.route.params.title}</Text>
              </View>
							<View  style={{flex:0.5,alignItems:'flex-end' }}>
							      <MyIcon name='chevron-down' style={{ color: '#fff' }} size={25} />
							</View>
						</View>
				</Box>
     
      <FlatList
                  data={contentsList}
                  showsVerticalScrollIndicator={false}
                  style={{marginTop:10,marginLeft:15}}
                  ListEmptyComponent={() => (
                    <EmptyComponent data={'No Activities Found'} />
                    )}
                  renderItem={({item, index}) =>
                  contentsList.length > 0 ?  (
              <TouchableOpacity onPress={()=>{CheckAssets(item.type,item)}} style={{ marginTop: 5}}>
              

                <Box
                  style={[
                    {
                      backgroundColor: '#04503e',
                     // width: '70%',
                      borderRadius: 10,
                     // borderBottomRightRadius: 20,
                      padding: 20,
                    },
                  ]}>
                  <View style={{}}>
               <View style={{flexDirection:'row'}}>
                    <Text fontSize="md" style={{color: '#fff',flex:0.5}}>
                      <Text 
                        style={{
                          fontSize: 16,
                          color: '#fff',
                          fontWeight: 'bold',
                          //padding:10
                        }}>
                         {index+1}.
                      </Text>
                    </Text>
                    <Text fontSize="md" style={{color: '#fff',flex:3.5}}>
                      <Text 
                        style={{
                          fontSize: 16,
                          color: '#fff',
                          fontWeight: 'bold',
                          //padding:10
                        }}>
                        {item.title}
                      </Text>
                    </Text>
                    </View>
                  
                  </View>
                </Box>
              </TouchableOpacity>
           ) : (
            false
          )
        }
        keyExtractor={(item, index) => index.toString()}
      />
      </View>


      <Actionsheet isOpen={showContent} onClose={onCancel}>
				<Actionsheet.Content style={{ backgroundColor: '#f1e8c7' }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', alignSelf: 'flex-start', paddingLeft: 10 }}>CONTENTS</Text>
					<View style={{ width: '100%', marginTop: 10 }} >
            {selectedChapter && selectedChapter.assets ? (
						<TouchableOpacity onPress={() => {
							if (selectedChapter && selectedChapter.assets) {
								setShowContent(false);
								//alert(selectedChapter.video)
								props.navigation.navigate('VideoAsset', { assets: selectedChapter.assets, title: selectedChapter.chapter })
							} else {
								alert('Coming Soon!');
							}

						}}
							style={[
								{
									backgroundColor: '#f58345',
									borderRadius: 10,
									// borderBottomRightRadius: 20,
									padding: 15,
								},
							]}>
							<View style={{ justifyContent: 'center' }}>
								<Text fontSize="md" style={{ color: '#fff' }}>
									<Text
										style={{
											fontSize: 16,
											color: '#fff',
											fontWeight: 'bold',
										}}>
										Animated Videos
									</Text>
								</Text>

							</View>
						</TouchableOpacity>
            ) : null}

						<TouchableOpacity onPress={() => { setShowContent(false); showActivity(selectedType,selectedChapter) }}
							style={[
								{
									backgroundColor: '#f58345',
									borderRadius: 10,
									marginTop: 10,
									padding: 15,
								},
							]}>
							<View style={{ justifyContent: 'center' }}>
								<Text fontSize="md" style={{ color: '#fff' }}>
									<Text
										style={{
											fontSize: 16,
											color: '#fff',
											fontWeight: 'bold',
										}}>
										Interactive Tasks
									</Text>
								</Text>

							</View>
						</TouchableOpacity>
					</View>
				</Actionsheet.Content>
			</Actionsheet>

    </Box>
  );
}
