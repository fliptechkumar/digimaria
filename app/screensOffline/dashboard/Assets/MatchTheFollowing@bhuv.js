import React, {useState, useEffect} from 'react';
import {Box, Button, Icon, useToast, View, Badge, FlatList, Image} from 'native-base';

import {TouchableOpacity, Text, Dimensions} from 'react-native';
import 'react-native-gesture-handler';
import {Svg, Circle, Line} from 'react-native-svg';
import {
  HeaderComponent,
  SuccessModalActivityComponent,
} from '../../../components/component';

var Sound = require('react-native-sound');
import {playSound, playSoundIncorrect} from '../../../components/Functions';

export default function MatchTheFollowing(props) {
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [chooseQuestion, setChooseQuestion] = useState(null);
  
  const [wrongAnswer, setwrongAnswer] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);

  const [closedQuestions, setClosedQuestions] = useState([]);

  const defaultPoints = {
    A: {x1: 0, y1: 0, x2: 0, y2: 0},
    B: {x1: 0, y1: 0, x2: 0, y2: 0},
    C: {x1: 0, y1: 0, x2: 0, y2: 0},
    D: {x1: 0, y1: 0, x2: 0, y2: 0},
    E: {x1: 0, y1: 0, x2: 0, y2: 0},
  };
  const [points, setPoints] = useState(defaultPoints);

  const [pointA, setPointA] = useState({
    0: {x1: 38, y1: 30, x2: 138, y2: 30},
    1: {x1: 38, x2: 30, y1: 138, y2: 90},
    2: {x1: 38, x2: 30, y1: 138, y2: 150},
    3: {x1: 38, x2: 30, y1: 138, y2: 210},
    4: {x1: 38, x2: 30, y1: 138, y2: 260},
  });

  const [pointB, setPointB] = useState({
    0: {x1: 38, y1: 30, x2: 138, y2: 0},
    1: {x1: 38, x2: 30, y1: 138, y2: 30},
    2: {x1: 38, x2: 30, y1: 138, y2: 90},
    3: {x1: 38, x2: 30, y1: 138, y2: 150},
    4: {x1: 38, x2: 30, y1: 138, y2: 210},
  });

  const [pointC, setPointC] = useState({
    0: {x1: 38, y1: 120, x2: 136, y2: 0},
    1: {x1: 38, y1: 120, x2: 136, y2: 70},
    2: {x1: 38, y1: 120, x2: 136, y2: 120},
    3: {x1: 38, y1: 120, x2: 136, y2: 170},
    4: {x1: 38, y1: 120, x2: 136, y2: 230},
  });

 
  const [pointD, setPointD] = useState({
    0: {x1: 38, y1: 158, x2: 138, y2: 0},
    1: {x1: 38, y1: 158, x2: 138, y2: 50},
    2: {x1: 38, y1: 158, x2: 138, y2: 110},
    3: {x1: 38, y1: 158, x2: 138, y2: 160},
    4: {x1: 38, y1: 158, x2: 138, y2: 210},
  });

  const [pointE, setPointE] = useState({
    0: {x1: 38, y1: 210, x2: 138, y2: 0},
    1: {x1: 38, y1: 210, x2: 138, y2: 50},
    2: {x1: 38, y1: 210, x2: 138, y2: 110},
    3: {x1: 38, y1: 210, x2: 138, y2: 160},
    4: {x1: 38, y1: 210, x2: 138, y2: 210},
  });

let qes = ['https://digimaria.com/digimaria/uploads/chap2-0.png',
          'https://digimaria.com/digimaria/uploads/chap2-1.png',
          'https://digimaria.com/digimaria/uploads/chap2-2.png',
          'https://digimaria.com/digimaria/uploads/chap2-3.png',
          'https://digimaria.com/digimaria/uploads/chap2-4.png'];

