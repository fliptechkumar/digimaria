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
    Icon,
    Input,
    WarningOutlineIcon,
    CheckIcon,IconButton,
    KeyboardAvoidingView,
    Avatar
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
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase('maria_app.db', '1.0', '', 1);
export default function Home(props) {
  const [show, setShow] = useState(false);
  const [showQrCode, setShowQrCode] = useState(true);
  const [imageurl, setImageUrl] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [result, setResult] = useState(null);
  
  const submitLogin = async () => {};
  const onSuccess = () => {
    setShow(false);
    // props.navigation.navigate('Home');
  };

useEffect(()=>{
  loadResourcesAndDataAsync()
},[])

async function loadResourcesAndDataAsync() {
  let token = await AsyncStorage.getItem('token');
  if (token) {
    let tokenParse=JSON.parse(token);
    //alert(JSON.stringify(tokenParse))
    //alert(tokenParse.mobilenumber)
    setUserId(tokenParse.userid);
    setMobileNumber(tokenParse.mobilenumber);
    setResult(tokenParse);
  }
}

const SaveProfile=()=>{
  setLoading(true);
  if(firstName==null){
    setFnameError(true);
    setLoading(false);
    return;
  }
  if(lastName==null){
    setLnameError(true);
    setLoading(false);
    return;
  }
  if(email==null){
    setEmailError(true);
    setLoading(false);
    return;
  }

    
  let resource = 'profileupdate?';
  let filter='id='+userId+'&first_name='+firstName+'&last_name='+lastName+'&email='+email
  getMethodCall(resource, filter, ProfileCallback, errorCallback);

}
const ProfileCallback = async(data) => {
  if (data.errorCode==0){
     //alert(JSON.stringify(data));
     await AsyncStorage.setItem('token',JSON.stringify(data.result))
    //setSuccess(true);
  } else {
    alert(data.Message);
  }
  setLoading(false);
};

  const errorCallback = (data) => {
    setLoading(false);
    console.log('errorCallback',data);
  
  };
  const alertLogout=async()=>{
    await AsyncStorage.removeItem('token');
    db.transaction(function(txn) {
      txn.executeSql('DROP TABLE IF EXISTS MyBooks', [])
    });
    props.navigation.reset({ routes: [{ name: 'Login' }] });
  }

  return (
    <Box flex="1" style={{backgroundColor:'#eaebed'}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={'My Profile'}
        nav={props.navigation}
        LeftContent={'goback'}
        rightContent={
          <View style={{}}>
               <IconButton
                onPress={() => Alert.alert(
                  'Alert',
                 'Are you sure want to logout?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: 'OK', onPress: () => alertLogout() }
                  ]
                )}
                icon={
                  <Icon
                    size={30}
                    as={MaterialIcons}
                    name="logout"
                    color="#808080"
                  />
                }
              />
              </View>
              }
      />
       {loading ? <Loader /> : false}
<View style={{margin:10}}>

<TouchableOpacity onPress={()=>ImagePicker.launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                //console.log(response);
                if (response.assets && response.assets.length > 0) {
                setImageUrl(response.assets[0].uri);
                }
              },
            )} style={{flexDirection:'row',height:100,alignItems:'center',justifyContent:'center'}}>
{imageurl?<Avatar
size={'xl'}
  source={{uri:imageurl}}
/>:<View style={{height:80,width:80,backgroundColor:'gray',borderRadius:60}}>
  <MaterialCommunityIcons name='camera-account' size={60} style={{alignItems:'center',padding:10}} /></View>}
  <TouchableOpacity onPress={()=>ImagePicker.launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                if (response.assets && response.assets.length > 0) {
                      setImageUrl(response.assets[0].uri);
                  }
              },
            )}>
      <Image source={require('../../assets/pencil.png')}  style={{width:25,height:25,bottom:10}}/>
      </TouchableOpacity>
</TouchableOpacity>

      <FormControl isInvalid={fnameError}>
         <Box borderColor={'#808080'} borderWidth={1} borderRadius={10} mt={3}>
          <Input
            w={{
              base: '100%',
              md: '25%',
            }}
            height={60}
            borderWidth={0}
            color={'#000000'}
            placeholder="First name *"
            value={firstName}
            defaultValue={result && result.first_name}
            placeholderTextColor={'#808080'}
            onChangeText={text =>{
              setFirstName(text)
              setFnameError(false);}
            }
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
        </Box>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>
          Please enter your first name
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isInvalid={lnameError}>
          <Box borderColor={'#808080'} borderWidth={1} borderRadius={10} mt={3}>
          <Input
            w={{
              base: '100%',
              md: '25%',
            }}
            height={60}
            borderWidth={0}
            color={'#000000'}
            placeholder="Last name *"
            value={lastName}
            defaultValue={result && result.last_name}
            placeholderTextColor={'#808080'}
            onChangeText={text =>
              {
              setLastName(text);
              setLnameError(false);
              }
            }
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
        </Box>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>
          Please enter your last name
        </FormControl.ErrorMessage>
      </FormControl>


      <FormControl isInvalid={emailError}>
      <Box borderColor={'#808080'} borderWidth={1} borderRadius={10} mt={3}>
          <Input
            w={{
              base: '100%',
              md: '25%',
            }}
            height={60}
            borderWidth={0}
            color={'#000000'}
            placeholder="Email Address *"
            value={email}
            defaultValue={result && result.email}
            placeholderTextColor={'#808080'}
            onChangeText={text =>
              {
              setEmail(text);
              setEmailError(false);
              }
            }
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
        </Box>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>
          Please enter your Email
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isInvalid={false}>
        <Box borderColor={'#808080'} borderWidth={1} borderRadius={10} mt={3}>
          <Input
            w={{
              base: '100%',
              md: '25%',
            }}
            height={60}
            borderWidth={0}
            maxLength={10}
            editable={false}
            color={'#000'}
            placeholder="Mobile Number"
            value={mobileNumber}
            placeholderTextColor={'#000'}
            keyboardType="numeric"
            defaultValue={mobileNumber}
            // onChangeText={text =>
            //   setCompanyFormData({companyMobile: text, companyMobileError: ''})
            // }
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="phone" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
        </Box>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>
          
        </FormControl.ErrorMessage>
      </FormControl>

      <Box mt={3}>
              <TouchableOpacity onPress={()=>SaveProfile()}
                style={{
                  backgroundColor: '#3b8476',
                  height: 50,
                  borderRadius: 10,
                  width: '40%',
                  alignSelf:'center'
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    padding: 13,
                    fontSize: 18,
                    fontWeight: 'bold',
                   // fontFamily: 'JosefinSans-Bold',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </Box>
      </View>
    </Box>
  );
}
