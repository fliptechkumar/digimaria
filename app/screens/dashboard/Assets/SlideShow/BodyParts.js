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

const BodyParts = (props) => {
  const [modalOpen, setModal] = useState(false);
  const[selectedItem,setSelectedItem]=useState(null)
  let slide_body = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_body.png";
  let slide_eye = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_eye.png";
  let slide_hand = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_hand.png";
  let slide_knee = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_knee.png";
  let slide_ear = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ear.png";
  let slide_leg = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_leg.png";
  let slide_lip = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_lip.png";
  let slide_nail = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_nail.png";
  let slide_nose = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_nose.png";
  let slide_tougue = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_tougue.png";

const NurserySlides=[{key:'Aa',value:'BODY',image:slide_body,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/mybody.m4a'},
{key:'Bb',value:'EYE',image:slide_eye,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/eye.m4a'},
{key:'Cc',value:'HAND',image:slide_hand,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/hand.m4a'},
{key:'Dd',value:'KNEE',image:slide_knee,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/knee.m4a'},
{key:'Ee',value:'EAR',image:slide_ear,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ear.m4a'},
{key:'Ff',value:'LEG',image:slide_leg,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/leg.m4a'},
{key:'Gg',value:'LIP',image:slide_lip,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/lip.m4a'},
{key:'Hh',value:'NAIL',image:slide_nail,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/nail.m4a'},
{key:'Ii',value:'NOSE',image:slide_nose,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/nose.m4a'},
{key:'Jj',value:'TOUGUE',image:slide_tougue,sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/tongue.m4a'},

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
        headerTitle={'Slide Show / Alphabets'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {/*FlatList two columns with clickable  and sound */}
        <FlatList
            data={NurserySlides}
            numColumns={2}
            renderItem={({item}) => (
            <TouchableOpacity
                style={{flex: 1, margin: 8}}
                onPress={() => {
                playSound(item);
                }}>
                <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#178038',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
               
                <Image source={{uri: item.image}} alt="Alternate Text"  resizeMode="contain" style={{width: '100%', height: 100}}/>
                
                <Text style={{fontSize: 16, fontWeight: 'bold',color:'#151218',alignSelf:'center'}}>{item.value}</Text>
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
                width: '80%',
                height: '40%',
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
              <Image source={{uri: selectedItem?.image}} alt="Alternate Text"  resizeMode="contain" style={{width: '100%', height: 200}}/>
              <View style={{alignItems:'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold',color:'#273897',alignSelf:'center',marginTop:10}}>{selectedItem?.value}</Text>
              </View>
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

export default BodyParts;
