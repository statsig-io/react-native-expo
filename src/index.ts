import 'react-native-get-random-values';

import StatsigProvider from './StatsigProvider';
import {
  Statsig,
  StatsigContext,
  useConfig,
  useExperiment,
  useGate,
  useStatsigLogEffect,
  DynamicConfig,
} from 'statsig-react';

export type {
  ConfigResult,
  GateResult,
  StatsigUser,
  StatsigOptions,
  StatsigEnvironment,
  StatsigOverrides,
} from 'statsig-react';

export {
  Statsig,
  StatsigContext,
  StatsigProvider,
  useConfig,
  useExperiment,
  useGate,
  useStatsigLogEffect,
  DynamicConfig,
};
