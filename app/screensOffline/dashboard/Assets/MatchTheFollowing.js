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
  StyleSheet
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Svg, Circle, Line,G,Path,RadialGradient,Stop} from 'react-native-svg';
import {
  CardGradientComponent,
  HeaderComponent,
  SuccessModalComponent,
  SuccessModalActivityComponent
} from '../../../components/component';
var Sound = require('react-native-sound');
import Ding from '../../../assets/weldone.mp3'
import WrongSound from '../../../assets/incorrect.mp3'
import {playSound,playSoundIncorrect} from '../../../components/Functions'
//import VideoPlayer from 'react-native-video-player';

export default function Home(props) {
  const [show, setShow] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [string, setString] = useState(null);
  const [wrongAnswer, setwrongAnswer] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedAnswerArray, setSelectedAnswerArray] = useState({1:null,2:null,3:null,4:null,5:null});
  const [Questions, setQuestions] = useState([]);
  const [points, setPoints] = useState({0:{x1:0,y1:0,x2:800,y2:800},
    1:{x1:0,x2:0,y1:0,y2:0},
    2:{x1:0,x2:0,y1:0,y2:0},
    3:{x1:0,x2:0,y1:0,y2:0},
    4:{x1:0,x2:0,y1:0,y2:0}});
  const yAxis = [45,125,205,285,365];
  const toast = useToast();
 // let options=["Green","Orange","Yellow","Purple","Orange"];
  // const Questions=[{questionsRow:['https://digimaria.com/digimaria/uploads/chap2-0.png',
  // 'https://digimaria.com/digimaria/uploads/chap2-1.png',
  // 'https://digimaria.com/digimaria/uploads/chap2-2.png',
  // 'https://digimaria.com/digimaria/uploads/chap2-3.png',
  // 'https://digimaria.com/digimaria/uploads/chap2-4.png'],
  // answerRow:['https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_A.png',
  // 'https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_B.png',
  // 'https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_C.png',
  // 'https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_D.png',
  // 'https://digimaria.com/Chapter_Images/Class1/maths/chapter1/ch1_pg_9_E.png'],answers:{1:5,2:1,3:4,4:2,5:3}}]
  //let arr=[1,2,3,4];
  //const arr=['a','A','C', 'Z', 'b', 'B', 'd', 'E', 'z'];
  const setCheckAnswer = (value) => {
    //alert(Questions[0].answer)
    if(selectedLeft==null){
      alert("Please select the left side image");
      return;
    }
    if(value==Questions[0].answer[selectedLeft]){
       // alert("Correct Answer");
        setSelectedAnswerArray({...selectedAnswerArray,[selectedLeft]:yAxis[value-1]});
    }else{
      setwrongAnswer(true)
      playSoundIncorrect();
    }

   // setShow(false);
   
  };

  useEffect(() => {
   console.log('test',JSON.stringify(props.route.params.assets.questions));
      setQuestions(props.route.params.assets.questions);
    }, []);
 const setSuccess=()=>{
  

  if(Questions.length-1 > currentIndex){
    //alert(Questions.length > currentIndex);
 // return;
      setCurrentIndex(currentIndex+1)
      setCorrectAnswer(false);
      setSelectedOption(null);
  }else{
      setActivityCompleted(true)
  }
 }
 const CompletedActivity=()=>{
  setCurrentIndex(0);
  setActivityCompleted(false)
  props.navigation.goBack()
 }
  const CheckAnswerExist=(yAxisValue)=>{
    let exist=false;
    Object.keys(selectedAnswerArray).map((key)=>{
      if(selectedAnswerArray[key]==yAxisValue){
        exist=true;
      }
    })
    return exist;

  }
  // useEffect(()=>{
  //   setString(Questions[currentIndex].question);
  //   setTimeout(()=>{
  //    //alert(JSON.stringify(points[1].x2))
  //   },3000)
  // })
  useEffect(()=>{
    
    //answers not null to finished
    let count=0;
    for(let i=1;i<=5;i++){
      if(selectedAnswerArray[i]!=null){
        count++;
      }
    }
    if(Questions.length>0){
      var filtered = Questions[0].questionsRow.filter(function (el) {
       return el != "";
     });
   //  alert(filtered.length);
     if(count==filtered.length){
      setActivityCompleted(true);
      playSound();
    }
     
   }
   
  },[selectedAnswerArray])
  
  const modifiedString = () => {
    const splitString = string.split("-");
    var newStr = <Text style={{fontSize:20,color:'#000000',fontWeight:'bold'}}>{currentIndex+1} . </Text>;
    splitString.map((subStr, i) => {
      newStr =  <Text>
                   
                  <Text style={{fontSize:20,color:'#000000',fontWeight:'bold'}}>{newStr}</Text> 
                  <Text style={{fontSize:20,color:'#000000',fontWeight:'bold'}}>{subStr}</Text> 
                  {splitString.length - 1 === i ? null : <Text style={{fontSize:20,color:'#0AB4B6',fontWeight:'bold',fontStyle:'italic',textDecorationLine:'underline',textDecorationColor:'#000'}}>{selectedOption}</Text>}
                </Text>;
    });
    //console.log(newStr);
    return newStr;
  };
