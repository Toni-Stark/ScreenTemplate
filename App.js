import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  StatusBar,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NativeSpinner} from './src/components/NativeSPinkit';
import {WebView} from 'react-native-webview';
const packageAge = require('./package.json');
const App: () => React$Node = () => {
  const window = useWindowDimensions();
  const screenHeight = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const equipmentType = useMemo(() => {
    let proportion = window.width / window.height;
    return proportion > 1;
  }, [window.height, window.width]);

  const packageUrl = useMemo(() => {
    return {uri: `http://www.cqqgsafe.com/${packageAge}/index.html`};
  }, []);

  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <View
          style={{
            width: window.width,
            height: screenHeight.height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <NativeSpinner color="green" type="Wave" size={100} />
        </View>
      );
    } else {
      return (
        <SafeAreaView
          style={{
            width: window.width,
            height: screenHeight.height,
            paddingTop: equipmentType ? 0 : 35,
          }}>
          <WebView
            source={packageUrl}
            onLoad={() => {
              console.log('加载完毕');
            }}
            style={{
              width: window.width,
              height: screenHeight.height,
            }}
          />
        </SafeAreaView>
      );
    }
  }, [equipmentType, loading, screenHeight.height, window.width]);
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle={equipmentType ? 'light-content' : 'dark-content'}
        backgroundColor="rgba(0, 0, 0, 0)"
      />
      {renderContent}
    </>
  );
};

export default App;
