import React, {useState, useEffect} from 'react';
import {
    NativeBaseProvider,
    useDisclose,
    FormControl,
    Box,
    Stack,
    Button,
    Center,
    HStack,
    VStack,
    TextArea,
    Icon,
    Input,
    WarningOutlineIcon,
    CheckIcon,IconButton,
    KeyboardAvoidingView,
    Avatar,
    Image,
    ScrollView,
    Switch,
  } from 'native-base';
  
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  I18nManager,
  Dimensions,
  SectionList,
// Image
} from 'react-native';
import 'react-native-gesture-handler';
import {booksCover,booksCoverNew} from '../../../config.json';
import LibraryData from '../../../library.json';
const {height, width} = Dimensions.get('window');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  CardGradientComponent,
  HeaderComponent,
  SuccessModalComponent,
  Loader
} from '../../components/component';
import * as ImagePicker from "react-native-image-picker"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMethodCall, PostDataCall, Uploadfiles } from '../../api/apiService';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function MariaLibraryScreen(props) {
  const [ loading, setLoading ] = useState(false);
  const [result, setResult] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [defaltClass, setDefaltClass] = useState(1);

  useEffect(() => {
    setBooksData(LibraryData[defaltClass].data);
  }, []);

const getImageDynamically = (className,type,bookName) => {
//console.log('className',className+type+bookName);
  if(className=='Class 1'){
      if(type=='Individual'){
        if(bookName=='Aspen')
        return require('../../assets/images/class1/INDIVIDUAL/Individual_1.jpg');
        else if(bookName=='Math path')
        return require('../../assets/images/class1/INDIVIDUAL/Individual_2.jpg');
        else if(bookName=='Windows to science')
        return require('../../assets/images/class1/INDIVIDUAL/Individual_3.jpg');
        else if(bookName=='Grow Green')
        return require('../../assets/images/class1/INDIVIDUAL/Individual_4.jpg');
        else if(bookName=='Popple')
        return require('../../assets/images/class1/INDIVIDUAL/Individual_5.jpg');
        else if(bookName=='Term 1')
        return require('../../assets/images/class1/TERM/Term_1.jpg');
        else if(bookName=='Term 2')
        return require('../../assets/images/class1/TERM/Term_2.jpg');
        else if(bookName=='Term 3')
        return require('../../assets/images/class1/TERM/Term_3.jpg');
        else if(bookName=='Semester 1')
        return require('../../assets/images/class1/SEMESTER/Semester_1.jpg');
        else if(bookName=='Semester 2')
        return require('../../assets/images/class1/SEMESTER/Semester_2.jpg');
      }
      else if(type=='term'){
          if(bookName=='Term 1')
          return require('../../assets/images/class1/TERM/Term_1.jpg');
          else if(bookName=='Term 2')
          return require('../../assets/images/class1/TERM/Term_2.jpg');
          else if(bookName=='Term 3')
          return require('../../assets/images/class1/TERM/Term_3.jpg');
     
      }
      else if(type=='semester'){
          if(bookName=='Semester 1')
          return require('../../assets/images/class1/SEMESTER/Semester_1.jpg');
          else if(bookName=='Semester 2')
          return require('../../assets/images/class1/SEMESTER/Semester_2.jpg');
     
      }


  }
  if(className=='Class 2'){
      if(type=='Individual'){
        if(bookName=='Aspen')
        return require('../../assets/images/class2/INDIVIDUAL/Individual_1.jpg');
        else if(bookName=='Math path')
        return require('../../assets/images/class2/INDIVIDUAL/Individual_2.jpg');
        else if(bookName=='Windows to science')
        return require('../../assets/images/class2/INDIVIDUAL/Individual_3.jpg');
        else if(bookName=='Grow Green')
        return require('../../assets/images/class2/INDIVIDUAL/Individual_4.jpg');
        else if(bookName=='Popple')
        return require('../../assets/images/class2/INDIVIDUAL/Individual_5.jpg');
        else if(bookName=='Term 1')
        return require('../../assets/images/class2/TERM/Term_1.jpg');
        else if(bookName=='Term 2')
        return require('../../assets/images/class2/TERM/Term_2.jpg');
        else if(bookName=='Term 3')
        return require('../../assets/images/class2/TERM/Term_3.jpg');
        else if(bookName=='Semester 1')
        return require('../../assets/images/class2/SEMESTER/Semester_1.jpg');
        else if(bookName=='Semester 2')
        return require('../../assets/images/class2/SEMESTER/Semester_2.jpg');
      }
      else if(type=='term'){
          if(bookName=='Term 1')
          return require('../../assets/images/class2/TERM/Term_1.jpg');
          else if(bookName=='Term 2')
          return require('../../assets/images/class2/TERM/Term_2.jpg');
          else if(bookName=='Term 3')
          return require('../../assets/images/class2/TERM/Term_3.jpg');
     
      }
      else if(type=='semester'){
          if(bookName=='Semester 1')
          return require('../../assets/images/class2/SEMESTER/Semester_1.jpg');
          else if(bookName=='Semester 2')
          return require('../../assets/images/class2/SEMESTER/Semester_2.jpg');
     
      }
  }
if(className=='Class 3'){
      if(type=='Individual'){
              if(bookName=='Aspen')
              return require('../../assets/images/class3/INDIVIDUAL/Individual_1.jpg');
              else if(bookName=='Math path')
              return require('../../assets/images/class3/INDIVIDUAL/Individual_2.jpg');
              else if(bookName=='Windows to science')
              return require('../../assets/images/class3/INDIVIDUAL/Individual_3.jpg');
              else if(bookName=='Journey')
              return require('../../assets/images/class3/INDIVIDUAL/Individual_4.jpg');
              else if(bookName=='Popple')
              return require('../../assets/images/class3/INDIVIDUAL/Individual_5.jpg');
              else if(bookName=='Term 1')
              return require('../../assets/images/class3/TERM/Term_1.jpg');
              else if(bookName=='Term 2')
              return require('../../assets/images/class3/TERM/Term_2.jpg');
              else if(bookName=='Term 3')
              return require('../../assets/images/class3/TERM/Term_3.jpg');
              else if(bookName=='Semester 1')
              return require('../../assets/images/class3/SEMESTER/Semester_1.jpg');
              else if(bookName=='Semester 2')
              return require('../../assets/images/class3/SEMESTER/Semester_2.jpg');
      }

      else if(type=='term'){
          if(bookName=='Term 1')
          return require('../../assets/images/class3/TERM/Term_1.jpg');
          else if(bookName=='Term 2')
          return require('../../assets/images/class3/TERM/Term_2.jpg');
          else if(bookName=='Term 3')
          return require('../../assets/images/class3/TERM/Term_3.jpg');
     
      }
      else if(type=='semester'){
          if(bookName=='Semester 1')
          return require('../../assets/images/class3/SEMESTER/Semester_1.jpg');
          else if(bookName=='Semester 2')
          return require('../../assets/images/class3/SEMESTER/Semester_2.jpg');
     
      }
  }

  if(className=='Class 4'){
    if(type=='Individual'){
            if(bookName=='Aspen')
            return require('../../assets/images/class4/INDIVIDUAL/Individual_1.jpg');
            else if(bookName=='Math path')
            return require('../../assets/images/class4/INDIVIDUAL/Individual_2.jpg');
            else if(bookName=='Windows to science')
            return require('../../assets/images/class4/INDIVIDUAL/Individual_3.jpg');
            else if(bookName=='Journey')
            return require('../../assets/images/class4/INDIVIDUAL/Individual_4.jpg');
            else if(bookName=='Popple')
            return require('../../assets/images/class4/INDIVIDUAL/Individual_5.jpg');
            else if(bookName=='Term 1')
            return require('../../assets/images/class4/TERM/Term_1.jpg');
            else if(bookName=='Term 2')
            return require('../../assets/images/class4/TERM/Term_2.jpg');
            else if(bookName=='Term 3')
            return require('../../assets/images/class4/TERM/Term_3.jpg');
            else if(bookName=='Semester 1')
            return require('../../assets/images/class4/SEMESTER/Semester_1.jpg');
            else if(bookName=='Semester 2')
            return require('../../assets/images/class4/SEMESTER/Semester_2.jpg');
    }
    else if(type=='term'){
        if(bookName=='Term 1')
        return require('../../assets/images/class4/TERM/Term_1.jpg');
        else if(bookName=='Term 2')
        return require('../../assets/images/class4/TERM/Term_2.jpg');
        else if(bookName=='Term 3')
        return require('../../assets/images/class4/TERM/Term_3.jpg');
   
    }
    else if(type=='semester'){
        if(bookName=='Semester 1')
        return require('../../assets/images/class4/SEMESTER/Semester_1.jpg');
        else if(bookName=='Semester 2')
        return require('../../assets/images/class4/SEMESTER/Semester_2.jpg');
   
    }
}
if(className=='Class 5'){
  if(type=='Individual'){
          if(bookName=='Aspen')
          return require('../../assets/images/class5/INDIVIDUAL/Individual_1.jpg');
          else if(bookName=='Math path')
          return require('../../assets/images/class5/INDIVIDUAL/Individual_2.jpg');
          else if(bookName=='Windows to science')
          return require('../../assets/images/class5/INDIVIDUAL/Individual_3.jpg');
          else if(bookName=='Journey')
          return require('../../assets/images/class5/INDIVIDUAL/Individual_4.jpg');
          else if(bookName=='Popple')
          return require('../../assets/images/class5/INDIVIDUAL/Individual_5.jpg');
          else if(bookName=='Term 1')
          return require('../../assets/images/class5/TERM/Term_1.jpg');
          else if(bookName=='Term 2')
          return require('../../assets/images/class5/TERM/Term_2.jpg');
          else if(bookName=='Term 3')
          return require('../../assets/images/class5/TERM/Term_3.jpg');
          else if(bookName=='Semester 1')
          return require('../../assets/images/class5/SEMESTER/Semester_1.jpg');
          else if(bookName=='Semester 2')
          return require('../../assets/images/class5/SEMESTER/Semester_2.jpg');
  }
  else if(type=='term'){
      if(bookName=='Term 1')
      return require('../../assets/images/class4/TERM/Term_1.jpg');
      else if(bookName=='Term 2')
      return require('../../assets/images/class4/TERM/Term_2.jpg');
      else if(bookName=='Term 3')
      return require('../../assets/images/class4/TERM/Term_3.jpg');
 
  }
  else if(type=='semester'){
      if(bookName=='Semester 1')
      return require('../../assets/images/class4/SEMESTER/Semester_1.jpg');
      else if(bookName=='Semester 2')
      return require('../../assets/images/class4/SEMESTER/Semester_2.jpg');
 
    }
  }

}     


 


const appendBooks = () => {
  //console.log('defaltClass',LibraryData[defaltClass+1].data);
  //setDefaltClass(defaltClass+1);
  if(defaltClass<5){
    setLoading(true);
  let newArray = LibraryData[defaltClass+1].data;
  setBooksData([...booksData, ...newArray]);
  setDefaltClass(defaltClass+1);
  setTimeout(() => {
    setLoading(false);

  }, 1000);
  }
  
} 
const renderItemBooks = ({ item,index }) => {
  //console.log(item);
  return (


    <View style={{width: '50%', padding: 5}}>
    {index==0 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}>Class 1 </Text> : false}
    {index==1 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}></Text> : false}
    {index==10 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}>Class 2 </Text> : false}
    {index==11 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}></Text> : false}
    {index==20 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}>Class 3 </Text> : false}
    {index==21 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}></Text> : false}
    {index==30 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}>Class 4 </Text> : false}
    {index==31 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}></Text> : false}
    {index==40 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}>Class 5 </Text> : false}
    {index==41 ? <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}></Text> : false}
             <View 
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
                        source={getImageDynamically(item.class,'Individual',item.name)}
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
                         {item.name}
                       </Text>
                    </View>
                   
                  </View>
            </View>
   
      
      
)
}

  return (
    <SafeAreaView style={{flex: 1}}>
    <Box flex="1" style={{backgroundColor:'#eaebed'}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={'Maria Library'}
        nav={props.navigation}
        LeftContent={'goback'}
        rightContent={false}
      />

       {loading ? <Loader /> : false}
            <View style={{}}>
              {/* <ScrollView>
                {booksCover.map((item, index) => {
                  return (
                    <View style={{}} key={index}>
                      {renderItem({item,index})}
                    </View>
                  )
                })}
                </ScrollView> */}
            
            </View>
 
    {/* <SectionList
      sections={booksData}
      keyExtractor={(item, index) => item + index}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

      }}
      renderItem={({item}) => (
           <View style={{flex:1}}>
                        <View 
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
                                      source={getImageDynamically('Class 1','Individual',item)}
                                      style={{height: 200, left: 0, right: 0}}
                                      resizeMode="contain"
                                      
                                    />
                                    </View>

                              </View>
             </View>
         
      )}
      renderSectionHeader={({section: {className}}) => (
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green',padding:5}}>{className} </Text>
      )}
      onEndReachedThreshold={0.01}
      onEndReached={info => {
         alert('End reached');
      }}
    />  */}

    {/* <FlatList
      data={booksCover}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      snapToAlignment='center'
      snapToInterval={width}
    /> */}

<FlatList
      data={booksData}
      style={{}}
      numColumns={2}
      horizontal={false}
      renderItem={renderItemBooks}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.01}
      onEndReached={info => {
        // alert('End reached');
        appendBooks();
      }}
      
     // snapToAlignment='center'
      //snapToInterval={width}
    />
      
      
    
    </Box>
    {loading?
    <View style={{height: 40, backgroundColor: '#fece2e'}}>
    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold',padding:5}}>
        Loading...
      </Text>
    </View>:false}

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});