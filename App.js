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
import {getAndroidId, getMacAddress} from 'react-native-device-info';
import {baseViewUrl, FetchApi} from './src/common/request';

const App: () => React$Node = () => {
  const window = useWindowDimensions();
  const screenHeight = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState({});
  const [matching, setMatching] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }, 2000);
  }, []);
  const getWebViewUrl = async (params) => {
    const data = {
      url: baseViewUrl,
      code: params.code,
    };
    return await FetchApi({path: '/screen/pre-judge/check', data});
  };

  const getDeviceDisplay = useCallback(async () => {
    let deviceOptions = {
      macAddress: await getMacAddress(),
      androidId: await getAndroidId(),
    };
    const result = await getWebViewUrl({code: deviceOptions.androidId});
    console.log(result);
    setMatching(result.data.check);
    setDevice(deviceOptions);
  }, []);

  useEffect(() => {
    (async () => {
      await getDeviceDisplay();
    })();
  }, []);

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
    let sn = device?.androidId
      ?.split(':')
      .map((item) => item.trim())
      .join('');
    return {
      uri: `${baseViewUrl}?code=${sn}`,
    };
  }, [device.androidId]);

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
            </Text>
            <Text
              style={{
                fontSize: 32,
                color: '#ffffff',
              }}>
              {device.androidId}
            </Text>
          </View>
        );
      }
    }
  }, [
    device.androidId,
    device.macAddress,
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
