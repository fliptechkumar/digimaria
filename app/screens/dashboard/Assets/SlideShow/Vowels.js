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

const Vowels = (props) => {
  const [modalOpen, setModal] = useState(false);
  const[selectedItem,setSelectedItem]=useState(null)
  let slide_can = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_can.png";
  let slide_van = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_van.png";
  let slide_man = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_man.png";
  let slide_net = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_net.png";
  let slide_pet = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_pet.png";
  let vvvvvet = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/vvvvvet.png";
  let slide_tin = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_tin.png";
  let slide_bin = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_bin.png";
  let slide_win = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_win.png";
  let slide_cot = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_cot.png";
  let slide_pot = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_pot.png";
  let v_dot = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/v_dot.png";
  let slide_bun = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_bun.png";
  let slide_sun = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_sun.png";
  let slide_gun = "https://digimaria.com/ERP/public/mobileasset/drawable/drawable/slide_gun.png";


const NurserySlides=[
    {key:'Aa',value:{label1:'CAN',label2:'VAN',label3:'MAN'},
     image:{image1:slide_can,image2:slide_van,image3:slide_man},
      sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/va.m4a'},
      {key:'Ee',value:{label1:'NET',label2:'PET',label3:'WET'},
      image:{image1:slide_net,image2:slide_pet,image3:vvvvvet},
       sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/ve.m4a'},
       {key:'Ii',value:{label1:'TIN',label2:'BIN',label3:'WIN'},
       image:{image1:slide_tin,image2:slide_bin,image3:slide_win},
        sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/vi.m4a'},
        {key:'Oo',value:{label1:'COT',label2:'POT',label3:'DOT'},
        image:{image1:slide_cot,image2:slide_pot,image3:v_dot},
         sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/vo.m4a'},
         {key:'Uu',value:{label1:'BUN',label2:'SUN',label3:'GUN'},
         image:{image1:slide_bun,image2:slide_sun,image3:slide_gun},
         sound:'https://digimaria.com/ERP/public/mobileasset/raw/raw/vu.m4a'},

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
        headerTitle={'Slide Show / Vowels'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {/*FlatList two columns with clickable  and sound */}
        <FlatList
            data={NurserySlides}
            //numColumns={1}
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
                   // justifyContent: 'center',
                   // alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold',color:'#000',textAlign:'center'}}>{item.key}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flex:1}}>
                        <Image source={{uri: item?.image?.image1}} alt="Alternate Text" resizeMode='contain'   style={{width: '100%', height: 100}}/>
                        <Text style={{fontSize: 16, fontWeight: 'bold',color:'#151218',textAlign:'center',marginTop:10}}>{item.value.label1}</Text>
                    </View>
                    <View style={{flex:1}}>
                       <Image source={{uri: item?.image?.image2}} alt="Alternate Text" resizeMode='contain' style={{width: '100%', height: 100}}/>
                       <Text style={{fontSize: 16, fontWeight: 'bold',color:'#151218',textAlign:'center',marginTop:10}}>{item.value.label2}</Text>
                    </View>
                    <View style={{flex:1}}>
                      <Image source={{uri: item?.image?.image3}} alt="Alternate Text" resizeMode='contain' style={{width: '100%', height: 100}}/>
                      <Text style={{fontSize: 16, fontWeight: 'bold',color:'#151218',textAlign:'center',marginTop:10}}>{item.value.label3}</Text>
                    </View>
                </View>
                

                </View>
            </TouchableOpacity>
            )}
        />
        {selectedItem &&
        <Modal animationType="slide" transparent={true} visible={modalOpen} onRequestClose={() => setModal(false)}>
          {/** show selected item in modal with Image */}
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#f1f2f3',
               // padding: 20,
                borderRadius: 10,
                width: '90%',
                height: '70%',
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
              <Text style={{fontSize: 25, fontWeight: 'bold',color:'#151218',marginTop:10,marginLeft:5}}>{selectedItem?.key}</Text>
              <TouchableOpacity onPress={() => setModal(false)} style={{alignSelf:'flex-end'}}> 
                <MICon name="close-circle" size={30} color="#e91e63" />
              </TouchableOpacity>
              </View>
             
                     <View style={{flex:1,borderBottomWidth:1,borderBottomColor:'#e91e63',marginBottom:10}}>
                        <Image source={{uri: selectedItem?.image?.image1}} alt="Alternate Text"  resizeMode="contain" style={{width: '100%', height: 100}}/>
                        <Text style={{fontSize:18, fontWeight: 'bold',color:'#151218',textAlign:'center',marginTop:10}}>{selectedItem.value.label1}</Text>
                    </View>
                    <View style={{flex:1,borderBottomWidth:1,borderBottomColor:'#e91e63',marginBottom:10}}>
                       <Image source={{uri: selectedItem?.image?.image2}} alt="Alternate Text"  resizeMode="contain" style={{width: '100%', height: 100}}/>
                       <Text style={{fontSize:18, fontWeight: 'bold',color:'#151218',textAlign:'center',marginTop:10}}>{selectedItem.value.label2}</Text>
                    </View>
                    <View style={{flex:1}}>
                      <Image source={{uri: selectedItem?.image?.image3}} alt="Alternate Text"  resizeMode="contain" style={{width: '100%', height: 100}}/>
                      <Text style={{fontSize:18, fontWeight: 'bold',color:'#151218',textAlign:'center',marginTop:10}}>{selectedItem.value.label3}</Text>
                    </View>
                </View>
            </View>


         </Modal>
        }

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

export default Vowels;
