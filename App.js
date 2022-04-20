import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Modal,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NativeSpinner} from './src/components/NativeSPinkit';
import {WebView} from 'react-native-webview';

const App: () => React$Node = () => {
  const window = useWindowDimensions();
  const [loading, setLoading] = useState(true);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  useEffect(() => {
    SplashScreen.hide();
    // setModalVisible(false);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <View
          style={{
            width: window.width,
            height: window.height,
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
            height: window.height,
          }}>
          <WebView
            source={{
              uri: 'http://www.cqqgsafe.com/default/index.html',
            }}
            onLoad={() => {
              console.log('加载完毕');
            }}
            style={{
              marginTop: 20,
              width: window.width,
              height: window.height,
            }}></WebView>
        </SafeAreaView>
      );
    }
  }, [loading, window.height, window.width]);
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor="rgba(0, 0, 0, 0)"
      />
      {renderContent}
    </>
  );
};

export default App;
