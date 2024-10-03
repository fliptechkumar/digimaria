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
  Icon,
  Select,
  useToast,
  View,
  Badge,
  FlatList,
  Checkbox,
} from 'native-base';

import {
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  SuccessModalActivityComponent,
  HeaderComponent,
  SuccessModalComponent,
  Loader
} from '../../../components/component';
import {playSound, playSoundIncorrect} from '../../../components/Functions';

export default function ChooseTheCorrect(props) {
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [string, setString] = useState(null);
  const [wrongAnswer, setwrongAnswer] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [Questions, setQuestions] = useState([]);
  //not chacing the image
  const [wrongCheckbox, setWrongCheckbox] = useState(null);
  const [questionVisible, setQuestionVisible] = useState(true);
  // let options=["Green","Orange","Yellow","Purple","Orange"];
  useEffect(() => {
    setQuestions(props?.route?.params?.assets?.questions);
    //alert(JSON.stringify(props.route.params.assets.questions))
  }, []);
  //   const Questions=[{question:'What is test',answer:2,options:['Option 1','Option 2','Option 3','Option 4']},
  //   {question:'What is test Result testts',answer:1,options:['Option 1','Option 2','Option 3','Option 4']},
  //   {question:'What is test sjhsggs',answer:3,options:['Option 1','Option 2','Option 3','Option 4']},
  //   {question:'What is test kumar',answer:4,options:['Option 1','Option 2','Option 3','Option 4']}
  // ]

  const setCheckAnswer = value => {
    // setShow(false);
    //alert(value)
    //alert(Questions[currentIndex].answer);
    //return;
    if (Questions[currentIndex].answer == value) {
      setWrongCheckbox(null);
      setSelectedOption(value);

      setTimeout(() => {
        setCorrectAnswer(true);
        playSound();
      }, 500);
    } else {
      setwrongAnswer(true);
      playSoundIncorrect();
      setWrongCheckbox(value);
    }
  };
  const setSuccess = () => {
    if (Questions.length - 1 > currentIndex) {
      //alert(Questions.length > currentIndex);
      // return;
      setCurrentIndex(currentIndex + 1);
      setCorrectAnswer(false);
      setSelectedOption(null);
    } else {
      setActivityCompleted(true);
    }
  };
  const CompletedActivity = () => {
    setCurrentIndex(0);
    setActivityCompleted(false);
    props.navigation.goBack();
  };
  useEffect(() => {
    if (Questions.length > 0) {
      setString(Questions[currentIndex].question);
      setCurrentIndex(currentIndex);
      //alert(Questions[currentIndex].question)
    }
  }, [Questions, currentIndex]);

  // useEffect(()=>{
  //   alert(currentIndex)
  // },[currentIndex])

  const LeftNav = () => {
    if (currentIndex > 0) {
      setQuestionVisible(false);
      setCurrentIndex(currentIndex - 1);
      setTimeout(() => {
        setQuestionVisible(true);
      }, 500);
    }
  };
  const RightNav = () => {
    if (Questions.length - 1 > currentIndex) {
      setQuestionVisible(false);
      setCurrentIndex(currentIndex + 1);
      setTimeout(() => {
        setQuestionVisible(true);
      }, 500);
    }
  };
  function isValidUrl(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
  }
  return (
    <Box flex="1">
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={'Choose The Correct'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      <View style={{padding: 10,backgroundColor:'#f1f2f3'}}>
        <Text style={{fontSize: 18, color: '#0AB4B6',fontWeight:'600'}}>
          {props?.route?.params?.title}
        </Text>
      </View>
      <View
        style={{
          shadowColor: '#808080',
          backgroundColor: '#fff',
          margin: 10,
          padding: 10,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
          borderRadius: 10,

        }}>
        {string && !isValidUrl(string) ? (
          <Text style={{fontSize: 18, color: '#000000',fontWeight:'bold'}}>
            {' '}
            {currentIndex + 1}. {string}
          </Text>
        ) : ( string &&
          <Image
            style={{width: width - 20, height: 200}}
            source={{uri: string}}
            resizeMode="contain"
          />
          
        )}

        {questionVisible ? (
          <FlatList
            data={Questions.length > 0 ? Questions[currentIndex].options : []}
            showsVerticalScrollIndicator={false}
            // columnWrapperStyle={{flex: 1,
            // justifyContent: "space-between"}}
            //numColumns={2}
            style={{margin: 5}}
            renderItem={({item, index}) => (
              item && (
              <TouchableOpacity
                onPress={() => setCheckAnswer(index + 1)}
                style={{
                  padding: 10,
                  backgroundColor:
                    selectedOption == index + 1
                      ? 'green'
                      : wrongCheckbox == index + 1
                      ? '#e91e63'
                      : '#0AB4B6',
                  margin: 5,
                  borderRadius: 10,
                }}>
              
                  <View style={{flexDirection: 'row'}}>
                  <View style={{flex:0.5}}>
                  <Text style={{fontSize: 16, color: '#fff',fontWeight:'bold',}}> {index + 1}.</Text>
                    </View>
                      <View style={{flex:3.5}}>
                        <Text
                          style={{fontSize: 16, color: '#fff',fontWeight:'bold',}}>
                          {item}
                        </Text>
                      </View>
                    </View>
                 
               
              </TouchableOpacity>
            )
            )}
          />
        ) : (
          <Loader />
        )}

       
      </View>

      <View style={{padding: 10}}>
        <View
          style={{
            height: 55,
            borderRadius: 5,
            shadowColor: '#0AB4B6',
            backgroundColor: '#f3f2f1',
            // margin:10,
            // padding:10,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}>
          <View style={{flexDirection: 'row', padding: 5}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Button
                onPress={() => LeftNav()}
                leftIcon={
                  <Icon as={FontAwesomeIcon} name="chevron-left" size="lg" />
                }>
                <Text
                  style={{
                    fontSize: 16,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  Previous
                </Text>
              </Button>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 20,
                  fontStyle: 'italic',
                  color: '#000',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                {currentIndex + 1}/{Questions.length}
              </Text>
            </View>

            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button
                onPress={() => RightNav()}
                endIcon={
                  <Icon
                    as={FontAwesomeIcon}
                    name="chevron-right"
                    size="lg"
                    alignItems={'flex-end'}
                  />
                }>
                <Text
                  style={{
                    fontSize: 16,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  Next
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
      <SuccessModalActivityComponent
        title={'Well Done!'}
        subTitle={'Correct Answer.Congratulations!'}
        okText={Questions.length - 1 > currentIndex ? 'Next' : 'Finish'}
        type={'Success'}
        isVisible={correctAnswer ? true : false}
        onPressOk={() => {
          setSuccess();
          setQuestionVisible(false);
          setTimeout(() => {
            setQuestionVisible(true);
          }, 300);
        }}
      />
      <SuccessModalActivityComponent
        title={'No! Try again.'}
        subTitle={'Incorrect Answer.Please try again.'}
        type={'Error'}
        okText={'TRY AGAIN'}
        isVisible={wrongAnswer ? true : false}
        onPressOk={() => {
          setwrongAnswer(false);
          setWrongCheckbox(null);
          setQuestionVisible(false);

          setTimeout(() => {
            setQuestionVisible(true);
          }, 300);
        }}
      />
      <SuccessModalActivityComponent
        title={'Congratulations !'}
        subTitle={''}
        type={'Success'}
        isVisible={activityCompleted ? true : false}
        okText={'OK'}
        onPressOk={() => {
          CompletedActivity();
        }}
      />
    </Box>
  );
}
