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
    CheckIcon,Select,
    KeyboardAvoidingView,
    View
  } from 'native-base';
  
import {
  FlatList,
  Dimensions,
  
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import MyIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CardGradientComponent,
  HeaderComponent,
  SuccessModalComponent,
} from '../../../components/component';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';

//import VideoPlayer from 'react-native-video-player';

export default function Home(props) {
  const [show, setShow] = useState(false);
  const [youtube, setIsyoutube] = useState(false);
  const onSuccess = () => {
    setShow(false);
    // props.navigation.navigate('Home');
  };
  useEffect(() => {
   //alert(props.route.params.assets);
    if (checkYotubeUrl(props.route.params.assets)) {

    }
  }, []);

  const checkYotubeUrl = (url) => {

    var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)(?:&list=([^&]+))?$/;
    if(url.match(p)){
        return true;
    }else{
        return false;
    }
  }


  return (
    <Box flex="1" >
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={'Animated Video'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      <View style={{flex:1,paddingTop:10}}>
      {(checkYotubeUrl(props.route.params.assets))?(
        <WebView
        source={{
          uri: props.route.params.assets
        }}
        style={{ margin:10,width:'95%' }}
      />
      ):
<Video
    source={{uri:props.route.params.assets}}
    style={{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    flex:1,
    //justifyContent: 'center',
  }}
    controls={true}
    resizeMode={'contain'}
    
   // thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
    //ref={r => this.player = r}
/>}


      </View>
    </Box>
  );
}
