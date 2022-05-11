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
const App: () => React$Node = () => {
  const window = useWindowDimensions();
  const screenHeight = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const equipmentType = useMemo(() => {
    let proportion = window.width / window.height;
    return proportion > 1;
  }, [window.height, window.width]);

  const renderContent = useMemo(() => {
    return (
      <KeyboardAvoidingView behavior="position">
        <SafeAreaView
          style={{
            width: window.width,
            height: screenHeight.height,
            paddingTop: equipmentType ? 0 : 35,
          }}>
          <WebView
            source={{
              uri: 'http://bigdatascreen.bz.dev.jia10000.cn/',
              // uri: `http://www.cqqgsafe.com/${Package.name}/index.html`,
            }}
            onLoad={() => {
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
            style={{
              width: window.width,
              height: screenHeight.height,
            }}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }, [equipmentType, screenHeight.height, window.width]);
  const renderPlaceholder = useMemo(() => {
    if (loading) {
      return (
        <View
          style={{
            width: window.width,
            height: screenHeight.height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 33, 89 ,0.7)',
          }}>
          <NativeSpinner color="white" type="Bounce" size={100} />
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
