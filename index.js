import 'react-native-get-random-values';
import statsig from 'statsig-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, NativeModules, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as ExpoDevice from 'expo-device';

statsig._setReactNativeDependencies(
  {
    sdkType: require('./package.json')?.name,
    sdkVersion: require('./package.json')?.version,
  },
  AsyncStorage,
  AppState,
  NativeModules,
  Platform,
  null,
  Constants,
  ExpoDevice
);
export default statsig;
