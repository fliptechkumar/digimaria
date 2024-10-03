import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert ,FlatList,Modal} from 'react-native';
import {Image} from  'native-base';
import Draggable from 'react-native-draggable';
import {
   
    HeaderComponent,
    SuccessModalComponent,
  } from '../../../../components/component';

  var Sound = require('react-native-sound');
import Asound from '../../../../assets/a.m4a';
import MICon from 'react-native-vector-icons/MaterialCommunityIcons';

const Numeracy = (props) => {
  const [modalOpen, setModal] = useState(false);
  const[selectedItem,setSelectedItem]=useState(null)
  
const NurserySlides=[{key:'1',value:'ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/one.m4a'},
{key:'2',value:'TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/two.m4a'},
{key:'3',value:'THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/three.m4a'},
{key:'4',value:'FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/four.m4a'},
{key:'5',value:'FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/five.m4a'},
{key:'6',value:'SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/six.m4a'},
{key:'7',value:'SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seven.m4a'},
{key:'8',value:'EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eight.m4a'},
{key:'9',value:'NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/nine.m4a'},
{key:'10',value:'TEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ten.m4a'},
];

// LKGAndUKGSlides 1-100
const LKGAndUKGSlides=[{key:'1',value:'ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/one.m4a'},
{key:'2',value:'TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/two.m4a'},
{key:'3',value:'THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/three.m4a'},
{key:'4',value:'FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/four.m4a'},
{key:'5',value:'FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/five.m4a'},
{key:'6',value:'SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/six.m4a'},
{key:'7',value:'SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seven.m4a'},
{key:'8',value:'EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eight.m4a'},
{key:'9',value:'NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/nine.m4a'},
{key:'10',value:'TEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ten.m4a'},

{key:'11',value:'ELEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eleven.m4a'},
{key:'12',value:'TWELVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twelve.m4a'},
{key:'13',value:'THIRTEEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirteen.m4a'},
{key:'14',value:'FOURTEEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fourteen.m4a'},
{key:'15',value:'FIFTEEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fifteen.m4a'},
{key:'16',value:'SIXTEEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixteen.m4a'},
{key:'17',value:'SEVENTEEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventeen.m4a'},
{key:'18',value:'EIGHTEEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eighteen.m4a'},
{key:'19',value:'NINETEEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/nineteen.m4a'},
{key:'20',value:'TWENTY',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twenty.m4a'},

{key:'21',value:'TWENTY-ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twentyone.m4a'},
{key:'22',value:'TWENTY-TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twentytwo.m4a'},
{key:'23',value:'TWENTY-THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twentythree.m4a'},
{key:'24',value:'TWENTY-FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twentyfour.m4a'},
{key:'25',value:'TWENTY-FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twentyfive.m4a'},
{key:'26',value:'TWENTY-SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twentysix.m4a'},
{key:'27',value:'TWENTY-SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twentyseven.m4a'},
{key:'28',value:'TWENTY-EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twentyeight.m4a'},
{key:'29',value:'TWENTY-NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/twentynine.m4a'},
{key:'30',value:'THIRTY',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirty.m4a'},

{key:'31',value:'THIRTY-ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirtyone.m4a'},
{key:'32',value:'THIRTY-TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirtytwo.m4a'},
{key:'33',value:'THIRTY-THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirtythree.m4a'},
{key:'34',value:'THIRTY-FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirtyfour.m4a'},
{key:'35',value:'THIRTY-FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirtyfive.m4a'},
{key:'36',value:'THIRTY-SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirtysix.m4a'},
{key:'37',value:'THIRTY-SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirtyseven.m4a'},
{key:'38',value:'THIRTY-EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirtyeight.m4a'},
{key:'39',value:'THIRTY-NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/thirtynine.m4a'},
{key:'40',value:'FORTY',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/forty.m4a'},

{key:'41',value:'FORTY-ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fortyone.m4a'},
{key:'42',value:'FORTY-TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fortytwo.m4a'},
{key:'43',value:'FORTY-THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fortythree.m4a'},
{key:'44',value:'FORTY-FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fortyfour.m4a'},
{key:'45',value:'FORTY-FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fortyfive.m4a'},
{key:'46',value:'FORTY-SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fortysix.m4a'},
{key:'47',value:'FORTY-SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fortyseven.m4a'},
{key:'48',value:'FORTY-EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fortyeight.m4a'},
{key:'49',value:'FORTY-NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fortynine.m4a'},
{key:'50',value:'FIFTY',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fifty.m4a'},

{key:'51',value:'FIFTY-ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fiftyone.m4a'},
{key:'52',value:'FIFTY-TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fiftytwo.m4a'},
{key:'53',value:'FIFTY-THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fiftythree.m4a'},
{key:'54',value:'FIFTY-FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fiftyfour.m4a'},
{key:'55',value:'FIFTY-FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fiftyfive.m4a'},
{key:'56',value:'FIFTY-SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fiftysix.m4a'},
{key:'57',value:'FIFTY-SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fiftyseven.m4a'},
{key:'58',value:'FIFTY-EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fiftyeight.m4a'},
{key:'59',value:'FIFTY-NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/fiftynine.m4a'},
{key:'60',value:'SIXTY',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixty.m4a'},

{key:'61',value:'SIXTY-ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixtyone.m4a'},
{key:'62',value:'SIXTY-TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixtytwo.m4a'},
{key:'63',value:'SIXTY-THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixtythree.m4a'},
{key:'64',value:'SIXTY-FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixtyfour.m4a'},
{key:'65',value:'SIXTY-FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixtyfive.m4a'},
{key:'66',value:'SIXTY-SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixtysix.m4a'},
{key:'67',value:'SIXTY-SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixtyseven.m4a'},
{key:'68',value:'SIXTY-EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixtyeight.m4a'},
{key:'69',value:'SIXTY-NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/sixtynine.m4a'},
{key:'70',value:'SEVENTY',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventy.m4a'},

{key:'71',value:'SEVENTY-ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventyone.m4a'},
{key:'72',value:'SEVENTY-TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventytwo.m4a'},
{key:'73',value:'SEVENTY-THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventythree.m4a'},
{key:'74',value:'SEVENTY-FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventyfour.m4a'},
{key:'75',value:'SEVENTY-FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventyfive.m4a'},
{key:'76',value:'SEVENTY-SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventysix.m4a'},
{key:'77',value:'SEVENTY-SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventyseven.m4a'},
{key:'78',value:'SEVENTY-EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventyeight.m4a'},
{key:'79',value:'SEVENTY-NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/seventynine.m4a'},
{key:'80', value:'EIGHTY',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eighty.m4a'},

{key:'81',value:'EIGHTY-ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eightyone.m4a'},
{key:'82',value:'EIGHTY-TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eightytwo.m4a'},
{key:'83',value:'EIGHTY-THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eightythree.m4a'},
{key:'84',value:'EIGHTY-FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eightyfour.m4a'},
{key:'85',value:'EIGHTY-FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eightyfive.m4a'},
{key:'86',value:'EIGHTY-SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eightysix.m4a'},
{key:'87',value:'EIGHTY-SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eightyseven.m4a'},
{key:'88',value:'EIGHTY-EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eightyeight.m4a'},
{key:'89',value:'EIGHTY-NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eightynine.m4a'},
{key:'90',value:'NINETY',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninety.m4a'},
{key:'91',value:'NINETY-ONE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninetyone.m4a'},

{key:'92',value:'NINETY-TWO',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninetytwo.m4a'},
{key:'93',value:'NINETY-THREE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninetythree.m4a'},
{key:'94',value:'NINETY-FOUR',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninetyfour.m4a'},
{key:'95',value:'NINETY-FIVE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninetyfive.m4a'},
{key:'96',value:'NINETY-SIX',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninetysix.m4a'},
{key:'97',value:'NINETY-SEVEN',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninetyseven.m4a'},
{key:'98',value:'NINETY-EIGHT',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninetyeight.m4a'},
{key:'99',value:'NINETY-NINE',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ninetynine.m4a'},
{key:'100',value:'ONE HUNDRED',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/onehundred.m4a'},









];



const playSound = (filePath) => {
   // alert(sound)
   setModal(true);
    setSelectedItem(filePath)
   var whoosh = new Sound(
    filePath.sound,
    null,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } else {
        console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        whoosh.play((success) => {
          console.log(success)
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
        
          })
        
      }
      // if loaded successfully then play

       

     
    },
  );

    // setTimeout (()=>{
    //     whoosh.play((success) => {
    //       console.log(success)
    //         if (success) {
    //           console.log('successfully finished playing');
    //         } else {
    //           console.log('playback failed due to audio decoding errors');
    //         }
    //       })
    //     },1500)
   
  }

  return (
    <View style={{flex:1}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={'Slide Show / Numeracy'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {/*FlatList two columns with clickable  and sound */}
        <FlatList
            data={props?.route?.params?.className=='Nursery'?NurserySlides:LKGAndUKGSlides}
            numColumns={3}
            style={{marginTop: 8}}
            renderItem={({item}) => (
            <TouchableOpacity
                style={{ width:'33.33%',padding:5}}
                onPress={() => {
                playSound(item);
                }}>
                <View
                style={{
                   
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#e91e63',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                   // justifyContent: 'center',
                   // alignItems: 'center',
                }}>
                <Text style={{fontSize: 25, fontWeight: 'bold',color:'#000',textAlign:'center'}}>{item.key}</Text>
                
                <Text style={{fontSize: 14, fontWeight: 'bold',color:'#151218',alignSelf:'center'}}>{item.value}</Text>
                </View>
            </TouchableOpacity>
            )}
        />
        <Modal animationType="slide" transparent={true} visible={modalOpen} onRequestClose={() => setModal(false)}>
          {/** show selected item in modal with Image */}
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#f1f2f3',
               // padding: 20,
                borderRadius: 10,
                width: '60%',
                height: '22%',
                borderColor: '#e91e63',
                borderWidth: 3,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text />
                    <TouchableOpacity onPress={() => setModal(false)} style={{alignSelf:'flex-end'}}> 
                        <MICon name="close-circle" size={30} color="#e91e63" />
                    </TouchableOpacity>
              </View>
              <Text style={{fontSize: 50, fontWeight: 'bold',color:'#151218',textAlign:'center'}}>{selectedItem?.key}</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold',color:'#273897',textAlign:'center',marginTop:10}}>{selectedItem?.value}</Text>

            </View>
          </View>

         </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  numbersContainer: {
    flexDirection: 'row',
  },
  number: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  successMessage: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Numeracy;
