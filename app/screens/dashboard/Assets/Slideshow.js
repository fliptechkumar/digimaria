import React, {useState, useEffect} from 'react';
import {
    NativeBaseProvider,
    useDisclose,
    Image,
    FormControl,
    Box,
    Stack,
    Button,
    Center,
    HStack,
    VStack,
    TextArea,
    Input,
    WarningOutlineIcon,
    Icon,Select,
    useToast,
    View,
    Badge,
    FlatList
  } from 'native-base';
  
import {
    TouchableOpacity,
    Text,
  Dimensions,
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MyIcon from 'react-native-vector-icons/MaterialIcons';
import {
  SuccessModalActivityComponent,
  HeaderComponent,
  SuccessModalComponent,
} from '../../../components/component';
import {playSound,playSoundIncorrect} from '../../../components/Functions'
import LKGUnbox from '../../../assets/images/Unbox/unbox_space_junior_kg.png';
import UKGUnbox from '../../../assets/images/Unbox/unbox_space_senior_kg.png';
import NurseryUnbox from '../../../assets/images/Unbox/unbox_space_nursery.png';

export default function SlideShow(props) {
    const Books = {
    
        Nursery: {
          id: 20,
          subjects: [
            {id: 1, name: 'Literacy'},
            {id: 2, name: 'Numeracy'},
            {id: 3, name: 'General Awareness'},
            {id: 4, name: 'Vowels'},
            {id: 5, name: 'Shapes'},
          ],
        },
        UKG: {
          id: 19,
          subjects: [
            {id: 1, name: 'Literacy'},
            {id: 2, name: 'Numeracy'},
            {id: 3, name: 'General Awareness'},
            {id: 4, name: 'Phonics'},
          ],
        },
        LKG: {
          id: 18,
            subjects: [
                {id: 1, name: 'Literacy'},
                {id: 2, name: 'Numeracy'},
                {id: 3, name: 'General Awareness'},
                {id: 4, name: 'Phonics'},
              
            ],
        },
      };
  const OpenShow = (item) => {
    if (item.name == 'Literacy') {
      props.navigation.navigate('Alphabets', {classId: item.id,className:props?.route?.params?.data?.id});
    }else if (item.name == 'Numeracy') {
      props.navigation.navigate('NumeracySlide', {classId: item.id,className:props?.route?.params?.data?.id});
    }
    else if (item.name == 'General Awareness') {
      props.navigation.navigate('BodyParts', {classId: item.id,className:props?.route?.params?.data?.id});
    }
    else if (item.name == 'Vowels') {
      props.navigation.navigate('Vowels', {classId: item.id,className:props?.route?.params?.data?.id});
    }
    else if (item.name == 'Shapes') {
      props.navigation.navigate('Shapes', {classId: item.id,className:props?.route?.params?.data?.id});
    }
    else if (item.name == 'Phonics') {
      props.navigation.navigate('Phonics', {classId: item.id,className:props?.route?.params?.data?.id});
    }
   // props.navigation.navigate('Alphabets', {classId: item.id});
  }


  return (
    <Box flex="1" >
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={'Slide Show'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
       <View style={{padding:10}}>
          <Text style={{fontSize:18,color:'#0AB4B6',fontWeight:'bold'}}>{props?.route?.params?.data?.id}</Text>
       </View> 
       <Image source={props?.route?.params?.data?.id=='Nursery'?NurseryUnbox:props?.route?.params?.data?.id=='LKG'?LKGUnbox:UKGUnbox} alt="Alternate Text" size="2xl" resizeMode="contain" style={{width: '100%', height: 200}}/>  


       <View style={{flex: 1, margin: 10}}>
        {Books[props.route.params.data.id].subjects.length > 0 ? (
          <FlatList
            data={Books[props.route.params.data.id].subjects}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index+'_books'}
                onPress={() => {
                  OpenShow(item);
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
                      padding: 10,
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
                  
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <MyIcon
                      name="chevron-right"
                      style={{color: '#fff'}}
                      size={25}
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
    </Box>
  
  );
}