let ans = ['https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_A.png',
          'https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_B.png',
          'https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_C.png',
          'https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_D.png',
          'https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_E.png'];

  const Questions = [
    {
      questionsRow: ['0', '1', '2', '3', '4'],
      answerRow: ['0', '1', '2', '3', '4'],
      answers: {
        '0': 4,
        '1': 0,
        '2': 3,
        '3': 1,
        '4': 2,
      }
    }
  ];

  const BorderColor = ["green", "red", "blue", "brown", "orange"];

  const handleMathlines = (ans, qst) => {
    if (qst == 0) {
      let obj = pointA[ans];
      points.A = obj;
    }
    if (qst == 1) {
      let obj = pointB[ans];
      points.B = obj;
    }
    if (qst == 2) {
      let obj = pointC[ans];
      points.C = obj;
    }
    if (qst == 3) {
      let obj = pointD[ans];
      points.D = obj;
    }
    if (qst == 4) {
      let obj = pointE[ans];
      points.E = obj;
    }
	//console.log('points', points);
  };

  const setCheckAnswer = (value, index) => {
    if (chooseQuestion) 
    {
      let obj = Questions[currentIndex].answers;
      let verify = Object.keys(obj).filter(i => obj[i] == index)[0];
      let questionIndex = Questions[currentIndex].questionsRow.indexOf(chooseQuestion);
      

      if (verify == chooseQuestion) {
        closedQuestions[index] = value;
        setSelectedOption(value);
        setChooseQuestion(null);
        handleMathlines(index, questionIndex);
        //setCorrectAnswer(true);
        //playSound();
        setTimeout(()=>{
          setSelectedOption(null);
         },500)
         console.log('closedQuestions', closedQuestions);
         if(!closedQuestions.includes(undefined)){
          console.log('AllQuestionsClosed', closedQuestions);
            taskCompleted();
            return ;
            
         }
      } else {
        setSelectedOption(null);
        setwrongAnswer(true);
        playSoundIncorrect();
      }
    }
    return false;
  };

 const taskCompleted = () => {
 // alert('ok');
  setActivityCompleted(true);
  };

  const setSuccess = () => {
    if (Questions.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setClosedQuestions([]);
      setCorrectAnswer(false);
      setSelectedOption(null);
      setPoints(defaultPoints);
    } else {
      setActivityCompleted(true);
    }
  };

  const CompletedActivity = () => {
   // setCurrentIndex(0);
    setActivityCompleted(false);
    //alert('ok');
    props.navigation.goBack();
  };

  const resetFields = () => {
    setChooseQuestion(null);
    setSelectedOption(null);
    setPoints(defaultPoints);
  }

  const LeftNav = () => {
    resetFields();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const RightNav = () => {
    resetFields();
    if (Questions.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePress = (name, i) => {
    setSelectedOption(null);
    setChooseQuestion(name);
    //alert(chooseQuestion);
  };

  return (
    <Box flex="1">
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={props.route.params.title}
        nav={props.navigation}
        LeftContent={'goback'}
      />

      <View style={{padding: 10}}>
          <Text style={{fontSize:18,color:'#0AB4B6',fontWeight:'bold'}}>Match the Following.Click in the first row the click on then pair in second row</Text>
      </View>

      <View
        style={{
          width: 380,
          height: 360,
          shadowColor: '#808080',
          backgroundColor: '#f1f1f1',
          margin: 5,
          padding: 5,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <View style={{margin: 10}}>
          <FlatList
            data={Questions[currentIndex].questionsRow}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 10}}
            renderItem={({item, index}) => (
              <Box
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <TouchableOpacity
                  key={item}
                  onPress={() => handlePress(item, index)}
                  style={{borderRadius: 5, width: '35%'}}>
                  <Badge
                    size={50}
                    style={{borderRadius: 5,borderColor: closedQuestions.includes(item) ? BorderColor[index] : "#0AB4B6"}}
                    colorScheme={ chooseQuestion == item  ? 'success' : 'info'}
                    variant={chooseQuestion == item ? 'solid' : 'outline'}>
                    <Image
                    alt=""
                      resizeMode="contain"
                      source={{uri:qes[index]}}
                      style={{ width: 60, height: 40 }}
                    />
                  </Badge>
                </TouchableOpacity>

                <View style={{position: 'absolute', left: '27%', top: 0}}>
                  {index == 0 && points.A && points.A.x1 > 0 && (
                     <View
                     style={{position: 'absolute', left: '27%', top: 30}}>
                    <Svg height="245" width="200" >
                      <Line
                        x1={38}
                        y1={10}
                        x2={138}
                        y2={points.A.y2}
                        stroke="green"
                        strokeWidth="4"
                        strokeLinecap='round'
                        strokeLinejoin="round"
                        strokeOpacity={0.5}
                       // strokeDasharray={[5, 5]}
                        strokeDashoffset={5}
                        markerStart="square"

                      />
                    </Svg>
                    </View>
                  )}

                  {index == 1 && points.B && points.B.x1 > 0 && (
                     <View
                     style={{position: 'absolute', left: '28%', top: -10}}>
                    <Svg height="270" width="150">
                      <Line
                        x1={38}
                        y1={30}
                        x2={136}
                        y2={points.B.y2}
                        stroke="green"
                        strokeWidth="4"
                        strokeLinecap='round'
                        strokeOpacity={0.5}
                      />
                    </Svg>
                    </View>
                  )}

                  {index == 2 && points.C && points.C.x1 > 0 && (
                    <View
                    style={{position: 'absolute', left: '28%', top: -90}}>
                      <Svg height="270" width="180" fillOpacity="0.5">
                        <Line
                          x1={38}
                          y1={120}
                          x2={136}
                          y2={points.C.y2}
                          stroke="green"
                          strokeWidth="4"
                          strokeLinecap='round'
                          strokeOpacity={0.5}
                        />
                       
                      </Svg>
                    </View>
                  )}
                  {index == 3 && points.D && points.D.x1 > 0 && (
                    <View
                      style={{position: 'absolute', left: '28%', top: -128}}>
                      <Svg height="270" width="180" fillOpacity="0.5">
                        <Line
                          x1={points.D.x1}
                          y1={points.D.y1}
                          x2={points.D.x2}
                          y2={points.D.y2}
                          stroke="green"
                          strokeWidth="4"
                          strokeLinecap='round'
                          strokeOpacity={0.5}
                        />
                      </Svg>
                    </View>
                  )}

                  {index == 4 && points.E && points.E.x1 > 0 && (
                    <View
                      style={{position: 'absolute', left: '28%', top: -186}}>
                      <Svg height="270" width="180" fillOpacity="0.5">
                        <Line
                          x1={points.E.x1}
                          y1={points.E.y1}
                          x2={points.E.x2}
                          y2={points.E.y2}
                          stroke="green"
                          strokeWidth="4"
                          strokeLinecap='round'
                          strokeOpacity={0.5}
                        />
                      </Svg>
                    </View>
                  )}

                </View>
                <TouchableOpacity
                  onPress={() =>setCheckAnswer(Questions[currentIndex].answerRow[index],index)}
                  style={{borderRadius: 5, width: '35%',}}>
                  <Badge
                    size={50}
                    style={{borderRadius: 5, borderColor : closedQuestions.includes(Questions[currentIndex].answerRow[index]) ? BorderColor[Questions[currentIndex].questionsRow.indexOf(Questions[currentIndex].answerRow[index])] : "#0AB4B6"}}
                    colorScheme={
                      selectedOption == Questions[currentIndex].answerRow[index]
                        ? 'success'
                        : 'warning'
                    }
                    variant={
                      selectedOption == Questions[currentIndex].answerRow[index]
                        ? 'solid'
                        : 'outline'
                    }>
                     <Image
                     alt=""
                      resizeMode="contain"
                      source={{uri: ans[Questions[currentIndex].answerRow[index]]}}
                      style={{ width: 120, height: 40 }}
                    />
                   
                  </Badge>
                </TouchableOpacity>
              </Box>
            )}
          />
        </View>
      </View>

      <SuccessModalActivityComponent
        title={'Well Done!'}
        subTitle={'Correct Answer.Congratulations!'}
        okText={'NEXT'}
        type={'Success'}
        isVisible={correctAnswer}
        onPressOk={() => {
          //setSuccess();
          setCorrectAnswer(false);
        }}
      />
      <SuccessModalActivityComponent
        title={'No! Try again.'}
        subTitle={'Incorrect Answer.Please try again.'}
        type={'Error'}
        okText={'TRY AGAIN'}
        isVisible={wrongAnswer}
        onPressOk={() => {
          setwrongAnswer(false);
        }}
      />
      <SuccessModalActivityComponent
        title={'Congratulations !'}
        subTitle={''}
        type={'Success'}
        isVisible={activityCompleted }
        okText={'Ok'}
        onPressOk={() => {
          CompletedActivity();
        }}
      />

    </Box>
  );
}
