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
  CheckIcon,
  IconButton,
  KeyboardAvoidingView,
  Avatar,
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
  Linking
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  CardGradientComponent,
  HeaderComponent,
  SuccessModalComponent,
  Loader,
} from '../../components/component';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMethodCall, PostDataCall, Uploadfiles} from '../../api/apiService';
export default function Home(props) {
  const [show, setShow] = useState(false);
  const [showQrCode, setShowQrCode] = useState(true);
  const [imageurl, setImageUrl] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [result, setResult] = useState(null);

  const submitLogin = async () => {};
  const onSuccess = () => {
    setShow(false);
    // props.navigation.navigate('Home');
  };

  useEffect(() => {
    loadResourcesAndDataAsync();
  }, []);

  async function loadResourcesAndDataAsync() {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      let tokenParse = JSON.parse(token);
      //alert(JSON.stringify(tokenParse))
      //alert(tokenParse.mobilenumber)
      setUserId(tokenParse.userid);
      setMobileNumber(tokenParse.mobilenumber);
      setResult(tokenParse);
    }
  }

  const SaveProfile = () => {
    setLoading(true);
    if (firstName == null) {
      setFnameError(true);
      setLoading(false);
      return;
    }
    if (lastName == null) {
      setLnameError(true);
      setLoading(false);
      return;
    }
    if (email == null) {
      setEmailError(true);
      setLoading(false);
      return;
    }

    let resource = 'profileupdate?';
    let filter =
      'id=' +
      userId +
      '&first_name=' +
      firstName +
      '&last_name=' +
      lastName +
      '&email=' +
      email;
    getMethodCall(resource, filter, ProfileCallback, errorCallback);
  };
  const ProfileCallback = async data => {
    if (data.errorCode == 0) {
      //alert(JSON.stringify(data));
      await AsyncStorage.setItem('token', JSON.stringify(data.result));
      //setSuccess(true);
    } else {
      alert(data.Message);
    }
    setLoading(false);
  };

  const errorCallback = data => {
    setLoading(false);
    console.log('errorCallback', data);
  };
  const alertLogout = async () => {
    await AsyncStorage.removeItem('token');
    props.navigation.reset({routes: [{name: 'Login'}]});
  };

  return (
    <Box flex="1" style={{backgroundColor: '#eaebed'}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={'Support'}
        nav={props.navigation}
        LeftContent={'goback'}
       
      />
      {loading ? <Loader /> : false}
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>
          Contact Us
        </Text>

          <View style={{margin: 10,backgroundColor:'#DDD',borderRadius:10,shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}>

            <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
              Address : 
            </Text>
          <View style={{margin: 10}}>
               <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Maria Publishers Pvt. Ltd
               </Text>
              <Text style={{fontSize: 16}}>
                13, Sundarraj Nagar,
              </Text>
              <Text style={{fontSize: 16}}>
                Subramaniapuram,
              </Text>
              <Text style={{fontSize: 16}}>
                Tiruchirappalli-620 020,
              </Text>
              <Text style={{fontSize: 16}}>
                Tamil Nadu, India.
              </Text>
            </View>
            <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
              Email Address :
            </Text>
            <TouchableOpacity onPress={()=>Linking.openURL('mailto:info@mariapublishers.com')} style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
              <MaterialCommunityIcons
                name="email"
                size={25}
                color="#e91e63"
                style={{margin: 10}}
              />
              <Text style={{fontSize: 16, fontWeight: 'bold',color:'blue'}}>
              info@mariapublishers.com
              </Text>
             </TouchableOpacity>
            

          </View>

          <View style={{margin: 10,backgroundColor:'#DDD',borderRadius:10,shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
              Help Number
            </Text>
              <TouchableOpacity onPress={()=>Linking.openURL('tel:0431-2331245')} style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
              <MaterialCommunityIcons
                name="phone"
                size={25}
                color="#e91e63"
                style={{margin: 10}}
              />
              <Text style={{fontSize: 16, fontWeight: 'bold',color:'blue'}}>
                 0431-2331245
              </Text>
             </TouchableOpacity>
             </View>

       
        </View>
    </Box>
  );
}
