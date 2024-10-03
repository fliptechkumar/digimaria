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

const Shapes = (props) => {
  const [modalOpen, setModal] = useState(false);
  const[selectedItem,setSelectedItem]=useState(null)
  

const NurserySlides=[{key:'Circle',value:'Circle',image:'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/safetyfloat.png',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/circle.m4a'},
{key:'Rectangle',value:'Rectangle',image:'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_rectangle.jpg',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/rectangle.m4a'},
{key:'Square',value:'Square',image:'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_square.png',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/square.m4a'},
{key:'Triangle',value :'Triangle',image:'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_triangle.jpg',sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/triangle.m4a'},
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
        headerTitle={'Slide Show / Shapes'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {/*FlatList two columns with clickable  and sound */}
        <FlatList
            data={NurserySlides}
            //numColumns={2}
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
                <Text style={{fontSize: 20, fontWeight: 'bold',color:'#000',textAlign:'center'}}>{item.key}</Text>
                <View style={{marginTop:10}}>
                    <Image source={{uri: item.image}} alt="Alternate Text"  resizeMode="contain" style={{width: '100%', height: 120}}/>
                </View>
                
                
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
                //height: '40%',
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
              <Image source={{uri: selectedItem?.image}} alt="Alternate Text"  resizeMode="contain" style={{width: '100%', height: 220}}/>
              <Text style={{fontSize: 20, fontWeight: 'bold',color:'#151218',textAlign:'center'}}>{selectedItem?.key}</Text>
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

export default Shapes;