const LeftNav=()=>{
  if(currentIndex>0){
    setCurrentIndex(currentIndex-1)
  }
}
const RightNav=()=>{
  if(Questions.length-1 > currentIndex){
    setCurrentIndex(currentIndex+1)
  }
}
useEffect(()=>{
  let countObj = {};
let arr = [1,2,3,1,2,3,4];

let countFunc = keys => {
  countObj[keys] = ++countObj[keys] || 1;
}

arr.forEach(countFunc);

console.log('JSON Array',countObj);
},[])
const handlePress=(evt,data)=>{
  //alert('hi')
 // console.log(`x coord = ${evt.nativeEvent.locationX}`);
  console.log('onLayout',evt.nativeEvent.layout);
  //let location={0:{x1:evt.nativeEvent.locationX,y1:evt.nativeEvent.locationY,x2:300,y2:300}}
  //setPoints({...points, ...location});
}
const getLayout = (event,val) => {
  console.log(val,event);
}
const setformData = (childData) =>{
  setPoints({...points, ...childData});
  }

  function isValidUrl(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  }
  return (
    <Box flex="1" >
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={props.route.params.title}
        nav={props.navigation}
        LeftContent={'goback'}
      />
   
       <View style={{padding:10}}>
          <Text style={{fontSize:18,color:'#0AB4B6',fontWeight:'bold'}}>Match the Following.Click in the first row the click on the pair in second row</Text>
       </View> 
       {Questions.length>0 ?

       <View style={AppStyle.QuestionContainer}>

              {/* ///// 5 rows static layout getting for match the following */}
               <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setSelectedLeft(1)} >
                          {isValidUrl(Questions[0].questionsRow[0])?
                            <View style={{padding:2}}>
                                <Image source={{uri:'file://'+Questions[0].questionsRow[0]}} alt={Questions[0].questionsRow[0]} resizeMode={'contain'} style={{height:70,width:'100%'}} />
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'green',fontWeight:'bold',textAlign:'center'}}>{Questions[0].questionsRow[0]}</Text>
                            </View>
                          }
                          </TouchableOpacity>
                        <View style={{justifyContent:'center',height:70,paddingLeft:5}} >
                            <FontAwesomeIcon name='dot-circle-o' size={25} color={selectedAnswerArray[1]!=null?'#f00665':'#808080'} style={{left:2,zIndex:2}} />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                         <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setSelectedLeft(2)} >
                           {isValidUrl(Questions[0].questionsRow[1])?
                            <View style={{padding:4}}>
                                <Image source={{uri:'file://'+Questions[0].questionsRow[1]}} alt={'digi'} resizeMode={'contain'} style={{height:65,width:'100%'}} />
                                
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'green',fontWeight:'bold',textAlign:'center'}}>{Questions[0].questionsRow[1]}</Text>
                            </View>
                           }
                          </TouchableOpacity>
                        <View style={{justifyContent:'center',height:70,paddingLeft:5}} >
                            {/* <View  style={{borderRadius:20,width:20,borderWidth:3,height:20,left:2,}} /> */}
                            <FontAwesomeIcon name='dot-circle-o' size={25} color={selectedAnswerArray[2]!=null?'#f00665':'#808080'} style={{left:2,zIndex:2}} />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                         <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setSelectedLeft(3)} >
                           {isValidUrl(Questions[0].questionsRow[2])?
                            <View style={{padding:4}}>
                                <Image source={{uri:'file://'+Questions[0].questionsRow[2]}} resizeMode={'contain'} style={{height:65,width:'100%'}} />
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'green',fontWeight:'bold',textAlign:'center'}}>{Questions[0].questionsRow[2]}</Text>
                            </View>
                            }
                          </TouchableOpacity>
                        <View style={{justifyContent:'center',height:70,paddingLeft:5}} >
                            {/* <View  style={{borderRadius:20,width:20,borderWidth:3,height:20,left:2,}} /> */}
                            <FontAwesomeIcon name='dot-circle-o' size={25} color={selectedAnswerArray[3]!=null?'#f00665':'#808080'} style={{left:2,zIndex:2}} />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                          <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setSelectedLeft(4)} >
                            {isValidUrl(Questions[0].questionsRow[3])?
                            <View style={{padding:4}}>
                                <Image source={{uri:'file://'+Questions[0].questionsRow[3]}} resizeMode={'contain'} style={{height:65,width:'100%'}} />
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'green',fontWeight:'bold',textAlign:'center'}}>{Questions[0].questionsRow[3]}</Text>
                            </View>}
                          </TouchableOpacity>
                        <View style={{justifyContent:'center',height:70,paddingLeft:5}} >
                            {/* <View  style={{borderRadius:20,width:20,borderWidth:3,height:20,left:2,}} /> */}
                            <FontAwesomeIcon name='dot-circle-o' size={25} color={selectedAnswerArray[4]!=null?'#f00665':'#808080'} style={{left:2,zIndex:2}} />
                        </View>
                    </View>
                    {Questions[0].questionsRow[4] && 
                    <View style={{flexDirection:'row',marginTop:10}}>
                         <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setSelectedLeft(5)} >
                           {isValidUrl(Questions[0].questionsRow[4])?
                            <View style={{padding:4}}>
                                <Image source={{uri:'file://'+Questions[0].questionsRow[4]}} resizeMode={'contain'} style={{height:65,width:'100%'}} />
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'green',fontWeight:'bold',textAlign:'center'}}>{Questions[0].questionsRow[4]}</Text>
                            </View>
                            }
                          </TouchableOpacity>
                        <View style={{justifyContent:'center',height:70,paddingLeft:5}} >
                            {/* <View  style={{borderRadius:20,width:20,borderWidth:3,height:20,left:2,}} /> */}
                            <FontAwesomeIcon name='dot-circle-o' size={25} color={selectedAnswerArray[5]!=null?'#f00665':'#808080'} style={{left:2,zIndex:2}} />
                        </View>
                    </View>}
                </View>
                <Svg height={500} style={{flex:2}} >
                  {selectedAnswerArray[1]!=null?
                      <Line
                        x1={10}
                        y1={45}
                        x2={180}
                        y2={selectedAnswerArray[1]}
                        stroke="#f00665"
                        strokeWidth="5"
                        strokeLinecap='round'
                        //sstrokeOpacity={0.5}
                      />
                      :false}
                      {selectedAnswerArray[2]!=null?
                      <Line
                        x1={10}
                        y1={125}
                        x2={180}
                        y2={selectedAnswerArray[2]}
                        stroke="#f00665"
                        strokeWidth="5"
                        strokeLinecap='round'
                      
                      />
                      :false}
                       {selectedAnswerArray[3]!=null?
                       <Line
                        x1={10}
                        y1={205}
                        x2={180}
                        y2={selectedAnswerArray[3]}
                        stroke="#f00665"
                        strokeWidth="5"
                        strokeLinecap='round'
                       // strokeOpacity={0.5}
                      />
                      :false}
                        {selectedAnswerArray[4]!=null?
                       <Line
                        x1={10}
                        y1={285}
                        x2={180}
                        y2={selectedAnswerArray[4]}
                        stroke="#f00665"
                        strokeWidth="5"
                        strokeLinecap='round'
                        //strokeOpacity={0.5}
                      
                      />
                      :false}
                        {selectedAnswerArray[5]!=null?
                      <Line 
                        x1={10}
                        y1={360}
                        x2={180}
                        y2={selectedAnswerArray[5]}
                        stroke="#f00665"
                        strokeWidth="5"
                        strokeLinecap='round'
                        //strokeOpacity={0.5}
                      
                      />
                      :false}
         
         
                </Svg>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',marginTop:10}}> 
                        <View style={{justifyContent:'center',height:70}} >
                             <FontAwesomeIcon name='dot-circle-o' size={25} color={CheckAnswerExist(45)?'#f00665':'#808080'} style={{right:5}} />
                        </View>
                        <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setCheckAnswer(1)} >
                          {isValidUrl(Questions[0].answerRow[0])?
                            <View style={{padding:4}}>
                                <Image source={{uri:'file://'+Questions[0].answerRow[0]}} resizeMode={'contain'} style={{height:65,width:'100%'}} />
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'#151218',fontWeight:'bold',textAlign:'center'}}>{Questions[0].answerRow[0]}</Text>
                            </View>}
                          </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}> 
                        <View style={{justifyContent:'center',height:70}} >
                            <FontAwesomeIcon name='dot-circle-o' size={25} color={CheckAnswerExist(125)?'#f00665':'#808080'} style={{right:5}} />
                        </View>
                        <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setCheckAnswer(2)}>
                          {isValidUrl(Questions[0].answerRow[1])?
                            <View style={{padding:4}}>
                                <Image source={{uri:'file://'+Questions[0].answerRow[1]}} resizeMode={'contain'} style={{height:65,width:'100%'}} />
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'#151218',fontWeight:'bold',textAlign:'center'}}>{Questions[0].answerRow[1]}</Text>
                            </View>}
                          </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}> 
                        <View style={{justifyContent:'center',height:70}}  >
                             <FontAwesomeIcon name='dot-circle-o' size={25} color={CheckAnswerExist(205)?'#f00665':'#808080'} style={{right:5}} />
                        </View>
                        <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setCheckAnswer(3)}>
                          {isValidUrl(Questions[0].answerRow[2])?
                            <View style={{padding:4}}>
                                <Image source={{uri:'file://'+Questions[0].answerRow[2]}} resizeMode={'contain'} style={{height:65,width:'100%'}} />
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'#151218',fontWeight:'bold',textAlign:'center'}}>{Questions[0].answerRow[2]}</Text>
                            </View>}
                          </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}> 
                        <View style={{justifyContent:'center',height:70}} >
                            <FontAwesomeIcon name='dot-circle-o' size={25} color={CheckAnswerExist(285)?'#f00665':'#808080'} style={{right:5}} />
                        </View>
                        <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setCheckAnswer(4)} >
                          {isValidUrl(Questions[0].answerRow[3])?
                            <View style={{padding:4}}>
                                <Image source={{uri:'file://'+Questions[0].answerRow[3]}} resizeMode={'contain'} style={{height:65,width:'100%'}} />
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'#151218',fontWeight:'bold',textAlign:'center'}}>{Questions[0].answerRow[3]}</Text>
                            </View>}
                          </TouchableOpacity>
                    </View>
                    {Questions[0].answerRow[4] && 
                    <View style={{flexDirection:'row',marginTop:10}}> 
                        <View style={{justifyContent:'center',height:70}} >
                             <FontAwesomeIcon name='dot-circle-o' size={25} color={CheckAnswerExist(365)?'#f00665':'#808080'} style={{right:5}} />
                        </View>
                        <TouchableOpacity  style={AppStyle.itemContainer} onPress={()=>setCheckAnswer(5)}>
                          {isValidUrl(Questions[0].answerRow[4])?
                            <View style={{padding:4}}>
                                <Image source={{uri:'file://'+Questions[0].answerRow[4]}} resizeMode={'contain'} style={{height:65,width:'100%'}} />
                            </View>:
                            <View style={{padding:5,marginTop:25}}>
                                <Text style={{fontSize:10,color:'#151218',fontWeight:'bold',textAlign:'center'}}>{Questions[0].answerRow[4]}</Text>
                            </View>}
                          </TouchableOpacity>
                    </View>}
                </View>
               </View>

             
         
                  </View>
                  :false}

       
      <SuccessModalActivityComponent
			title={'Well Done !'}
			subTitle={'Correct Answer.Congratulations!'}
      okText={'NEXT'}
			type={'Success'}
			isVisible={correctAnswer?true:false}
			onPressOk={() => {
				setSuccess();
				
			}}
		/>
      <SuccessModalActivityComponent
			title={'No! Try again.'}
			subTitle={'Incorrect Answer.Please try again.'}
			type={'Error'}
      okText={'TRY AGAIN'}
			isVisible={wrongAnswer?true:false}
			onPressOk={() => {
				setwrongAnswer(false);
			}}
		/>
     <SuccessModalActivityComponent
			title={'Congratulations !'}
			subTitle={''}
			type={'Success'}
			isVisible={activityCompleted?true:false}
			okText={'OK'}
			onPressOk={() => {
				CompletedActivity();
			}}
		/>
    </Box>
  
  );
}
const AppStyle = 
StyleSheet.create({
  itemContainer: {borderRadius:10,borderWidth:0,height:70,width:'80%',shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 2,shadowColor:'#808080',backgroundColor: '#f1f1f1',},
  QuestionContainer: {
    shadowColor: '#808080',
    backgroundColor:'#f1f1f1',
    margin:5,
    padding:5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5}
});

