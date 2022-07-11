import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  StatusBar,
  useWindowDimensions,
  KeyboardAvoidingView,
  Text,
  BackHandler,
  Alert,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import {NativeSpinner} from './src/components/NativeSPinkit';
const App: () => React$Node = () => {
  const window = useWindowDimensions();
  const screenHeight = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }, 2000);
  }, []);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);
  useEffect(() => {
    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
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

  const onPress = () => {
    ReceiveSharingIntent.getReceivedFiles(
      (files) => {},
      (error) => {
        console.log(error);
      },
      'ShareMedia', // share url protocol (must be unique to your app, suggest using your apple bundle id)
    );
  };

  const renderContent = useMemo(() => {
    return (
      <KeyboardAvoidingView behavior="position">
        <SafeAreaView
          style={{
            width: window.width,
            height: screenHeight.height,
            paddingTop: equipmentType ? 0 : 35,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={onPress}>
            <Text style={{color: 'white', fontSize: 32}}>ReactNative</Text>
          </TouchableOpacity>
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
      {renderContent}
    </>
  );
};

export default App;
