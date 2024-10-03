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
export default function BookList(props) {
  const [internetError, setInternetError] = useState(null);
  const {loading} = useDetailsAll();
  const Books={LKG:[{id:16,name:'Amuse'},{id:23,name:'Get together'},{id:21,name:'Marbles'}],
                UKG:[{id:17,name:'Amuse'},{id:24,name:'Get together'},{id:22,name:'Marbles'}],
               // Nursery:['English','Maths','EVS'],
              }
   

  useEffect(() => {
    console.log('props',props.route.params.classId)

  }, []);



const OpenBooks = (item) => {
  console.log('item',item)
  if(item.name=='Marbles'){
     props.navigation.navigate('ClassBooks',{classId:item.id,title:item.name,classname:props.route.params.data});
  }else{
     props.navigation.navigate('LkgContent',{classId:item.id,title:item.name,classname:props.route.params.data});
  }
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
        {Books[props.route.params.data] ? (
          <FlatList
            data={Books[props.route.params.data]}
            renderItem={({item, index}) => (
              <View>
                {props.route.params.classId==item.id &&
              <TouchableOpacity onPress={() => { OpenBooks(item)}} style={{ marginTop: 5 }}>
              <Box
                style={[
                  {
                    backgroundColor: item.active == 1 ?'#04503e': '#3b8476',
                    // width: '70%',
                    borderRadius: 10,
                    // borderBottomRightRadius: 20,
                    padding: 20,
                    flexDirection: 'row'
                  },
                ]}>
                <View style={{ flex: 3 }}>
                <View style={{flexDirection:'row'}}>
                <Text fontSize="md" style={{ color: '#fff',flex:0.4,width:5}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      {index + 1}.
                    </Text>
                  </Text>
                  <Text fontSize="md" style={{ color: '#fff',flex:3,justifyContent:'flex-start'}}>
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
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <MyIcon name='chevron-right' style={{ color: '#fff' }} size={26} />
                  </View>
              </Box>
            </TouchableOpacity>
            }
            </View>
            )}

            />
        ) : ( <EmptyComponent message={'No Books Found'} />)}

     
     
      </View>
      
    </Box>
  );
}
