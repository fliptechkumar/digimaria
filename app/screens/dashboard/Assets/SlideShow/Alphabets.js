import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import {Image} from 'native-base';
import Draggable from 'react-native-draggable';
import {
  HeaderComponent,
  SuccessModalComponent,
} from '../../../../components/component';

var Sound = require('react-native-sound');
import Asound from '../../../../assets/a.m4a';
import MICon from 'react-native-vector-icons/MaterialCommunityIcons';

const Alphabets = props => {
  const [modalOpen, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const NurserySlides = [
    {
      key: 'Aa',
      value: 'Apple',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_apple.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a',
    },
    {
      key: 'Bb',
      value: 'Ball',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ball.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/bs.m4a',
    },
    {
      key: 'Cc',
      value: 'Camel',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_vcamel.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/cs.m4a',
    },
    {
      key: 'Dd',
      value: 'Deer',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_deer.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ds.m4a',
    },
    {
      key: 'Ee',
      value: 'Ear',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ear.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/es.m4a',
    },
    {
      key: 'Ff',
      value: 'Fan',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_fan.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/fs.m4a',
    },
    {
      key: 'Gg',
      value: 'Gift',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_gift.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/gs.m4a',
    },
    {
      key: 'Hh',
      value: 'Hen',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_hen.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/h_voice.m4a',
    },
    {
      key: 'Ii',
      value: 'Ice',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ice.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/is.m4a',
    },
    {
      key: 'Jj',
      value: 'Jeep',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_jeep.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/j_voice.m4a',
    },
    {
      key: 'Kk',
      value: 'Kennel',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_kennel.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/k_voice.m4a',
    },
    {
      key: 'Ll',
      value: 'Lamp',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_lamp.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ls.m4a',
    },
    {
      key: 'Mm',
      value: 'Mango',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_mango.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ms.m4a',
    },
    {
      key: 'Nn',
      value: 'Net',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_net.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ns.m4a',
    },
    {
      key: 'Oo',
      value: 'Onion',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_onion.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/os.m4a',
    },
    {
      key: 'Pp',
      value: 'Pad',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_pad.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ps.m4a',
    },
    {
      key: 'Qq',
      value: 'Quail',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_quail.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/qs.m4a',
    },
    {
      key: 'Rr',
      value: 'Ram',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ram.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/rs.m4a',
    },
    {
      key: 'Ss',
      value: 'Ship',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ship.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ss.m4a',
    },
    {
      key: 'Tt',
      value: 'Telephone',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_telephone.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ts.m4a',
    },
    {
      key: 'Uu',
      value: 'Unicorn',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_unicorn.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/us.m4a',
    },
    {
      key: 'Vv',
      value: 'Vase',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_vase.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/vs.m4a',
    },
    {
      key: 'Ww',
      value: 'Watermelon',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_watermelon.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ws.m4a',
    },
    {
      key: 'Xx',
      value: 'Xerox',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_xerox.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/xs.m4a',
    },
    {
      key: 'Yy',
      value: 'Yam',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_yam.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ys.m4a',
    },
    {
      key: 'Zz',
      value: 'Zebra',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_zebra.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/zs.m4a',
    },
  ];
  const LKGSlides = [
    {
      key: 'Aa',
      value: 'Apple',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_apple.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/as.m4a',
    },
    {
      key: 'Bb',
      value: 'Ball',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ball.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/bs.m4a',
    },
    {
      key: 'Cc',
      value: 'Camel',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_vcamel.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/cs.m4a',
    },
    {
      key: 'Dd',
      value: 'Deer',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_deer.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ds.m4a',
    },
    {
      key: 'Ee',
      value: 'Ear',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ear.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/es.m4a',
    },
    {
      key: 'Ff',
      value: 'Fan',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_fan.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/fs.m4a',
    },
    {
      key: 'Gg',
      value: 'Gift',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_gift.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/gs.m4a',
    },
    {
      key: 'Hh',
      value: 'Hen',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_hen.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/h_voice.m4a',
    },
    {
      key: 'Ii',
      value: 'Ice',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ice.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/is.m4a',
    },
    {
      key: 'Jj',
      value: 'Jeep',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_jeep.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/j_voice.m4a',
    },
    {
      key: 'Kk',
      value: 'Kennel',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_kennel.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/k_voice.m4a',
    },
    {
      key: 'Ll',
      value: 'Lamp',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_lamp.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ls.m4a',
    },
    {
      key: 'Mm',
      value: 'Mango',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_mango.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ms.m4a',
    },
    {
      key: 'Nn',
      value: 'Net',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_net.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ns.m4a',
    },
    {
      key: 'Oo',
      value: 'Onion',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_onion.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/os.m4a',
    },
    {
      key: 'Pp',
      value: 'Pad',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_pad.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ps.m4a',
    },
    {
      key: 'Qq',
      value: 'Quail',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_quail.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/qs.m4a',
    },
    {
      key: 'Rr',
      value: 'Ram',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ram.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/rs.m4a',
    },
    {
      key: 'Ss',
      value: 'Ship',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_ship.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ss.m4a',
    },
    {
      key: 'Tt',
      value: 'Telephone',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_telephone.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ts.m4a',
    },
    {
      key: 'Uu',
      value: 'Unicorn',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_unicorn.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/us.m4a',
    },
    {
      key: 'Vv',
      value: 'Vase',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_vase.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/vs.m4a',
    },
    {
      key: 'Ww',
      value: 'Watermelon',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_watermelon.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ws.m4a',
    },
    {
      key: 'Xx',
      value: 'Xerox',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_xerox.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/xs.m4a',
    },
    {
      key: 'Yy',
      value: 'Yam',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_yam.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/ys.m4a',
    },
    {
      key: 'Zz',
      value: 'Zebra',
      image:
        'https://digimaria.com/ERP/public/mobileasset/drawable/drawable/f_zebra.png',
      sound: 'https://digimaria.com/ERP/public/mobileasset/raw/raw/zs.m4a',
    },
  ];

  const playSound = filePath => {
    // alert(sound)
    setModal(true);
    setSelectedItem(filePath);
    var whoosh = new Sound(filePath.sound, null, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } else {
        console.log(
          'duration in seconds: ' +
            whoosh.getDuration() +
            'number of channels: ' +
            whoosh.getNumberOfChannels(),
        );
        whoosh.play(success => {
          console.log(success);
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
      // if loaded successfully then play
    });

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
  };

  return (
    <View style={{flex: 1}}>
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
                borderColor: '#e91e63',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
                {item.key}
              </Text>
              <Image
                source={{uri: item.image}}
                alt="Alternate Text"
                resizeMode="contain"
                style={{width: '100%', height: 100}}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#151218',
                  alignSelf: 'flex-end',
                }}>
                {item.value}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModal(false)}>
        {/** show selected item in modal with Image */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#f1f2f3',
              //padding: 20,
              borderRadius: 10,
              width: '80%',
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#151218',
                    paddingLeft: 10,
                  }}>
                  {selectedItem?.key}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{alignSelf: 'flex-end'}}>
                <MICon name="close-circle" size={30} color="#e91e63" />
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: selectedItem?.image}}
              alt="Alternate Text"
              resizeMode="contain"
              style={{width: '100%', height: 200}}
            />
            <View style={{alignItems: 'flex-end', padding: 10}}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#e91e63',
                  alignSelf: 'flex-end',
                  marginTop: 10,
                }}>
                {selectedItem?.value}
              </Text>
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

export default Alphabets;
