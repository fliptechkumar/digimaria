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

const Phonics = (props) => {
  const [modalOpen, setModal] = useState(false);
  const[selectedItem,setSelectedItem]=useState(null)
  


const LKGSlides=[{key:'i',value:'i',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'a',value:'a',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'if',value:'if',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'is', value:'is',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'it',value:'it',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'in',value:'in',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'he',value:'he',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'at',value:'at',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'am',value:'am',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'an',value:'an',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'be',value:'be',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'do',value:'do',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},

{key:'by',value:'by',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'of',value:'of',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'to',value:'on',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'up',value:'by',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},

{key:'me',value:'me',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'my',value:'my',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'we', value:'we',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'us',value:'us',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'go',value:'go',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'so',value:'so',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'no',value:'no',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'and',value:'and',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'the',value:'the',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'you',value:'you',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'him',value:'him',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'her', value:'her',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'his',value:'his',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'are',value:'are',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'hot',value:'hot',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'not',value:'not',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'old',value:'old',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'new',value:'new',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'big',value:'big',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'can',value:'can',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'see', value:'see',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'she',value:'she',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'was',value:'was',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},
{key:'did',value:'did',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a'},


];



const playSound = (filePath) => {
   // alert(sound)
   setModal(true);
    setSelectedItem(filePath)
  //  var whoosh = new Sound(
  //   filePath.sound,
  //   null,
  //   error => {
  //     if (error) {
  //       console.log('failed to load the sound', error);
  //       return;
  //     } else {
  //       console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
  //       whoosh.play((success) => {
  //         console.log(success)
  //           if (success) {
  //             console.log('successfully finished playing');
  //           } else {
  //             console.log('playback failed due to audio decoding errors');
  //           }
        
  //         })
        
  //     }
      
  //   },
  // );

  
   
  }

  return (
    <View style={{flex:1}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={'Slide Show / Phonics'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {/*FlatList two columns with clickable  and sound */}
        <FlatList
            data={LKGSlides}
            numColumns={3}
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
                
                <Text style={{fontSize: 20, fontWeight: 'bold',color:'#151218',alignSelf:'center'}}>{item.key}</Text>
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
                width: '50%',
               // height: '40%',
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
              <Text style={{fontSize: 60, fontWeight: 'bold',color:'#151218',textAlign:'center'}}>{selectedItem?.key}</Text>
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

export default Phonics;
