import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  StatusBar,
  useWindowDimensions,
  KeyboardAvoidingView,
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
    return {uri: `http://bigdatascreen.bz.dev.jia10000.cn/${packageAge.name}/`};
    // return {uri: `http://nametkfxlnoi.wcvh.cnyun-net.com`};
  }, []);

  const renderContent = useMemo(() => {
    if (loading) {
    } else {
      return (
        <KeyboardAvoidingView behavior="position">
          <SafeAreaView
            style={{
              width: window.width,
              height: screenHeight.height,
              paddingTop: equipmentType ? 0 : 35,
            }}>
            <WebView
              source={packageUrl}
              onLoad={() => {
                setLoading(false);
              }}
              style={{
                width: window.width,
                height: screenHeight.height,
                backgroundColor: '#000E2E',
              }}
            />
          </SafeAreaView>
        </KeyboardAvoidingView>
      );
    }
  }, [equipmentType, loading, packageUrl, screenHeight.height, window.width]);
  const renderPlaceholder = useMemo(() => {
    if (loading) {
      return (
        <View
          style={{
            width: window.width,
            height: screenHeight.height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000E2E',
          }}>
          <NativeSpinner color="blue" type="9CubeGrid" size={100} />
          {/*| 'Circle' well*/}
          {/*| '9CubeGrid' well*/}
          {/*| 'FadingCircleAlt' well*/}
        </View>
      );
    }
  }, [loading, screenHeight.height, window.width]);

  return (
    <>
      <StatusBar
        translucent={true}
        barStyle={equipmentType ? 'light-content' : 'dark-content'}
        backgroundColor="rgba(0, 0, 0, 0)"
      />
      {renderPlaceholder}
      {renderContent}
    </>
  );
};

export default App;
