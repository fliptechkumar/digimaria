import React,{useState,Fragment} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,

} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RootStack from './app/Navigators/RootNavigator';
//import RootStack from './appOnline/Navigators/RootNavigator';
//import {ProviderDetail} from './src/DetailsProvider'
const STYLES = [ 'default', 'dark-content', 'light-content' ];
const TRANSITIONS = [ 'fade', 'slide', 'none' ];
//StatusBar.setBackgroundColor('#ff0000');

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [ hidden, setHidden ] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  //const [ statusBarTransition, setStatusBarTransition ] = useState('slide');
  return (
    <Fragment>
             <SafeAreaView style={{ flex: 0, backgroundColor: "#fece2e" }} />   
             <SafeAreaView style={{ flex:1, backgroundColor: '#ffffff' }}>
                    <StatusBar
                      animated={true}
                      backgroundColor={"#0891b3"}
                      barStyle={'light-content'}
                      showHideTransition={'slide'}
                      hidden={hidden}
                    />
              <RootStack />
          </SafeAreaView>
          </Fragment>

       
     );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {
		flex: 0,
	//	justifyContent: 'center',
		backgroundColor: '#0991b3'
	},
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
