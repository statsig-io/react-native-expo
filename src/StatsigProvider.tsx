import React from 'react';
import { StatsigProvider as InternalProvider } from 'statsig-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, NativeModules, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as ExpoDevice from 'expo-device';
import type { StatsigUser, StatsigOptions, UUID } from 'statsig-react';

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
  user: StatsigUser;

  /**
   * Options for initializing the SDK, shared with the statsig-js SDK
   */
  options?: StatsigOptions;

  /**
   * Waits for the SDK to initialize with updated values before rendering child components
   */
  waitForInitialization?: boolean;

  /**
   * Pass in react-native-uuid to replace uuid if your project does not work with uuid @see https://www.npmjs.com/package/react-native-uuid
   */
  reactNativeUUID?: UUID;

  /**
   * A loading component to render iff waitForInitialization is set to true, and the SDK is initializing
   */
  initializingComponent?: React.ReactNode | React.ReactNode[];
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
  reactNativeUUID,
  initializingComponent,
}: Props): JSX.Element {
  return (
    <InternalProvider
      sdkKey={sdkKey}
      user={user}
      options={options}
      waitForInitialization={waitForInitialization}
      initializingComponent={initializingComponent}
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
        ReactNativeUUID: reactNativeUUID ?? null,
      }}
    >
      {children}
    </InternalProvider>
  );
}
