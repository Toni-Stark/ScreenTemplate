import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  StatusBar,
  useWindowDimensions,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
  Text,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NativeSpinner} from './src/components/NativeSPinkit';
import {WebView} from 'react-native-webview';
import {getMacAddress} from 'react-native-device-info';

const App: () => React$Node = () => {
  const window = useWindowDimensions();
  const screenHeight = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState({});
  const [matching, setMatching] = useState(false);
  const [devicesMac, setDevicesMac] = useState('');
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }, 2000);
  }, []);

  const getDeviceDisplay = useCallback(async () => {
    let deviceOptions = {
      macAddress: await getMacAddress(),
    };
    // setMatching(device.macAddress === 'D2:44:06:5D:13:42');
    //   setMatching(device.macAddress === '00:14:62:00:06:3F');
    // setMatching(device.macAddress === '3C:7A:AA:80:70:FF');
    setMatching(device.macAddress === '00:14:62:D0:02:F9');
    // setMatching(device.macAddress === '74:8F:1B:F6:DC:18');
    setDevicesMac(device.macAddress);
    setDevice(deviceOptions);
  }, [device.macAddress]);

  useEffect(() => {
    (async () => {
      await getDeviceDisplay();
    })();
  }, [getDeviceDisplay]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);
  const onBackPress = () => {
    Alert.alert(
      '退出应用',
      '确认退出应用吗?',
      [
        {
          text: '取消',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: '确认', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };

  const equipmentType = useMemo(() => {
    let proportion = window.width / window.height;
    return proportion > 1;
  }, [window.height, window.width]);

  const packageUrl = useMemo(() => {
    let sn = device?.macAddress
      ?.split(':')
      .map((item) => item.trim())
      .join('');
    return {
      uri: 'http://a.ce.360zhishu.cn/screen/city/index/440111?code=' + sn,
    };
  }, [device.macAddress]);

  const renderContent = useMemo(() => {
    if (!loading) {
      if (matching && device?.macAddress) {
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
      } else {
        return (
          <View
            style={{
              width: window.width,
              height: screenHeight.height,
              paddingTop: equipmentType ? 0 : 35,
              backgroundColor: '#000E2E',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 32,
                color: '#ffffff',
              }}>
              该App未经授权，请联系供应商
              {devicesMac}
            </Text>
          </View>
        );
      }
    }
  }, [
    device.macAddress,
    devicesMac,
    equipmentType,
    loading,
    matching,
    packageUrl,
    screenHeight.height,
    window.width,
  ]);
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
