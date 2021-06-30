import React from 'react';
import { StatsigProvider as InternalProvider } from 'statsig-react';
import statsig from 'statsig-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, NativeModules, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as ExpoDevice from 'expo-device';

/**
 * Properties required to initialize the Statsig React SDK
 */
type Props = {
  children: React.ReactNode | React.ReactNode[];

  /**
   * A client SDK key from the Statsig Console
   */
  sdkKey: string;

  /**
   * A Statsig User object.  Changing this will update the user and Gate values, causing a re-initialization
   */
  user: statsig.StatsigUser;

  /**
   * Options for initializing the SDK, shared with the statsig-js SDK
   */
  options?: statsig.StatsigOptions;

  /**
   * Waits for the SDK to initialize with updated values before rendering child components
   */
  waitForInitialization?: boolean;
};

/**
 * The StatsigProvider is the top level component from which all React SDK components derive
 * It initializes the SDK so child components can use FeatureGate and DynamicConfig values
 *
 * The provider accepts the same SDK initialization parameters as the statsig-js SDK.
 *
 * We recommend you place this at the entry point of your app and pass waitForInitialization = true
 * to ensure the SDK is initialized and all values are up to date prior to rendering anything.
 * @param props
 * @returns
 */
export default function StatsigProvider({
  children,
  sdkKey,
  user,
  options,
  waitForInitialization,
}: Props): JSX.Element {
  return (
    <InternalProvider
      sdkKey={sdkKey}
      user={user}
      options={options}
      waitForInitialization={waitForInitialization}
      // @ts-ignore
      _reactNativeDependencies={{
        SDKPackageInfo: {
          sdkType: 'react-native-expo-client',
          sdkVersion: require('../package.json')?.version,
        },
        AsyncStorage: AsyncStorage,
        AppState: AppState,
        NativeModules: NativeModules,
        Platform: Platform,
        RNDevice: null,
        Constants: Constants,
        ExpoDevice: ExpoDevice,
      }}
    >
      {children}
    </InternalProvider>
  );
}
